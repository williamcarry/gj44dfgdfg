""" 
股票图像OCR识别模块
职责: 纯OCR图像识别 + 智能数据获取
功能:
    1. OCR识别股票代码、日期、MACD数值、成交量数值
    2. 60根K线智能数据获取 - 数据库优先→图片识别→跳过
    3. 不做任何计算分析，只提供原始数据
"""
import cv2
import numpy as np
from paddleocr import PaddleOCR
from typing import Dict, List, Optional
import re
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
    """股票图像OCR识别器
    
    职责:
        - OCR识别图像中的文字和数字
        - 60根K线智能数据获取（数据库优先→图片→跳过）
        - 不做任何计算分析，只提供原始数据
    """
    
    def __init__(self, enable_database=True):
        # 初始化OCR识别器
        try:
            self.reader = PaddleOCR(use_angle_cls=True, lang='ch', use_gpu=False, show_log=False)
            self.ocr_available = True
        except Exception as e:
            print(f"OCR初始化失败: {e}")
            self.ocr_available = False
            self.reader = None
        
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
    
    def load_image(self, image_path: str) -> np.ndarray:
        """加载图像"""
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"无法加载图像: {image_path}")
        return img
    
    def extract_stock_code_and_date(self, image_path: str) -> Optional[Dict]:
        """
        从图片最右侧K线提取股票代码和日期
        
        返回:
            dict: {'stock_code': '000001', 'trade_date': '2025-11-28'}
            或 None (识别失败)
        """
        if not self.ocr_available or self.reader is None:
            return None
        
        try:
            img = self.load_image(image_path)
            height, width = img.shape[:2]
            
            # 截取顶部区域(包含股票代码和日期)
            top_region = img[0:int(height*0.15), :]
            
            # OCR识别
            results = self.reader.ocr(top_region, cls=True)
            
            stock_code = None
            trade_date = None
            
            if results and results[0]:
                for line in results[0]:
                    bbox, (text, prob) = line[0], line[1]
                    
                    # 提取股票代码(6位数字)
                    code_match = re.search(r'\b(\d{6})\b', text)
                    if code_match and not stock_code:
                        stock_code = code_match.group(1)
                    
                    # 提取最新日期(YYYY-MM-DD 或 YYYY/MM/DD)
                    date_match = re.search(r'(\d{4}[-/]\d{1,2}[-/]\d{1,2})', text)
                    if date_match and not trade_date:
                        trade_date = date_match.group(1).replace('/', '-')
            
            if stock_code and trade_date:
                return {
                    'stock_code': stock_code,
                    'trade_date': trade_date
                }
            
            return None
        
        except Exception as e:
            print(f"    股票代码/日期提取失败: {str(e)[:50]}")
            return None
    
    def count_klines_in_image(self, image_path: str) -> Optional[int]:
        """
        检测图片中K线的数量
        
        规则:
            从最右侧(最近时间点)第1根K线开始往左数
            必须包含60根完整的K线（包括最右侧第1根）
        
        返回:
            int: K线数量(如果>=60)，否则返回None
        """
        try:
            img = self.load_image(image_path)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # K线区域通常在图片上半部分
            height, width = gray.shape
            kline_region = gray[int(height * 0.3):int(height * 0.6), :]
            
            # 检测垂直线(K线的柱体)
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 15))
            vertical = cv2.morphologyEx(kline_region, cv2.MORPH_OPEN, kernel)
            
            # 计算每列的垂直线密度
            col_sums = np.sum(vertical > 128, axis=0)
            
            # 找到垂直线集中的区域
            threshold = np.max(col_sums) * 0.3 if np.max(col_sums) > 0 else 0
            kline_positions = np.where(col_sums > threshold)[0]
            
            if len(kline_positions) == 0:
                return None
            
            # 计算K线间隔
            diffs = np.diff(kline_positions)
            if len(diffs) == 0:
                return None
            
            typical_gap = np.median(diffs[diffs > 0])
            
            # 估算K线数量
            span = kline_positions[-1] - kline_positions[0]
            estimated_count = int(span / typical_gap) + 1
            
            # 保守估计
            kline_count = int(estimated_count * 0.9)
            
            return kline_count if kline_count > 0 else None
        
        except Exception as e:
            print(f"    K线检测失败: {str(e)[:50]}")
            return None
    
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
    
    def extract_raw_data(self, image_path: str) -> Dict:
        """
        提取图片中的所有原始数据（不做任何计算）
        
        返回:
            dict: {
                'stock_code': '000001',
                'trade_date': '2025-11-28',
                'macd': {'dif': 1.47, 'dea': 0.61},
                'volume': {'ma5': 19630, 'ma60': 57165},
                'price': {'current': 39.46, 'ma5': 39.46, 'ma25': 38.21}
            }
        """
        if not self.ocr_available or self.reader is None:
            return {}
        
        try:
            img = self.load_image(image_path)
            height, width = img.shape[:2]
            
            raw_data = {
                'stock_code': None,
                'trade_date': None,
                'macd': {'dif': None, 'dea': None},
                'volume': {'ma5': None, 'ma60': None},
                'price': {'current': None, 'ma5': None, 'ma25': None}
            }
            
            # OCR识别整个图片
            results = self.reader.ocr(img, cls=True)
            
            if results and results[0]:
                for line in results[0]:
                    bbox, (text, prob) = line[0], line[1]
                    
                    # 提取股票代码
                    code_match = re.search(r'\b(\d{6})\b', text)
                    if code_match and not raw_data['stock_code']:
                        raw_data['stock_code'] = code_match.group(1)
                    
                    # 提取日期
                    date_match = re.search(r'(\d{4}[-/]\d{1,2}[-/]\d{1,2})', text)
                    if date_match and not raw_data['trade_date']:
                        raw_data['trade_date'] = date_match.group(1).replace('/', '-')
                    
                    # 提取MACD DIF值
                    if 'DIF' in text.upper():
                        numbers = re.findall(r'-?\d+\.\d+', text)
                        if numbers:
                            raw_data['macd']['dif'] = float(numbers[0])
                    
                    # 提取MACD DEA值
                    elif 'DEA' in text.upper():
                        numbers = re.findall(r'-?\d+\.\d+', text)
                        if numbers:
                            raw_data['macd']['dea'] = float(numbers[0])
                    
                    # 提取成交量MA5
                    elif 'MA2' in text.upper():
                        numbers = re.findall(r'\d+', text)
                        if numbers:
                            raw_data['volume']['ma5'] = int(numbers[-1])
                    
                    # 提取成交量MA60
                    elif 'MA3' in text.upper():
                        numbers = re.findall(r'\d+', text)
                        if numbers:
                            raw_data['volume']['ma60'] = int(numbers[-1])
                    
                    # 提取价格MA5
                    elif 'MA5' in text.upper() and 'MA25' not in text.upper():
                        numbers = re.findall(r'\d+\.\d+', text)
                        if numbers:
                            raw_data['price']['ma5'] = float(numbers[0])
                    
                    # 提取价格MA25
                    elif 'MA25' in text.upper():
                        numbers = re.findall(r'\d+\.\d+', text)
                        if numbers:
                            raw_data['price']['ma25'] = float(numbers[0])
            
            return raw_data
        
        except Exception as e:
            print(f"    原始数据提取失败: {str(e)[:50]}")
            return {}
    
    def get_training_data_smart(self, image_path: str, min_klines: int = 60, 
                                period: str = 'day') -> Optional[Dict]:
        """
        智能获取训练数据 - 核心方法
        
        策略:
        1. OCR识别最右侧第1根K线的股票代码和日期
        2. 去数据库查询：从第1根K线往前数120根（60根显示 + 60根历史数据用于计算均线）
        3. 如果数据库不满足120根，检测图片是否有60根K线
        4. 如果图片也不满足60根，返回None（放弃此图片）
        
        为什么需要120根K线？
        - 显示60根K线用于训练
        - 计算第60根K线的60日均线，需要前面60根历史数据
        - 总计: 60 + 60 = 120根
        
        参数:
            image_path: 图片路径
            min_klines: 最少显示的K线数量 (默认60)
            period: 周期类型 (默认'day')
        
        返回:
            dict: {
                'source': 'db' 或 'image',
                'stock_code': '000001',
                'trade_date': '2025-11-28',
                'kline_data': [...],  # 如果source='db'，120根K线数据
                'raw_data': {...}     # 如果source='image'，OCR识别的原始数据
            }
            或 None (数据不满足，放弃此图片)
        """
        # 计算实际需要的K线数量（显示数量 + 历史数据用于计算均线）
        required_count = min_klines + 60  # 60根显示 + 60根历史 = 120根
        
        # 步骤1: OCR识别最右侧第1根K线的股票代码+日期
        stock_info = self.extract_stock_code_and_date(image_path)
        
        if stock_info and stock_info['stock_code'] and stock_info['trade_date']:
            # 步骤2: 尝试从数据库读取120根K线（60根显示 + 60根历史）
            kline_data = self.get_kline_data_from_db(
                stock_code=stock_info['stock_code'],
                trade_date=stock_info['trade_date'],
                period=period,
                count=required_count  # 120根
            )
            
            if kline_data and len(kline_data) >= required_count:
                # ✅ 数据库有120根K线，使用数据库数据
                return {
                    'source': 'db',
                    'stock_code': stock_info['stock_code'],
                    'trade_date': stock_info['trade_date'],
                    'kline_data': kline_data,  # 返回全部120根
                    'raw_data': None
                }
            else:
                # 步骤3: 数据库不满足，检测图片是否有60根K线
                kline_count = self.count_klines_in_image(image_path)
                
                if kline_count and kline_count >= min_klines:
                    # ✅ 图片有60根K线，提取原始数据
                    raw_data = self.extract_raw_data(image_path)
                    
                    return {
                        'source': 'image',
                        'stock_code': stock_info['stock_code'],
                        'trade_date': stock_info['trade_date'],
                        'kline_data': None,
                        'raw_data': raw_data
                    }
        else:
            # 无法识别股票代码/日期，尝试直接检测K线数量
            kline_count = self.count_klines_in_image(image_path)
            if kline_count and kline_count >= min_klines:
                # 提取原始数据
                raw_data = self.extract_raw_data(image_path)
                
                return {
                    'source': 'image',
                    'stock_code': None,
                    'trade_date': None,
                    'kline_data': None,
                    'raw_data': raw_data
                }
        
        # ❌ 步骤4: 都不满足，放弃此图片
        return None


# 测试主函数
if __name__ == '__main__':
    analyzer = StockImageAnalyzer(enable_database=True)
    
    # 测试智能数据获取
    data = analyzer.get_training_data_smart('stock.png', min_klines=60)
    
    if data:
        print(f"✅ 数据来源: {data['source']}")
        print(f"   股票代码: {data['stock_code']}")
        print(f"   最新日期: {data['trade_date']}")
        
        if data['source'] == 'db':
            print(f"   K线数据: {len(data['kline_data'])} 根")
        else:
            print(f"   原始数据: {data['raw_data']}")
    else:
        print("❌ 数据不满足60根K线要求，已放弃此图片")
