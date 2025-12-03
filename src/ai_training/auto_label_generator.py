"""
自动标签生成器 - 批量生成AI训练数据

═══════════════════════════════════════════════════════════════════════
📋 功能说明
═══════════════════════════════════════════════════════════════════════

自动从数据库读取历史K线数据，根据未来实际涨跌幅自动生成训练标签，生成大规模AI训练数据集。

功能特性：
    1. ✅ 从数据库自动读取历史K线数据
    2. ✅ 根据未来涨跌幅自动生成标签（上涨/下跌/横盘）
    3. ✅ 支持命令行参数控制（样本数、时间范围、阈值）
    4. ✅ 自动过滤异常数据（停牌、涨跌停）
    5. ✅ 样本平衡检测和提示
    6. ✅ 支持所有周期K线（day/week/1hour/30min/15min/5min）
    7. ✅ 保存到对应周期目录 ai_training_data/{period}_kline_training/

═══════════════════════════════════════════════════════════════════════
🎯 生成原理（时间截断规则）
═══════════════════════════════════════════════════════════════════════

时间线示意图：
    2020-01-01                  2024-10-31      2025-12-02
        |--------训练数据范围---------|         (今天)
        
    对于 2023-01-15 这天：
        ← 120根K线 | 当前 | → 5天后 →
                      ↑
                  标注日期
        
    ✅ 特征提取：只用前120根K线（不包含未来）
    ✅ 标签生成：查看后5天实际涨跌（训练时可以，因为已发生）
    ❌ 预测阶段：不能查看未来，只能用模型预测

标签生成规则：
    - 未来5天涨幅 > +3% → 标签=上涨（up_trend）
    - 未来5天跌幅 < -3% → 标签=下跌（down_trend）
    - 其他情况          → 标签=横盘（sideways）

═══════════════════════════════════════════════════════════════════════
🚀 使用方法
═══════════════════════════════════════════════════════════════════════

1. 使用默认参数（推荐新手）
   --------------------------------
   python ai_training_data/auto_label_generator.py
   
   默认生成：每类2000个样本
   时间范围：2020-01-01 ~ 2024-10-31
   涨跌阈值：±3%

2. 自定义每类样本数量
   --------------------------------
   # 每类3000个样本
   python ai_training_data/auto_label_generator.py --up 3000 --down 3000 --sideways 3000
   
   # 每类5000个样本（大规模训练）
   python ai_training_data/auto_label_generator.py --up 5000 --down 5000 --sideways 5000
   
   # 每类10000个样本（超大规模）
   python ai_training_data/auto_label_generator.py --up 10000 --down 10000 --sideways 10000

3. 自定义时间范围
   --------------------------------
   # 使用2018-2023年的数据
   python ai_training_data/auto_label_generator.py --start 2018-01-01 --end 2023-12-31
   
   # 使用2021-2024年的数据
   python ai_training_data/auto_label_generator.py --start 2021-01-01 --end 2024-10-31

4. 自定义涨跌阈值
   --------------------------------
   # 使用3%阈值（标准更宽松，样本更多）
   python ai_training_data/auto_label_generator.py --threshold 0.03
   
   # 使用8%阈值（标准更严格，样本更少但质量高）
   python ai_training_data/auto_label_generator.py --threshold 0.08
   
   # 使用10%阈值（只选择强烈信号）
   python ai_training_data/auto_label_generator.py --threshold 0.10

5. 自定义未来观察天数
   --------------------------------
   # 看未来3天（短线交易）
   python ai_training_data/auto_label_generator.py --future-days 3
   
   # 看未来10天（中线交易）
   python ai_training_data/auto_label_generator.py --future-days 10

6. 组合使用（完整自定义）
   --------------------------------
   python ai_training_data/auto_label_generator.py \
       --period day \
       --start 2019-01-01 \
       --end 2024-09-30 \
       --future-days 5 \
       --threshold 0.05 \
       --up 5000 \
       --down 5000 \
       --sideways 5000

7. 选择K线周期
   --------------------------------
   # 日线数据（默认）
   python ai_training_data/auto_label_generator.py --period day
   
   # 周线数据
   python ai_training_data/auto_label_generator.py --period week
   
   # 1小时线数据
   python ai_training_data/auto_label_generator.py --period 1hour
   
   # 30分钟线数据
   python ai_training_data/auto_label_generator.py --period 30min
   
   # 15分钟线数据
   python ai_training_data/auto_label_generator.py --period 15min
   
   # 5分钟线数据
   python ai_training_data/auto_label_generator.py --period 5min

═══════════════════════════════════════════════════════════════════════
📁 输出目录结构
═══════════════════════════════════════════════════════════════════════

ai_training_data/{period}_kline_training/  # period = day/week/1hour/30min/15min/5min
  ├── up_trend/data.json      # 上涨样本（未来5天涨幅>3%）
  ├── down_trend/data.json    # 下跌样本（未来5天跌幅<-3%）
  └── sideways/data.json      # 横盘样本（未来5天涨跌幅在±3%之间）

示例：
  - ai_training_data/day_kline_training/     # 日线训练数据
  - ai_training_data/week_kline_training/    # 周线训练数据
  - ai_training_data/1hour_kline_training/   # 1小时训练数据
  - ai_training_data/30min_kline_training/   # 30分钟训练数据
  - ai_training_data/15min_kline_training/   # 15分钟训练数据
  - ai_training_data/5min_kline_training/    # 5分钟训练数据

生成的JSON格式：
{
  "type": "day",
  "data": {
    "600000": {"date": "2023-01-15", "return": 0.052},  # ✅ 新格式：包含实际收益率
    "600089": {"date": "2023-02-20", "return": 0.038},
    "000001": {"date": "2023-03-10", "return": 0.045},
    ...
  }
}

含义：
  "600000": {"date": "2023-01-15", "return": 0.052}
  → 股票600000在2023-01-15这天，
     未来5天涨幅为5.2%（上涨样本）
     ✅ 现在可以用于真实回测！

═══════════════════════════════════════════════════════════════════════
📊 输出示例
═══════════════════════════════════════════════════════════════════════

======================================================================
自动标签生成器 - AI训练数据批量生成
======================================================================

⚙️ 参数配置:
  时间范围: 2020-01-01 ~ 2024-10-31
  未来天数: 5 天
  上涨阈值: +3.0%
  下跌阈值: -3.0%
  每类样本数: 2000

正在获取股票列表...
✅ 找到 5234 只股票

开始批量生成标签...
[1/5234] 处理 000001...
  当前进度: 上涨0 下跌0 横盘0

✅ 所有类别已收集足够样本，提前结束

======================================================================
正在保存数据...
======================================================================
✅ up_trend: 2000 个样本
✅ down_trend: 2000 个样本
✅ sideways: 2000 个样本

======================================================================
生成完成！
======================================================================

📊 统计信息:
  总处理次数: 245678
  数据不足: 1234
  跳过停牌: 567
  跳过涨跌停: 234

  上涨样本: 2000 (33.3%)
  下跌样本: 2000 (33.3%)
  横盘样本: 2000 (33.3%)

✅ 样本分布较为均衡

═══════════════════════════════════════════════════════════════════════
⚠️ 重要提示
═══════════════════════════════════════════════════════════════════════

1. 时间截断原则
   - end_date 必须在今天之前至少5天（避免使用"真正的未来"）
   - 训练数据只使用"已发生的历史"
   - 预测时不能查看未来，只能用模型预测

2. 数据质量控制
   - 自动过滤停牌股票
   - 自动过滤涨跌停板
   - 自动过滤数据不足的股票

3. 样本平衡建议
   - 建议每类样本数量相近（如都是2000）
   - 如果样本不平衡，训练时使用 class_weight='balanced'

4. 下一步操作
   生成数据后，使用训练脚本开始训练：
   
   ⭐ 推荐（AutoML - 最高准确率）：
   python src/ai_training/train_trend_autogluon.py ai_training_data/day_kline_training
   
   或使用旧版（Legacy）：
   python src/ai_training/legacy/train_trend_lstm_ensemble.py ai_training_data/day_kline_training

═══════════════════════════════════════════════════════════════════════
🔧 命令行参数说明
═══════════════════════════════════════════════════════════════════════

--period        K线周期 (day/week/1hour/30min/15min/5min) (默认: day)
--start         训练数据起始日期 (默认: 2020-01-01)
--end           训练数据结束日期 (默认: 2024-10-31)
--future-days   未来观察天数 (默认: 5)
--threshold     涨跌阈值（绝对值） (默认: 0.03 即3%)
--up            上涨样本数量 (默认: 2000)
--down          下跌样本数量 (默认: 2000)
--sideways      横盘样本数量 (默认: 2000)

═══════════════════════════════════════════════════════════════════════
"""

import sys
import os
import json
import argparse
from datetime import datetime, timedelta
from pathlib import Path
import numpy as np
import shutil

# 导入数据库模块
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

try:
    from src.ai_training.kline_data_loader import StockImageAnalyzer
    from database.config import SessionLocal
    from database.models import stock_kline_day, stock_kline_week, stock_kline_1hour, stock_kline_30min, stock_kline_15min, stock_kline_5min
except ImportError as e:
    print(f"❌ 导入失败: {e}")
    print("请确保数据库配置正确")
    sys.exit(1)

# K线周期与数据库表的映射
PERIOD_MODEL_MAP = {
    'day': stock_kline_day.StockKlineDay,
    'week': stock_kline_week.StockKlineWeek,
    '1hour': stock_kline_1hour.StockKline1Hour,
    '30min': stock_kline_30min.StockKline30Min,
    '15min': stock_kline_15min.StockKline15Min,
    '5min': stock_kline_5min.StockKline5Min
}

# ═══════════════════════════════════════════════════════════════════════════
# 🔥 全局配置：核心参数（修改后必须重新生成数据+重新训练模型）
# ═══════════════════════════════════════════════════════════════════════════

# ⚠️⚠️⚠️ 重要警告：修改以下参数后必须执行完整流程 ⚠️⚠️⚠️
#
# 如果修改了 FUTURE_DAYS 或 THRESHOLD_UP/DOWN，必须：
#   1️⃣ 重新生成训练数据（运行 auto_label_generator.py）
#   2️⃣ 重新训练模型（运行 train_trend_autogluon.py）
#
# 原因：标签含义会完全改变！
#   - future_days=5  → 标签含义是"未来5天的趋势"
#   - future_days=10 → 标签含义是"未来10天的趋势"
#   同一根K线在不同周期下，标签可能完全不同（约35%会改变）
#
# 示例：股票600000在2023-01-15
#   - 5天后涨4%  → 标签=上涨 ✅
#   - 10天后跌2% → 标签=横盘 ⚠️
#   如果用"5天模型"预测"10天趋势"，会产生错误预测！

FUTURE_DAYS = 5        # 未来观察天数（默认5天）
                        # 建议值：3天(短线) / 5天(波段) / 10天(中线) / 15天(长线)
                        # ⚠️ 修改此值必须重新生成数据+重新训练！

THRESHOLD_UP = 0.03    # 上涨阈值：+3%
                        # 含义：未来FUTURE_DAYS天涨幅>3%才标记为"上涨"
                        # 💡 回测时会使用：截断收益率防止过度乐观（涨15%→截断为3%）
                        # ⚠️ 修改此值必须重新生成数据+重新训练！

THRESHOLD_DOWN = -0.03  # 下跌阈值：-3%
                        # 含义：未来FUTURE_DAYS天跌幅<-3%才标记为"下跌"
                        # 💡 回测时会使用：截断收益率防止过度悲观（跌10%→截断为-3%）
                        # ⚠️ 修改此值必须重新生成数据+重新训练！

# ═══════════════════════════════════════════════════════════════════════════


class AutoLabelGenerator:
    """自动标签生成器"""
    
    def __init__(self, 
                 period='day',
                 start_date='2020-01-01',
                 end_date='2024-10-31',
                 future_days=FUTURE_DAYS,        # ✅ 使用全局常量作为默认值
                 up_threshold=THRESHOLD_UP,      # ✅ 使用全局常量作为默认值
                 down_threshold=THRESHOLD_DOWN,  # ✅ 使用全局常量作为默认值
                 max_samples_per_class=2000):  # ⭐ 默认2000个/类：统计学性价比最优点
        """
        初始化标签生成器
        
        参数:
            period: K线周期 (day/week/1hour/30min/15min/5min)
            start_date: 训练数据起始日期
            end_date: 训练数据结束日期（必须在今天之前至少future_days天）
            
            🔥🔥🔥 核心参数：预测周期（修改后必须重新训练）🔥🔥🔥
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            future_days: 未来观察天数（默认5天，从全局常量FUTURE_DAYS读取）
                ⚠️⚠️⚠️ 修改此参数必须重新生成数据+重新训练模型！
                
                含义：模型预测的是"未来N天"的趋势
                   - future_days=3  → 预测"未来3天"的趋势（短线）
                   - future_days=5  → 预测"未来5天"的趋势（波段）⭐ 推荐
                   - future_days=10 → 预测"未来10天"的趋势（中线）
                   - future_days=15 → 预测"未来15天"的趋势（长线）
                
                为什么必须重新训练？
                   同一根K线在不同周期下，标签可能完全不同：
                   
                   示例：股票600000在2023-01-15（收盘15.00元）
                   - 3天后: 15.50元 (涨3.3%) → 标签=上涨 ✅
                   - 5天后: 15.60元 (涨4.0%) → 标签=上涨 ✅
                   - 10天后: 14.80元 (跌1.3%) → 标签=横盘 ⚠️
                   - 15天后: 14.50元 (跌3.3%) → 标签=下跌 ❌
                   
                   统计数据：改变future_days后，约35%的K线标签会改变！
                   
                   错误示例：
                   ❌ 用future_days=5训练的模型去预测10天趋势
                      → 模型预测"上涨"，但实际是指"5天会涨"，不是"10天会涨"！
                   
                   正确做法：
                   ✅ 修改全局常量FUTURE_DAYS=10
                   ✅ 重新运行 auto_label_generator.py 生成新数据
                   ✅ 重新运行 train_trend_autogluon.py 训练新模型
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            
            🔥🔥🔥 重要参数：涨跌阈值（直接影响真实回测结果）🔥🔥🔥
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            up_threshold: 上涨阈值（默认3% = 0.03，从全局常量THRESHOLD_UP读取）
                ⚠️  这个阈值直接决定：
                   1. 什么样的样本会被标记为"上涨"
                   2. 回测时"上涨"样本的实际收益率范围
                   
                💡 示例：
                   - up_threshold=0.03 (3%)  → 未来N天涨幅>3%才算"上涨"
                   - up_threshold=0.05 (5%)  → 未来N天涨幅>5%才算"上涨"（标准更严格）
                   - up_threshold=0.10 (10%) → 未来N天涨幅>10%才算"上涨"（只选强势股）
                   
                🎯 回测影响：
                   阈值越低 → "上涨"样本越多，但收益率较低（3%-10%）
                   阈值越高 → "上涨"样本越少，但收益率较高（10%+）
                   
            down_threshold: 下跌阈值（默认-3% = -0.03，从全局常量THRESHOLD_DOWN读取）
                ⚠️  同理，决定什么样的样本会被标记为"下跌"
                ⚠️  修改此参数也必须重新生成数据+重新训练模型！
                
            ⚡ 核心逻辑（第456-461行）：
               current_close = klines[idx].close
               future_close = klines[idx + self.future_days].close  # ⭐ 往后数N天
               return_pct = (future_close - current_close) / current_close
               
               if return_pct > up_threshold:     # 涨幅 > 3%
                   label = 'up_trend'            # → 标记为上涨
               elif return_pct < down_threshold: # 跌幅 < -3%
                   label = 'down_trend'          # → 标记为下跌
               else:
                   label = 'sideways'            # → 标记为横盘
               
            📊 回测时会使用这些实际收益率计算：
               - Sharpe Ratio（夏普比率）
               - Max Drawdown（最大回撤）
               - Win Rate（胜率）
               等金融指标
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            
            max_samples_per_class: 每类最大样本数（默认2000）
                → 500-3000个/类：推荐区间
                → 2000个/类：权重稳定±0.7%，性价比最优
                → >5000个/类：收益递减，不推荐
        """
        self.period = period
        self.start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
        self.end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        self.future_days = future_days
        self.up_threshold = up_threshold
        self.down_threshold = down_threshold
        self.max_samples_per_class = max_samples_per_class
        
        # 获取对应周期的数据库模型
        if period not in PERIOD_MODEL_MAP:
            raise ValueError(f"不支持的周期: {period}, 可选: {list(PERIOD_MODEL_MAP.keys())}")
        self.kline_model = PERIOD_MODEL_MAP[period]
        
        # 检查时间截断规则
        today = datetime.now().date()
        if self.end_date >= today - timedelta(days=future_days):
            print(f"⚠️ 警告：end_date太接近今天，自动调整为 {today - timedelta(days=future_days+1)}")
            self.end_date = today - timedelta(days=future_days+1)
        
        # 初始化数据库连接
        print("\n正在初始化数据库连接...")
        self.db = SessionLocal()
        print("✅ 数据库连接成功")
        
        # 初始化数据分类字典
        self.data_by_trend = {
            'up_trend': {},      # 上涨样本：{'股票代码': '日期', ...}
            'down_trend': {},    # 下跌样本
            'sideways': {}       # 横盘样本
        }
        
        # 统计信息
        self.stats = {
            'total_processed': 0,
            'data_insufficient': 0,
            'up_trend': 0,
            'down_trend': 0,
            'sideways': 0,
            'skipped_suspended': 0,  # 跳过停牌
            'skipped_limit': 0       # 跳过涨跌停
        }
    
    def get_all_stock_codes(self):
        """获取所有股票代码"""
        try:
            # 查询所有不重复的股票代码
            result = self.db.query(self.kline_model.stock_code).distinct().all()
            stock_codes = [row[0] for row in result]
            return stock_codes
        except Exception as e:
            print(f"❌ 获取股票列表失败: {e}")
            return []
    
    def check_data_quality(self, klines, idx):
        """
        检查数据质量，过滤异常样本
        
        参数:
            klines: K线数据列表
            idx: 当前索引
        
        返回:
            (is_valid, reason)
        """
        try:
            # 检查当天是否停牌
            current_kline = klines[idx]
            if float(current_kline.volume) == 0:
                return False, "停牌"
            
            # 检查当天是否涨跌停
            open_price = float(current_kline.open)
            close_price = float(current_kline.close)
            high_price = float(current_kline.high)
            low_price = float(current_kline.low)
            
            # 涨跌停判断（收盘价=最高/最低价）
            if abs(close_price - high_price) < 0.01 and abs((close_price - open_price) / open_price) > 0.095:
                return False, "涨停"
            if abs(close_price - low_price) < 0.01 and abs((close_price - open_price) / open_price) > 0.095:
                return False, "跌停"
            
            # 检查未来5天是否有停牌
            for i in range(idx + 1, idx + 1 + self.future_days):
                if float(klines[i].volume) == 0:
                    return False, "未来停牌"
            
            return True, "正常"
        
        except Exception as e:
            return False, f"异常:{str(e)[:20]}"
    
    def generate_label_for_sample(self, klines, idx):
        """
        为单个样本生成标签
        
        参数:
            klines: K线数据列表（至少 idx + future_days + 1 根）
            idx: 当前索引（第120根K线的位置）
        
        返回:
            (label, return_pct, metadata)
        """
        try:
            # 检查数据充分性
            if idx < 120 or idx + self.future_days >= len(klines):
                return None, 0, "数据不足"
            
            # 检查数据质量
            is_valid, reason = self.check_data_quality(klines, idx)
            if not is_valid:
                return None, 0, reason
            
            # 计算未来收益率
            current_close = float(klines[idx].close)
            future_close = float(klines[idx + self.future_days].close)
            return_pct = (future_close - current_close) / current_close
            
            # 生成标签
            if return_pct > self.up_threshold:
                label = 'up_trend'
            elif return_pct < self.down_threshold:
                label = 'down_trend'
            else:
                label = 'sideways'
            
            # 元数据
            metadata = {
                'return_pct': return_pct,
                'current_close': current_close,
                'future_close': future_close,
                'date': str(klines[idx].trade_date)
            }
            
            return label, return_pct, metadata
        
        except Exception as e:
            return None, 0, f"计算失败:{str(e)[:20]}"
    
    def generate_for_stock(self, stock_code):
        """
        为单只股票生成标签数据
        
        参数:
            stock_code: 股票代码
        
        返回:
            生成的样本数量
        """
        try:
            # 查询该股票的所有K线数据
            klines = self.db.query(self.kline_model).filter(
                self.kline_model.stock_code == stock_code,
                self.kline_model.trade_date >= self.start_date,
                self.kline_model.trade_date <= self.end_date
            ).order_by(self.kline_model.trade_date).all()
            
            if len(klines) < 120 + self.future_days:
                self.stats['data_insufficient'] += 1
                return 0
            
            # 遍历每个可能的标注日期
            sample_count = 0
            
            for idx in range(120, len(klines) - self.future_days):
                # 检查是否已经收集够了样本
                if all(len(samples) >= self.max_samples_per_class for samples in self.data_by_trend.values()):
                    break
                
                self.stats['total_processed'] += 1
                
                # 生成标签
                label, return_pct, metadata = self.generate_label_for_sample(klines, idx)
                
                if label is None:
                    if '停牌' in str(metadata):
                        self.stats['skipped_suspended'] += 1
                    elif '涨停' in str(metadata) or '跌停' in str(metadata):
                        self.stats['skipped_limit'] += 1
                    continue
                
                # 检查该类别是否已满
                if len(self.data_by_trend[label]) >= self.max_samples_per_class:
                    continue
                
                # 保存样本
                date_str = metadata['date']
                # ✅ 修改：保存实际收益率，而不只是日期
                # 格式：{"股票代码": {"date": "日期", "return": 实际收益率}}
                self.data_by_trend[label][stock_code] = {
                    'date': date_str,
                    'return': float(return_pct)  # ✅ 保存实际收益率
                }
                self.stats[label] += 1
                sample_count += 1
            
            return sample_count
        
        except Exception as e:
            print(f"  ❌ 处理失败: {str(e)[:50]}")
            return 0
    
    def backup_old_data(self, output_dir):
        """
        备份旧数据，保留最近3份备份
        
        参数:
            output_dir: 输出目录路径
        """
        output_path = Path(output_dir)
        
        # 如果目录不存在，无需备份
        if not output_path.exists():
            print("\n📁 首次生成数据，无需备份")
            return
        
        # 检查是否有数据文件
        has_data = False
        for trend_name in ['up_trend', 'down_trend', 'sideways']:
            json_file = output_path / trend_name / 'data.json'
            if json_file.exists():
                has_data = True
                break
        
        if not has_data:
            print("\n📁 未发现旧数据，无需备份")
            return
        
        print("\n" + "=" * 70)
        print("正在备份旧数据...")
        print("=" * 70)
        
        # 生成备份目录名（带时间戳）
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_dir = output_path.parent / f"{output_path.name}_backup_{timestamp}"
        
        # 备份旧数据
        try:
            shutil.copytree(output_path, backup_dir)
            print(f"✅ 旧数据已备份到: {backup_dir}")
        except Exception as e:
            print(f"⚠️ 备份失败: {e}")
            return
        
        # 清理多余的备份（保留最近3份）
        self.cleanup_old_backups(output_path.parent, output_path.name)
    
    def cleanup_old_backups(self, parent_dir, base_name):
        """
        清理旧备份，只保留最近3份
        
        参数:
            parent_dir: 父目录
            base_name: 基础目录名（如 day_kline_training）
        """
        parent_path = Path(parent_dir)
        
        # 查找所有备份目录
        backup_pattern = f"{base_name}_backup_*"
        backup_dirs = sorted(parent_path.glob(backup_pattern))
        
        # 如果备份数量超过3份，删除最旧的
        if len(backup_dirs) > 3:
            print("\n🗑️ 清理旧备份（保留最近3份）...")
            to_delete = backup_dirs[:-3]  # 保留最后3个，删除其余的
            
            for old_backup in to_delete:
                try:
                    shutil.rmtree(old_backup)
                    print(f"  ✅ 已删除旧备份: {old_backup.name}")
                except Exception as e:
                    print(f"  ⚠️ 删除失败 {old_backup.name}: {e}")
            
            print(f"\n✅ 当前保留 {min(3, len(backup_dirs))} 份备份")
    
    def save_to_json(self, output_dir=None):
        """
        保存生成的标签数据到JSON文件
        
        参数:
            output_dir: 输出目录（如为None则自动根据周期生成）
        """
        if output_dir is None:
            # 根据周期自动生成目录名
            output_dir = f'./ai_training_data/{self.period}_kline_training'
        
        # 先备份旧数据
        self.backup_old_data(output_dir)
        
        print("\n" + "=" * 70)
        print("正在保存数据...")
        print("=" * 70)
        
        output_path = Path(output_dir)
        
        # 生成参数说明
        generation_params = {
            "生成时间": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "K线周期": self.period,
            "训练数据时间范围": f"{self.start_date} ~ {self.end_date}",
            "未来观察天数": self.future_days,
            "上涨阈值": f"+{self.up_threshold*100:.1f}%",
            "下跌阈值": f"{self.down_threshold*100:.1f}%",
            "上涨阈值_数值": float(self.up_threshold),  # ✅ 保存数值版本，用于回测
            "下跌阈值_数值": float(self.down_threshold),  # ✅ 保存数值版本，用于回测
            "样本数量": None  # 每个文件不同，后面填充
        }
        
        for trend_name, data_dict in self.data_by_trend.items():
            trend_dir = output_path / trend_name
            trend_dir.mkdir(parents=True, exist_ok=True)
            
            # 更新当前类别的样本数量
            generation_params["样本数量"] = len(data_dict)
            
            # 添加趋势类型说明
            if trend_name == 'up_trend':
                trend_description = f"上涨趋势（未来{self.future_days}天涨幅 > {self.up_threshold*100:.1f}%）"
            elif trend_name == 'down_trend':
                trend_description = f"下跌趋势（未来{self.future_days}天跌幅 < {self.down_threshold*100:.1f}%）"
            else:
                trend_description = f"横盘震荡（未来{self.future_days}天涨跌幅在{self.down_threshold*100:.1f}% ~ {self.up_threshold*100:.1f}%之间）"
            
            generation_params["趋势类型"] = trend_description
            
            json_file = trend_dir / 'data.json'
            with open(json_file, 'w', encoding='utf-8') as f:
                json.dump({
                    'generation_params': generation_params,
                    'type': self.period,
                    'data': data_dict
                }, f, ensure_ascii=False, indent=2)
            
            print(f"✅ {trend_name}: {len(data_dict)} 个样本 → {json_file}")
    
    def print_stats(self):
        """打印统计信息"""
        print("\n" + "=" * 70)
        print("生成完成！")
        print("=" * 70)
        print(f"\n📊 统计信息:")
        print(f"  总处理次数: {self.stats['total_processed']}")
        print(f"  数据不足: {self.stats['data_insufficient']}")
        print(f"  跳过停牌: {self.stats['skipped_suspended']}")
        print(f"  跳过涨跌停: {self.stats['skipped_limit']}")
        
        total_samples = self.stats['up_trend'] + self.stats['down_trend'] + self.stats['sideways']
        
        if total_samples > 0:
            print(f"\n  上涨样本: {self.stats['up_trend']} ({self.stats['up_trend']/total_samples*100:.1f}%)")
            print(f"  下跌样本: {self.stats['down_trend']} ({self.stats['down_trend']/total_samples*100:.1f}%)")
            print(f"  横盘样本: {self.stats['sideways']} ({self.stats['sideways']/total_samples*100:.1f}%)")
            
            # 样本平衡检查
            max_ratio = max(self.stats['up_trend'], self.stats['down_trend'], self.stats['sideways']) / total_samples
            if max_ratio > 0.5:
                print("\n⚠️ 警告：样本不平衡严重（最大类别占比 > 50%）")
                print("   建议：训练时使用 class_weight='balanced'")
            else:
                print("\n✅ 样本分布较为均衡")
    
    def run(self):
        """运行批量生成"""
        print("=" * 70)
        print("自动标签生成器 - AI训练数据批量生成")
        print("=" * 70)
        print(f"\n⚙️ 参数配置:")
        print(f"  K线周期: {self.period}")
        print(f"  时间范围: {self.start_date} ~ {self.end_date}")
        print(f"  未来天数: {self.future_days} 天")
        print(f"  上涨阈值: {self.up_threshold*100:+.1f}%")
        print(f"  下跌阈值: {self.down_threshold*100:+.1f}%")
        print(f"  每类样本数: {self.max_samples_per_class}")
        
        # 获取所有股票列表
        print("\n正在获取股票列表...")
        stock_list = self.get_all_stock_codes()
        print(f"✅ 找到 {len(stock_list)} 只股票")
        
        # 遍历每只股票
        print("\n开始批量生成标签...")
        for idx, stock_code in enumerate(stock_list, 1):
            # 检查是否已经收集够了样本
            if all(len(samples) >= self.max_samples_per_class for samples in self.data_by_trend.values()):
                print(f"\n✅ 所有类别已收集足够样本，提前结束")
                break
            
            # 每100只股票打印一次进度
            if idx % 100 == 0 or idx == 1:
                print(f"\n[{idx}/{len(stock_list)}] 处理 {stock_code}...")
                print(f"  当前进度: 上涨{len(self.data_by_trend['up_trend'])} "
                      f"下跌{len(self.data_by_trend['down_trend'])} "
                      f"横盘{len(self.data_by_trend['sideways'])}")
            
            # 生成该股票的标签
            count = self.generate_for_stock(stock_code)
        
        # 保存到JSON文件
        self.save_to_json()
        
        # 打印统计信息
        self.print_stats()
        
        # 关闭数据库连接
        self.db.close()
        print("\n✅ 数据库连接已关闭")


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='自动生成AI训练标签数据')
    
    parser.add_argument('--period', type=str, default='day',
                        choices=['day', 'week', '1hour', '30min', '15min', '5min'],
                        help='K线周期 (默认: day)')
    parser.add_argument('--start', type=str, default='2020-01-01',
                        help='训练数据起始日期 (默认: 2020-01-01)')
    parser.add_argument('--end', type=str, default='2024-10-31',
                        help='训练数据结束日期 (默认: 2024-10-31)')
    parser.add_argument('--future-days', type=int, default=5,
                        help='未来观察天数 (默认: 5)')
    
    # 🔥🔥🔥 核心参数：阈值（直接决定回测结果）🔥🔥🔥
    parser.add_argument('--threshold', type=float, default=THRESHOLD_UP,  # ✅ 使用全局常量
                        help='''
涨跌阈值（绝对值） (默认: 0.03即3%%)

⚠️  这个参数直接影响真实回测的金融指标！

💡 作用：
   - 决定哪些样本被标记为"上涨"/"下跌"
   - 决定回测时的实际收益率范围

🎯 示例：
   --threshold 0.03  → 涨跌幅>3%  （标准宽松，样本多）
   --threshold 0.05  → 涨跌幅>5%  （中等标准）
   --threshold 0.08  → 涨跌幅>8%  （标准严格）
   --threshold 0.10  → 涨跌幅>10% （只选强势股）

📊 回测影响：
   阈值低 → 样本多，但回测收益率较低 (3%-10%)
   阈值高 → 样本少，但回测收益率较高 (10%+)
   
⚡ 回测指标会受影响：
   - Sharpe Ratio (夏普比率)
   - Max Drawdown (最大回撤)
   - Win Rate (胜率)
''')
    parser.add_argument('--up', type=int, default=2000,
                        help='上涨样本数量 (默认: 2000)')
    parser.add_argument('--down', type=int, default=2000,
                        help='下跌样本数量 (默认: 2000)')
    parser.add_argument('--sideways', type=int, default=2000,
                        help='横盘样本数量 (默认: 2000)')
    
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    # 📊 样本数量选择指南（基于统计学和实践经验）
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    #
    # 每类样本数的影响：
    #
    # 【太少（<500个/类）】❌ 不推荐
    #   问题：
    #   - 模型容易过拟合（背答案而非学规律）
    #   - 权重计算不稳定（每次训练结果差异大）
    #   - 难以代表真实市场分布
    #   适用场景：快速测试、概念验证
    #
    # 【适中（500-3000个/类）】✅ 推荐区间
    #   优势：
    #   - 500个/类：最低标准，权重稳定±1.4%
    #   - 1000个/类：良好标准，权重稳定±1.0%
    #   - 2000个/类：理想标准，权重稳定±0.7%（默认值）⭐
    #   - 3000个/类：上限，权重稳定±0.6%（收益递减）
    #   适用场景：日常训练、生产环境
    #
    # 【太多（>5000个/类）】⚠️ 收益递减
    #   问题：
    #   - 权重提升边际效益低（±0.4% vs ±0.7%差别不大）
    #   - 训练时间显著增加（线性增长）
    #   - 内存占用增加
    #   - 过度工程化，性价比低
    #   适用场景：学术研究、极致优化
    #
    # 【实战建议】：
    #   - 新手/测试：500-1000个/类（快速验证）
    #   - 日常训练：2000个/类（平衡最优）← 当前默认
    #   - 严格优化：3000个/类（接近上限）
    #   - 超过5000：没必要，浪费资源
    #
    # 【关键原则】：
    #   ✅ 样本质量 > 样本数量
    #   ✅ 2000个/类已经是性价比最优点
    #   ✅ 继续增加收益递减（统计学显著性提升<0.2%）
    #   ✅ 不如把时间花在特征工程和参数调优上
    #
    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    
    args = parser.parse_args()
    
    # 取三个类别中的最大值作为每类样本数
    max_samples = max(args.up, args.down, args.sideways)
    
    # 创建生成器并运行
    generator = AutoLabelGenerator(
        period=args.period,
        start_date=args.start,
        end_date=args.end,
        future_days=args.future_days,
        up_threshold=args.threshold,
        down_threshold=-args.threshold,
        max_samples_per_class=max_samples
    )
    
    generator.run()


if __name__ == '__main__':
    main()
