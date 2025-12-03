""" 
股票K线数据库读取模块
职责: 从数据库读取K线数据
功能:
    1. 从数据库读取指定股票和日期的K线数据
    2. 支持多周期K线数据读取（日线、周线、5分钟、15分钟、30分钟、1小时）
    3. 从JSON文件批量读取训练数据
"""
from typing import Dict, List, Optional
import os
import sys

# 导入数据库配置
try:
    sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
    from database.config import SessionLocal
    DATABASE_AVAILABLE = True
except ImportError:
    print("⚠️ 数据库未配置,将无法使用数据库数据")
    DATABASE_AVAILABLE = False


class StockImageAnalyzer:
    """股票K线数据库读取器
    
    职责:
        - 从数据库读取K线数据
        - 支持多周期K线数据读取
        - 从JSON文件批量读取训练数据
    """
    
    def __init__(self, enable_database=True):
        # 初始化数据库连接
        self.db = None
        if enable_database and DATABASE_AVAILABLE:
            try:
                self.db = SessionLocal()
                print("✅ 数据库连接成功")
            except Exception as e:
                print(f"⚠️ 数据库连接失败: {e}")
                self.db = None
    
    def __del__(self):
        """析构函数 - 关闭数据库连接"""
        if self.db:
            try:
                self.db.close()
            except:
                pass
    
    def get_kline_data_from_db(self, stock_code: str, trade_date: str, 
                               period: str = 'day', count: int = 120) -> Optional[List]:
        """
        从数据库读取K线数据（含计算均线所需的历史数据）
        
        规则:
            从最右侧第1根K线的日期开始，往前读取足够的K线数据
            - 需要显示60根K线
            - 计算60日均线需要前面60根历史数据
            - 因此实际需要: 60 + 60 = 120根K线
        
        参数:
            stock_code: 股票代码 (如 '000001')
            trade_date: 最右侧第1根K线的日期 (如 '2025-11-28')
            period: 周期 ('day', '5min', '15min', '30min', '1hour', 'week')
            count: 需要的K线数量 (默认120，包含历史数据)
        
        返回:
            list: K线数据列表(长度>=count)，或 None
        """
        if not self.db:
            return None
        
        try:
            from database.models import stock_kline_day, stock_kline_week
            from database.models import stock_kline_5min, stock_kline_15min
            from database.models import stock_kline_30min, stock_kline_1hour
            from datetime import datetime
            
            # 选择对应的表
            model_map = {
                'day': stock_kline_day.StockKlineDay,
                'week': stock_kline_week.StockKlineWeek,
                '5min': stock_kline_5min.StockKline5Min,
                '15min': stock_kline_15min.StockKline15Min,
                '30min': stock_kline_30min.StockKline30Min,
                '1hour': stock_kline_1hour.StockKline1Hour,
                'bs': stock_kline_1hour.StockKline1Hour,  # 买卖点使用小时线表
            }
            
            KlineModel = model_map.get(period)
            if not KlineModel:
                return None
            
            # 转换日期格式
            if isinstance(trade_date, str):
                trade_date = datetime.strptime(trade_date, '%Y-%m-%d').date()
            
            # 查询K线(从trade_date往前count根，包括第1根)
            klines = self.db.query(KlineModel).filter(
                KlineModel.code == stock_code,
                KlineModel.date <= trade_date
            ).order_by(KlineModel.date.desc()).limit(count).all()
            
            # 检查数量是否满足
            if len(klines) >= count:
                # 按时间正序排列(从旧到新)
                klines.reverse()
                return klines
            else:
                return None
        
        except Exception as e:
            print(f"    数据库读取失败: {str(e)[:50]}")
            return None
    
    def get_training_data_from_json(self, json_file_path: str) -> Optional[List[Dict]]:
        """
        从JSON文件读取训练数据列表，直接从数据库获取K线
        
        JSON格式:
        {
            "type": "day",  // 或 "week", "5min", "15min", "30min", "1hour", "bs"(买卖点)
            "data": {
                "600000": "2025-11-29",
                "600001": "2025-11-28",
                ...
            }
        }
        
        参数:
            json_file_path: JSON文件路径
        
        返回:
            list: [
                {
                    'stock_code': '600000',
                    'trade_date': '2025-11-29',
                    'kline_data': [...],  // 120根K线
                    'period': 'day'
                },
                ...
            ]
            或 None (文件读取失败)
        
        跳过规则:
            - 数据库中没有该股票 → 跳过
            - K线数量不足120根 → 跳过
        """
        if not self.db:
            print("❌ 数据库未连接，无法读取K线数据")
            return None
        
        try:
            import json
            from database.models import stock_kline_day, stock_kline_week
            from database.models import stock_kline_5min, stock_kline_15min
            from database.models import stock_kline_30min, stock_kline_1hour
            from datetime import datetime
            
            # 读取JSON文件
            with open(json_file_path, 'r', encoding='utf-8') as f:
                config = json.load(f)
            
            period = config.get('type')
            data_dict = config.get('data', {})
            
            if not period or not data_dict:
                print(f"❌ JSON格式错误: {json_file_path}")
                return None
            
            # 选择对应的表
            model_map = {
                'day': stock_kline_day.StockKlineDay,
                'week': stock_kline_week.StockKlineWeek,
                '5min': stock_kline_5min.StockKline5Min,
                '15min': stock_kline_15min.StockKline15Min,
                '30min': stock_kline_30min.StockKline30Min,
                '1hour': stock_kline_1hour.StockKline1Hour,
                'bs': stock_kline_1hour.StockKline1Hour,  # 买卖点使用小时线表
            }
            
            KlineModel = model_map.get(period)
            if not KlineModel:
                print(f"❌ 不支持的周期类型: {period}")
                return None
            
            # 确定日期字段名
            date_field_map = {
                'day': 'trade_date',
                'week': 'trade_date',
                '5min': 'trade_datetime',
                '15min': 'trade_datetime',
                '30min': 'trade_datetime',
                '1hour': 'trade_datetime',
                'bs': 'trade_datetime',  # 买卖点使用小时线的trade_datetime
            }
            date_field = date_field_map[period]
            
            results = []
            total = len(data_dict)
            skipped = 0
            
            print(f"\n📊 开始处理 {period} 周期数据...")
            print(f"总计: {total} 条")
            
            for i, (stock_code, trade_date) in enumerate(data_dict.items(), 1):
                # 转换日期格式
                if period in ['day', 'week']:
                    # Date类型，直接用字符串
                    date_value = trade_date
                else:
                    # DateTime类型，转换为datetime对象
                    try:
                        date_value = datetime.strptime(trade_date, '%Y-%m-%d %H:%M:%S')
                    except:
                        print(f"  [{i}/{total}] ❌ {stock_code}: 日期格式错误 {trade_date}")
                        skipped += 1
                        continue
                
                # 查询120根K线
                try:
                    klines = self.db.query(KlineModel).filter(
                        KlineModel.stock_code == stock_code,
                        getattr(KlineModel, date_field) <= date_value
                    ).order_by(getattr(KlineModel, date_field).desc()).limit(120).all()
                    
                    if not klines:
                        print(f"  [{i}/{total}] ⚠️  {stock_code}: 数据库无数据，跳过")
                        skipped += 1
                        continue
                    
                    if len(klines) < 120:
                        print(f"  [{i}/{total}] ⚠️  {stock_code}: K线不足120根({len(klines)}根)，跳过")
                        skipped += 1
                        continue
                    
                    # 反转为时间正序
                    klines.reverse()
                    
                    results.append({
                        'stock_code': stock_code,
                        'trade_date': trade_date,
                        'kline_data': klines,
                        'period': period
                    })
                    
                    if i % 100 == 0 or i == total:
                        print(f"  进度: {i}/{total} ({len(results)}条有效, {skipped}条跳过)")
                
                except Exception as e:
                    print(f"  [{i}/{total}] ❌ {stock_code}: 查询失败 {str(e)[:50]}")
                    skipped += 1
                    continue
            
            print(f"\n✅ 处理完成:")
            print(f"  - 有效数据: {len(results)} 条")
            print(f"  - 跳过: {skipped} 条")
            print(f"  - 成功率: {len(results)/total*100:.1f}%")
            
            return results if results else None
        
        except Exception as e:
            print(f"❌ 读取JSON文件失败: {str(e)}")
            import traceback
            traceback.print_exc()
            return None


# 测试主函数
if __name__ == '__main__':
    analyzer = StockImageAnalyzer(enable_database=True)
    
    # 测试从JSON文件读取训练数据
    json_file = 'ai_training_data/day_kline_training/up_trend/data.json'
    data = analyzer.get_training_data_from_json(json_file)
    
    if data:
        print(f"✅ 成功读取 {len(data)} 条训练数据")
        print(f"   第一条数据: 股票代码={data[0]['stock_code']}, 日期={data[0]['trade_date']}, K线数量={len(data[0]['kline_data'])}")
    else:
        print("❌ 读取失败")
