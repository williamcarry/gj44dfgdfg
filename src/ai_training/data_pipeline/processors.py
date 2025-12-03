"""
数据处理器模块（可选）

如果用户想要更细粒度的控制，可以使用这些处理器。
但通常推荐直接使用 AutoDataPipeline。
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from typing import Tuple, Optional, Dict, Any


class DataValidator:
    """数据验证器"""

    @staticmethod
    def validate_dimensions(X: np.ndarray, y: np.ndarray, expected_shape: Tuple[int, int, int]) -> bool:
        """验证数据维度"""
        if X.ndim != 3:
            raise ValueError(f"X维度错误: {X.ndim}D，期望3D")
        if X.shape != (len(X), expected_shape[1], expected_shape[2]):
            raise ValueError(f"X形状错误: {X.shape}，期望({len(X)}, {expected_shape[1]}, {expected_shape[2]})")
        if y.ndim != 1:
            raise ValueError(f"y维度错误: {y.ndim}D，期望1D")
        if len(X) != len(y):
            raise ValueError(f"样本数不匹配: {len(X)} != {len(y)}")
        return True

    @staticmethod
    def validate_labels(y: np.ndarray, expected_classes: list = None) -> bool:
        """验证标签"""
        unique = np.unique(y)
        if expected_classes is None:
            expected_classes = [0, 1, 2]
        if not np.array_equal(unique, expected_classes):
            raise ValueError(f"类别值错误: {unique}，期望 {expected_classes}")
        return True

    @staticmethod
    def check_nan_inf(X: np.ndarray) -> Dict[str, int]:
        """检查NaN和Inf"""
        return {
            'nan_count': int(np.isnan(X).sum()),
            'inf_count': int(np.isinf(X).sum())
        }


class DataCleaner:
    """数据清理器"""

    @staticmethod
    def handle_nan(X: np.ndarray, strategy: str = 'mean') -> Tuple[np.ndarray, SimpleImputer]:
        """处理NaN值"""
        if np.isnan(X).sum() == 0:
            # 即使没有NaN，也创建imputer
            imputer = SimpleImputer(strategy=strategy)
            X_flat = X.reshape(len(X), -1)
            X_flat = imputer.fit_transform(X_flat)
            return X_flat.reshape(X.shape), imputer

        X_flat = X.reshape(len(X), -1)
        imputer = SimpleImputer(strategy=strategy)
        X_flat = imputer.fit_transform(X_flat)
        return X_flat.reshape(X.shape), imputer

    @staticmethod
    def handle_inf(X: np.ndarray) -> np.ndarray:
        """处理Inf值（转为NaN）"""
        if np.isinf(X).sum() == 0:
            return X
        X = X.copy()
        X[np.isinf(X)] = np.nan
        return X

    @staticmethod
    def remove_outliers(X: np.ndarray, z_threshold: float = 3.0) -> np.ndarray:
        """移除异常值（基于z-score）"""
        X_flat = X.reshape(len(X), -1)
        z_scores = np.abs((X_flat - X_flat.mean()) / X_flat.std())
        mask = (z_scores < z_threshold).all(axis=1)
        return X[mask]


class FeatureEngineer:
    """特征工程器"""

    @staticmethod
    def generate_feature_names(
        sequence_length: int,
        feature_names_per_step: list,
        prefix: str = 'K'
    ) -> list:
        """生成语义化特征名"""
        feature_names = []
        for k_idx in range(sequence_length):
            for feat_name in feature_names_per_step:
                feature_names.append(f"{prefix}{k_idx}_{feat_name}")
        return feature_names

    @staticmethod
    def flatten_features(X: np.ndarray) -> np.ndarray:
        """扁平化3D特征为2D"""
        return X.reshape(len(X), -1)

    @staticmethod
    def reshape_features(X: np.ndarray, target_shape: Tuple) -> np.ndarray:
        """重塑特征回3D"""
        return X.reshape(target_shape)


class DataStandardizer:
    """数据标准化器"""

    @staticmethod
    def standardize(X: np.ndarray) -> Tuple[np.ndarray, StandardScaler]:
        """标准化数据"""
        X_flat = X.reshape(len(X), -1)
        scaler = StandardScaler()
        X_flat = scaler.fit_transform(X_flat)

        # 验证
        if np.any(np.isnan(X_flat)) or np.any(np.isinf(X_flat)):
            raise ValueError("标准化后包含NaN/Inf")

        return X_flat.reshape(X.shape), scaler

    @staticmethod
    def inverse_standardize(X: np.ndarray, scaler: StandardScaler) -> np.ndarray:
        """反标准化"""
        X_flat = X.reshape(len(X), -1)
        X_flat = scaler.inverse_transform(X_flat)
        return X_flat.reshape(X.shape)


class DataSplitter:
    """数据分割器"""

    @staticmethod
    def time_series_split(
        X: np.ndarray,
        y: np.ndarray,
        returns: Optional[np.ndarray] = None,
        n_samples: int = None
    ) -> Tuple:
        """时间序列分割"""
        if n_samples is None:
            n_samples = len(X)

        if n_samples < 500:
            # 小数据：3-way split
            train_size = int(n_samples * 0.70)
            val_size = int(n_samples * 0.15)

            X_train = X[:train_size]
            X_val = X[train_size:train_size + val_size]
            X_test = X[train_size + val_size:]

            y_train = y[:train_size]
            y_val = y[train_size:train_size + val_size]
            y_test = y[train_size + val_size:]

            X_calibrate = X_val.copy()
            y_calibrate = y_val.copy()

            if returns is not None:
                returns_train = returns[:train_size]
                returns_val = returns[train_size:train_size + val_size]
                returns_test = returns[train_size + val_size:]
                returns_calibrate = returns_val.copy()
            else:
                returns_train = returns_val = returns_test = returns_calibrate = None

        else:
            # 大数据：4-way split
            train_size = int(n_samples * 0.50)
            val_size = int(n_samples * 0.20)
            calibrate_size = int(n_samples * 0.20)

            X_train = X[:train_size]
            X_val = X[train_size:train_size + val_size]
            X_calibrate = X[train_size + val_size:train_size + val_size + calibrate_size]
            X_test = X[train_size + val_size + calibrate_size:]

            y_train = y[:train_size]
            y_val = y[train_size:train_size + val_size]
            y_calibrate = y[train_size + val_size:train_size + val_size + calibrate_size]
            y_test = y[train_size + val_size + calibrate_size:]

            if returns is not None:
                returns_train = returns[:train_size]
                returns_val = returns[train_size:train_size + val_size]
                returns_calibrate = returns[train_size + val_size:train_size + val_size + calibrate_size]
                returns_test = returns[train_size + val_size + calibrate_size:]
            else:
                returns_train = returns_val = returns_calibrate = returns_test = None

        return (
            X_train, X_val, X_calibrate, X_test,
            y_train, y_val, y_calibrate, y_test,
            returns_train, returns_val, returns_calibrate, returns_test
        )

    @staticmethod
    def stratified_split(
        X: np.ndarray,
        y: np.ndarray,
        test_size: float = 0.2,
        random_state: int = 42
    ) -> Tuple:
        """分层分割"""
        from sklearn.model_selection import train_test_split

        X_train, X_test, y_train, y_test = train_test_split(
            X, y,
            test_size=test_size,
            stratify=y,
            random_state=random_state
        )

        return X_train, X_test, y_train, y_test
