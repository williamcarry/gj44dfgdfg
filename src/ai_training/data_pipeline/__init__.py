"""
🔄 AutoDataPipeline - 自动化数据处理框架

一行代码处理所有数据逻辑，无需手动干预。
"""

from .pipeline import AutoDataPipeline
from .processors import (
    DataValidator,
    DataCleaner,
    FeatureEngineer,
    DataStandardizer,
    DataSplitter
)

__all__ = [
    'AutoDataPipeline',
    'DataValidator',
    'DataCleaner',
    'FeatureEngineer',
    'DataStandardizer',
    'DataSplitter'
]

__version__ = '1.0.0'
