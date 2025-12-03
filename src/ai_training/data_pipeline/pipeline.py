"""
AutoDataPipeline - 一站式数据处理框架

自动处理所有数据加载、验证、清理、特征工程、标准化、分割等步骤。
用户只需一行代码，框架处理所有细节。
"""

import numpy as np
import pandas as pd
import joblib
import json
from pathlib import Path
from datetime import datetime
from typing import Tuple, Dict, Optional, Any, List
from collections import defaultdict
import sys
import os

from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from scipy.spatial.distance import jensenshannon

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from src.ai_training.kline_data_loader import StockImageAnalyzer
from src.ai_training.feature_extractor import FEATURE_NAMES, NUM_FEATURES, extract_features_sequence_from_kline_data

try:
    from loguru import logger
    HAS_LOGURU = True
except ImportError:
    class SimpleLogger:
        @staticmethod
        def info(msg): print(f"ℹ️  {msg}")
        @staticmethod
        def warning(msg): print(f"⚠️  {msg}")
        @staticmethod
        def error(msg): print(f"❌ {msg}")
        @staticmethod
        def success(msg): print(f"✅ {msg}")
    logger = SimpleLogger()
    HAS_LOGURU = False


class PipelineStage:
    """管道阶段执行状态"""
    def __init__(self, name: str):
        self.name = name
        self.start_time = None
        self.end_time = None
        self.status = 'pending'  # pending / running / success / failed
        self.error = None
        self.info = {}

    def start(self):
        import time
        self.start_time = time.time()
        self.status = 'running'

    def success(self, info: dict = None):
        import time
        self.end_time = time.time()
        self.status = 'success'
        if info:
            self.info.update(info)

    def fail(self, error: str):
        import time
        self.end_time = time.time()
        self.status = 'failed'
        self.error = error

    @property
    def duration(self) -> float:
        if self.start_time and self.end_time:
            return self.end_time - self.start_time
        return 0


class AutoDataPipeline:
    """
    自动化数据处理管道
    
    一行代码处理所有数据逻辑，无需人工干预。
    """

    SEQUENCE_LENGTH = 60
    FEATURES_PER_STEP = 51
    TOTAL_FEATURES = SEQUENCE_LENGTH * FEATURES_PER_STEP

    SMALL_DATA_THRESHOLD = 500
    MIN_TOTAL_SAMPLES = 60
    MIN_SAMPLES_PER_CLASS = 20
    IMBALANCE_RATIO_THRESHOLD = 2.0

    JS_DIVERGENCE_EXCELLENT = 0.02
    JS_DIVERGENCE_GOOD = 0.05
    JS_DIVERGENCE_ACCEPTABLE = 0.10

    def __init__(
        self,
        data_dir: str,
        period: str = 'auto',
        enable_logging: bool = True,
        random_seed: int = 42,
        min_samples_per_class: int = 20,
        imbalance_threshold: float = 2.0,
        config: dict = None
    ):
        """
        初始化管道
        
        Args:
            data_dir: 数据目录路径
            period: K线周期（auto/day/5min/15min等）
            enable_logging: 是否启用日志
            random_seed: 随机种子
            min_samples_per_class: 每类最少样本数
            imbalance_threshold: 类别不平衡警告阈值
            config: 自定义配置字典
        """
        self.data_dir = Path(data_dir)
        self.period = self._detect_period(period)
        self.random_seed = random_seed
        self.min_samples_per_class = min_samples_per_class
        self.imbalance_threshold = imbalance_threshold
        self.config = config or {}

        # 数据容器
        self.X = None
        self.y = None
        self.actual_returns = None

        self.X_train = self.X_val = self.X_calibrate = self.X_test = None
        self.y_train = self.y_val = self.y_calibrate = self.y_test = None
        self.returns_train = self.returns_val = self.returns_calibrate = self.returns_test = None

        # 处理器
        self.imputer = None
        self.scaler = None

        # 元数据
        self.metadata = {
            'timestamp': datetime.now().isoformat(),
            'version': '1.0.0',
            'period': self.period,
            'processing_log': [],
            'warnings': [],
            'statistics': {},
            'stages': {}
        }

        # 阶段跟踪
        self.stages = {}

    def _detect_period(self, period: str) -> str:
        """自动检测K线周期"""
        if period != 'auto':
            return period

        period_map = {
            '5min': '5min',
            '15min': '15min',
            '30min': '30min',
            '1hour': '1hour',
            'week': 'week'
        }

        for key, val in period_map.items():
            if key in str(self.data_dir):
                return val

        return 'day'

    def _log(self, msg: str, level: str = 'info'):
        """记录消息"""
        if level == 'info':
            logger.info(msg)
        elif level == 'warning':
            logger.warning(msg)
            self.metadata['warnings'].append(msg)
        elif level == 'error':
            logger.error(msg)
        elif level == 'success':
            logger.success(msg)

        self.metadata['processing_log'].append(f"[{level.upper()}] {msg}")

    def _create_stage(self, name: str) -> PipelineStage:
        """创建管道阶段"""
        stage = PipelineStage(name)
        self.stages[name] = stage
        return stage

    def load_data(self) -> 'AutoDataPipeline':
        """加载数据（可链式调用）"""
        stage = self._create_stage('load')
        stage.start()

        try:
            self._log("📂 加载训练数据...")

            analyzer = StockImageAnalyzer(enable_database=True)
            features_list = []
            labels_list = []
            returns_list = []

            trend_dirs = {'down_trend': 0, 'sideways': 1, 'up_trend': 2}

            for trend_name, label in trend_dirs.items():
                trend_path = self.data_dir / trend_name
                json_file = trend_path / 'data.json'

                if not json_file.exists():
                    self._log(f"{json_file} 不存在，跳过", 'warning')
                    continue

                self._log(f"加载 {trend_name}...")

                try:
                    results = analyzer.get_training_data_from_json(str(json_file))
                    if not results:
                        self._log(f"{trend_name} 无有效数据", 'warning')
                        continue

                    count = 0
                    for item in results:
                        try:
                            features = extract_features_sequence_from_kline_data(
                                item['kline_data'],
                                item['period'],
                                item.get('market_index_klines'),
                                item.get('stock_code')
                            )

                            if features is not None:
                                features_list.append(features)
                                labels_list.append(label)
                                returns_list.append(item.get('actual_return', None))
                                count += 1
                        except Exception:
                            continue

                    self._log(f"{trend_name}: {count} 条成功", 'success')

                except Exception as e:
                    self._log(f"加载 {trend_name} 失败: {e}", 'error')
                    continue

            if not features_list:
                raise ValueError("没有加载到有效数据")

            self.X = np.array(features_list, dtype=np.float32)
            self.y = np.array(labels_list, dtype=np.int32)
            self.actual_returns = np.array(returns_list, dtype=np.float32)

            # 打乱数据
            rng = np.random.RandomState(self.random_seed)
            shuffle_idx = rng.permutation(len(self.X))
            self.X = self.X[shuffle_idx]
            self.y = self.y[shuffle_idx]
            self.actual_returns = self.actual_returns[shuffle_idx]

            stage.success({
                'total_samples': len(self.X),
                'shape': str(self.X.shape),
                'down_trend': int(np.sum(self.y == 0)),
                'sideways': int(np.sum(self.y == 1)),
                'up_trend': int(np.sum(self.y == 2))
            })

            self._log(f"✅ 加载完成: {len(self.X)} 条样本", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def validate_data(self) -> 'AutoDataPipeline':
        """验证数据"""
        stage = self._create_stage('validate')
        stage.start()

        try:
            self._log("📋 数据验证...")

            # 维度验证
            assert self.X.ndim == 3, f"特征维度错误: {self.X.ndim}D，期望3D"
            assert self.X.shape[1] == self.SEQUENCE_LENGTH, f"序列长度错误"
            assert self.X.shape[2] == NUM_FEATURES, f"特征数错误"
            assert self.y.ndim == 1, f"标签维度错误"
            assert len(self.X) == len(self.y), f"样本数不匹配"

            # 类别验证
            unique_classes = np.unique(self.y)
            assert np.array_equal(unique_classes, [0, 1, 2]), f"类别值错误: {unique_classes}"

            # NaN检查
            nan_count = np.isnan(self.X).sum()
            if nan_count > 0:
                self._log(f"发现 {nan_count} 个NaN值", 'warning')

            # 样本数检查
            if len(self.X) < self.MIN_TOTAL_SAMPLES:
                self._log(f"样本数较少 ({len(self.X)} 条)", 'warning')

            # 类别不平衡检查
            class_counts = np.bincount(self.y)
            imbalance_ratio = np.max(class_counts) / np.min(class_counts)
            if imbalance_ratio > self.IMBALANCE_RATIO_THRESHOLD:
                self._log(f"数据不平衡比例: {imbalance_ratio:.2f}:1", 'warning')

            stage.success({
                'dimensions_ok': True,
                'nan_count': int(nan_count),
                'imbalance_ratio': float(imbalance_ratio)
            })

            self._log("✅ 验证通过", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def clean_data(self) -> 'AutoDataPipeline':
        """清理数据（处理NaN/Inf）"""
        stage = self._create_stage('clean')
        stage.start()

        try:
            self._log("🧹 数据清理...")

            # 检查Inf
            inf_count = np.isinf(self.X).sum()
            if inf_count > 0:
                self._log(f"发现 {inf_count} 个Inf值，转为NaN", 'warning')
                self.X = self.X.copy()
                self.X[np.isinf(self.X)] = np.nan

            # 检查NaN
            nan_count = np.isnan(self.X).sum()
            if nan_count > 0:
                self._log(f"使用SimpleImputer填充 {nan_count} 个NaN值", 'info')
                X_flat = self.X.reshape(len(self.X), -1)
                self.imputer = SimpleImputer(strategy='mean')
                X_flat = self.imputer.fit_transform(X_flat)
                self.X = X_flat.reshape(self.X.shape)

            if self.imputer is None:
                # 即使没有NaN，也创建imputer（保证接口一致）
                X_flat = self.X.reshape(len(self.X), -1)
                self.imputer = SimpleImputer(strategy='mean')
                X_flat = self.imputer.fit_transform(X_flat)
                self.X = X_flat.reshape(self.X.shape)

            stage.success({
                'nan_count': int(nan_count),
                'inf_count': int(inf_count),
                'shape': str(self.X.shape)
            })

            self._log("✅ 清理完成", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def engineer_features(self) -> 'AutoDataPipeline':
        """特征工程（生成语义化特征名）"""
        stage = self._create_stage('engineer')
        stage.start()

        try:
            self._log("🔧 特征工程...")

            # 验证特征数
            if len(FEATURE_NAMES) != self.FEATURES_PER_STEP:
                raise ValueError(f"特征名计数错误: {len(FEATURE_NAMES)} != {self.FEATURES_PER_STEP}")

            # 生成特征名
            self.feature_names = []
            for k_idx in range(self.SEQUENCE_LENGTH):
                for feat_name in FEATURE_NAMES:
                    self.feature_names.append(f"K{k_idx}_{feat_name}")

            assert len(self.feature_names) == self.TOTAL_FEATURES

            stage.success({
                'feature_count': len(self.feature_names),
                'sample_features': self.feature_names[:5]
            })

            self._log(f"✅ 生成 {len(self.feature_names)} 个语义化特征名", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def standardize_data(self) -> 'AutoDataPipeline':
        """标准化数据"""
        stage = self._create_stage('standardize')
        stage.start()

        try:
            self._log("📊 标准化数据...")

            # 扁平化
            X_flat = self.X.reshape(len(self.X), -1)

            # 标准化
            self.scaler = StandardScaler()
            X_flat = self.scaler.fit_transform(X_flat)

            # 验证
            if np.any(np.isnan(X_flat)) or np.any(np.isinf(X_flat)):
                raise ValueError("标准化后包含NaN/Inf")

            # 重塑
            self.X = X_flat.reshape(len(self.X), self.SEQUENCE_LENGTH, NUM_FEATURES)

            stage.success({
                'mean': float(self.X.mean()),
                'std': float(self.X.std()),
                'shape': str(self.X.shape)
            })

            self._log("✅ 标准化完成", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def split_data(self) -> 'AutoDataPipeline':
        """分割数据"""
        stage = self._create_stage('split')
        stage.start()

        try:
            self._log("✂️ 数据分割...")

            n_samples = len(self.X)

            if n_samples < self.SMALL_DATA_THRESHOLD:
                self._log(f"小数据模式 (N={n_samples}): 3-Way Split", 'info')
                train_ratio, val_ratio, test_ratio = 0.70, 0.15, 0.15

                train_size = int(n_samples * train_ratio)
                val_size = int(n_samples * val_ratio)

                self.X_train = self.X[:train_size]
                self.X_val = self.X[train_size:train_size + val_size]
                self.X_test = self.X[train_size + val_size:]

                self.y_train = self.y[:train_size]
                self.y_val = self.y[train_size:train_size + val_size]
                self.y_test = self.y[train_size + val_size:]

                self.X_calibrate = self.X_val.copy()
                self.y_calibrate = self.y_val.copy()

                if self.actual_returns is not None:
                    self.returns_train = self.actual_returns[:train_size]
                    self.returns_val = self.actual_returns[train_size:train_size + val_size]
                    self.returns_test = self.actual_returns[train_size + val_size:]
                    self.returns_calibrate = self.returns_val.copy()

            else:
                self._log(f"大数据模式 (N={n_samples}): 4-Way Split", 'info')
                train_ratio, val_ratio, calibrate_ratio, test_ratio = 0.50, 0.20, 0.20, 0.10

                train_size = int(n_samples * train_ratio)
                val_size = int(n_samples * val_ratio)
                calibrate_size = int(n_samples * calibrate_ratio)

                self.X_train = self.X[:train_size]
                self.X_val = self.X[train_size:train_size + val_size]
                self.X_calibrate = self.X[train_size + val_size:train_size + val_size + calibrate_size]
                self.X_test = self.X[train_size + val_size + calibrate_size:]

                self.y_train = self.y[:train_size]
                self.y_val = self.y[train_size:train_size + val_size]
                self.y_calibrate = self.y[train_size + val_size:train_size + val_size + calibrate_size]
                self.y_test = self.y[train_size + val_size + calibrate_size:]

                if self.actual_returns is not None:
                    self.returns_train = self.actual_returns[:train_size]
                    self.returns_val = self.actual_returns[train_size:train_size + val_size]
                    self.returns_calibrate = self.actual_returns[train_size + val_size:train_size + val_size + calibrate_size]
                    self.returns_test = self.actual_returns[train_size + val_size + calibrate_size:]

            stage.success({
                'train_size': len(self.X_train),
                'val_size': len(self.X_val),
                'calibrate_size': len(self.X_calibrate),
                'test_size': len(self.X_test)
            })

            self._log("✅ 分割完成", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def validate_consistency(self) -> 'AutoDataPipeline':
        """验证分布一致性"""
        stage = self._create_stage('consistency')
        stage.start()

        try:
            self._log("📏 分布一致性验证...")

            train_dist = np.bincount(self.y_train, minlength=3) / len(self.y_train)
            calibrate_dist = np.bincount(self.y_calibrate, minlength=3) / len(self.y_calibrate)

            js_divergence = jensenshannon(train_dist, calibrate_dist)

            if js_divergence < self.JS_DIVERGENCE_EXCELLENT:
                status = '优秀'
            elif js_divergence < self.JS_DIVERGENCE_GOOD:
                status = '良好'
            elif js_divergence < self.JS_DIVERGENCE_ACCEPTABLE:
                status = '可接受'
            else:
                status = '警告'

            self._log(f"Jensen-Shannon散度: {js_divergence:.4f} ({status})", 'info')

            stage.success({
                'js_divergence': float(js_divergence),
                'status': status,
                'train_distribution': train_dist.tolist(),
                'calibrate_distribution': calibrate_dist.tolist()
            })

            self._log("✅ 一致性验证完成", 'success')

        except Exception as e:
            stage.fail(str(e))
            raise

        return self

    def run(self) -> Tuple:
        """
        一键运行完整管道
        
        Returns:
            (X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata)
        """
        self._log("="*70)
        self._log("🚀 AutoDataPipeline 开始运行")
        self._log("="*70)

        try:
            self.load_data()
            self.validate_data()
            self.clean_data()
            self.engineer_features()
            self.standardize_data()
            self.split_data()
            self.validate_consistency()

            # 构建元数据
            self._build_metadata()

            self._log("="*70)
            self._log("✅ 管道运行完成")
            self._log("="*70)

            return (
                self.X_train, self.y_train,
                self.X_val, self.y_val,
                self.X_calibrate, self.y_calibrate,
                self.X_test, self.y_test,
                self.metadata
            )

        except Exception as e:
            self._log(f"❌ 管道运行失败: {e}", 'error')
            raise

    def run_with_dataframe(self) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame, Dict]:
        """
        运行管道并返回DataFrame格式（用于AutoGluon）
        
        Returns:
            (train_df, val_df, calibrate_df, test_df, metadata)
        """
        X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = self.run()

        # 扁平化
        X_train_flat = X_train.reshape(len(X_train), -1)
        X_val_flat = X_val.reshape(len(X_val), -1)
        X_calibrate_flat = X_calibrate.reshape(len(X_calibrate), -1)
        X_test_flat = X_test.reshape(len(X_test), -1)

        # 创建DataFrame
        train_df = pd.DataFrame(X_train_flat, columns=self.feature_names)
        train_df['trend'] = y_train

        val_df = pd.DataFrame(X_val_flat, columns=self.feature_names)
        val_df['trend'] = y_val

        calibrate_df = pd.DataFrame(X_calibrate_flat, columns=self.feature_names)
        calibrate_df['trend'] = y_calibrate

        test_df = pd.DataFrame(X_test_flat, columns=self.feature_names)
        test_df['trend'] = y_test

        return train_df, val_df, calibrate_df, test_df, metadata

    def _build_metadata(self):
        """构建完整元数据"""
        self.metadata['data_split'] = {
            'train': len(self.X_train),
            'val': len(self.X_val),
            'calibrate': len(self.X_calibrate),
            'test': len(self.X_test)
        }

        self.metadata['class_distribution'] = {
            'down_trend': int(np.sum(self.y == 0)),
            'sideways': int(np.sum(self.y == 1)),
            'up_trend': int(np.sum(self.y == 2))
        }

        self.metadata['statistics'] = {
            'total_samples': len(self.X),
            'total_features': len(self.feature_names),
            'feature_mean': float(self.X.mean()),
            'feature_std': float(self.X.std())
        }

        self.metadata['stages'] = {
            name: {
                'status': stage.status,
                'duration': stage.duration,
                'info': stage.info,
                'error': stage.error
            }
            for name, stage in self.stages.items()
        }

    def get_metadata(self) -> Dict:
        """获取元数据"""
        return self.metadata

    def get_stage_info(self, stage_name: str) -> Dict:
        """获取特定阶段的信息"""
        if stage_name not in self.stages:
            return {}
        stage = self.stages[stage_name]
        return {
            'status': stage.status,
            'duration': f"{stage.duration:.2f}s",
            'info': stage.info
        }

    def get_scaler(self) -> StandardScaler:
        """获取标准化器（用于预测时复现）"""
        if self.scaler is None:
            raise RuntimeError("Scaler not initialized. Run pipeline first.")
        return self.scaler

    def get_imputer(self) -> SimpleImputer:
        """获取填充器（用于预测时复现）"""
        if self.imputer is None:
            raise RuntimeError("Imputer not initialized. Run pipeline first.")
        return self.imputer

    def get_feature_names(self) -> List[str]:
        """获取特征名列表"""
        if not hasattr(self, 'feature_names'):
            raise RuntimeError("Feature names not generated. Run pipeline first.")
        return self.feature_names

    def print_full_log(self):
        """打印完整日志"""
        print("\n" + "="*70)
        print("📋 完整处理日志")
        print("="*70)
        for log in self.metadata['processing_log']:
            print(log)

    def get_processing_report(self) -> str:
        """获取处理报告"""
        report = []
        report.append("="*70)
        report.append("✅ 数据处理完成报告")
        report.append("="*70)

        report.append("\n📊 数据统计")
        for key, val in self.metadata['statistics'].items():
            if isinstance(val, float):
                report.append(f"  {key}: {val:.6f}")
            else:
                report.append(f"  {key}: {val}")

        report.append("\n📈 类别分布")
        for trend, count in self.metadata['class_distribution'].items():
            pct = count / self.metadata['statistics']['total_samples'] * 100
            report.append(f"  {trend}: {count} ({pct:.1f}%)")

        report.append("\n⏱️ 处理时间")
        total_duration = sum(s['duration'] for s in self.metadata['stages'].values() if isinstance(s.get('duration'), (int, float)))
        for stage_name, stage_info in self.metadata['stages'].items():
            if isinstance(stage_info.get('duration'), (int, float)):
                report.append(f"  {stage_name}: {stage_info['duration']:.2f}s")
        report.append(f"  总耗时: {total_duration:.2f}s")

        if self.metadata['warnings']:
            report.append("\n⚠️ 警告")
            for warn in self.metadata['warnings']:
                report.append(f"  - {warn}")
        else:
            report.append("\n✅ 无警告")

        return "\n".join(report)

    def save_state(self, path: str):
        """保存处理状态"""
        state = {
            'scaler': self.scaler,
            'imputer': self.imputer,
            'feature_names': self.feature_names if hasattr(self, 'feature_names') else None,
            'metadata': self.metadata,
            'config': self.config
        }
        joblib.dump(state, path)
        self._log(f"状态已保存到 {path}", 'success')

    def load_state(self, path: str):
        """加载处理状态"""
        state = joblib.load(path)
        self.scaler = state['scaler']
        self.imputer = state['imputer']
        self.feature_names = state['feature_names']
        self.metadata = state['metadata']
        self.config = state['config']
        self._log(f"状态已从 {path} 加载", 'success')
