# 🚀 部署指南 - 在生产环境中使用框架

## 1️⃣ 训练阶段部署

### 步骤1：准备数据
```python
from src.ai_training.data_pipeline import AutoDataPipeline

# 初始化管道
pipeline = AutoDataPipeline(
    data_dir='./data/production/day_kline',
    period='day',
    random_seed=42,
    enable_logging=True
)

# 运行管道
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
```

### 步骤2：训练模型
```python
from autogluon.tabular import TabularPredictor

# 使用DataFrame格式
train_df, val_df, _, _, metadata = pipeline.run_with_dataframe()

# 训练
predictor = TabularPredictor(label='trend', path='./models/production_v1')
predictor.fit(
    train_data=train_df,
    tuning_data=val_df,
    time_limit=7200,
    presets='best_quality'
)
```

### 步骤3：保存处理工件
```python
import joblib
from pathlib import Path

model_dir = Path('./models/production_v1')

# 保存处理器
pipeline.save_state(model_dir / 'data_pipeline.pkl')

# 保存元数据
import json
with open(model_dir / 'metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

# 保存特征名列表
feature_names = pipeline.get_feature_names()
with open(model_dir / 'feature_names.json', 'w') as f:
    json.dump(feature_names, f)

print("✅ 所有工件已保存")
```

---

## 2️⃣ 预测阶段部署

### 方案A：使用保存的处理器（推荐）

```python
import numpy as np
import joblib
import json
from pathlib import Path
from autogluon.tabular import TabularPredictor

class ProductionPredictorWrapper:
    """生产环境中的预测器包装器"""
    
    def __init__(self, model_dir: str):
        """
        初始化预测器
        
        Args:
            model_dir: 包含已训练模型和处理器的目录
        """
        self.model_dir = Path(model_dir)
        
        # 加载模型
        self.predictor = TabularPredictor.load(str(self.model_dir))
        
        # 加载处理管道
        self.pipeline = joblib.load(self.model_dir / 'data_pipeline.pkl')
        
        # 加载特征名
        with open(self.model_dir / 'feature_names.json') as f:
            self.feature_names = json.load(f)
        
        # 加载元数据（用于验证）
        with open(self.model_dir / 'metadata.json') as f:
            self.metadata = json.load(f)
    
    def preprocess(self, X_raw: np.ndarray) -> np.ndarray:
        """
        预处理原始特征
        
        Args:
            X_raw: 原始特征，形状 (N, 60, 51)
        
        Returns:
            预处理后的特征，形状 (N, 3060)
        """
        # 扁平化
        X_flat = X_raw.reshape(len(X_raw), -1)
        
        # 获取处理器
        imputer = self.pipeline.get_imputer()
        scaler = self.pipeline.get_scaler()
        
        # 应用处理步骤
        X_clean = imputer.transform(X_flat)
        X_scaled = scaler.transform(X_clean)
        
        return X_scaled
    
    def predict(self, X_raw: np.ndarray) -> Dict[str, Any]:
        """
        预测趋势
        
        Args:
            X_raw: 原始特征，形状 (N, 60, 51)
        
        Returns:
            预测结果字典
        """
        # 预处理
        X_processed = self.preprocess(X_raw)
        
        # 创建DataFrame
        import pandas as pd
        X_df = pd.DataFrame(X_processed, columns=self.feature_names)
        
        # 预测
        predictions = self.predictor.predict(X_df)
        probabilities = self.predictor.predict_proba(X_df)
        
        # 转换结果
        trend_names = ['下跌', '横盘', '上涨']
        
        return {
            'predictions': predictions.tolist(),
            'probabilities': probabilities.values.tolist(),
            'trend_names': trend_names,
            'confidence': probabilities.max(axis=1).tolist()
        }
    
    def get_model_info(self) -> Dict:
        """获取模型信息"""
        return {
            'trained_at': self.metadata['timestamp'],
            'period': self.metadata['period'],
            'total_samples': self.metadata['statistics']['total_samples'],
            'features_count': len(self.feature_names),
            'class_names': ['下跌', '横盘', '上涨']
        }


# 使用示例
if __name__ == '__main__':
    # 初始化预测器
    predictor_wrapper = ProductionPredictorWrapper('./models/production_v1')
    
    # 打印模型信息
    print("模型信息:")
    for key, val in predictor_wrapper.get_model_info().items():
        print(f"  {key}: {val}")
    
    # 预测（假设有新数据）
    X_new = np.random.randn(10, 60, 51).astype(np.float32)  # 示例数据
    results = predictor_wrapper.predict(X_new)
    
    print("\n预测结果:")
    for i, (pred, prob, conf) in enumerate(zip(
        results['predictions'],
        results['probabilities'],
        results['confidence']
    )):
        trend = results['trend_names'][pred]
        print(f"  样本 {i}: {trend} (置信度: {conf:.2%})")
```

### 方案B：API服务部署

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
from typing import List

app = FastAPI(title="趋势预测 API")

# 全局初始化（启动时加载）
predictor_wrapper = None

@app.on_event("startup")
async def startup_event():
    """应用启动时加载模型"""
    global predictor_wrapper
    predictor_wrapper = ProductionPredictorWrapper('./models/production_v1')
    print("✅ 模型已加载")

class PredictionRequest(BaseModel):
    """预测请求"""
    samples: List[List[List[float]]]  # (N, 60, 51)

class PredictionResponse(BaseModel):
    """预测响应"""
    predictions: List[int]
    probabilities: List[List[float]]
    confidence: List[float]
    trend_names: List[str]

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    趋势预测端点
    
    POST /predict
    {
        "samples": [[[...], [...], ...], ...]  # (N, 60, 51)
    }
    """
    try:
        # 转换为numpy数组
        X = np.array(request.samples, dtype=np.float32)
        
        # 验证形状
        if X.shape[1:] != (60, 51):
            raise ValueError(f"特征形状错误: {X.shape[1:]}, 期望 (60, 51)")
        
        # 预测
        results = predictor_wrapper.predict(X)
        
        return PredictionResponse(
            predictions=results['predictions'],
            probabilities=results['probabilities'],
            confidence=results['confidence'],
            trend_names=results['trend_names']
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/model/info")
async def get_model_info():
    """获取模型信息"""
    return predictor_wrapper.get_model_info()

@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy", "model": "loaded"}

# 运行: uvicorn app:app --reload
```

---

## 3️⃣ 容器化部署（Docker）

### Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制代码
COPY src/ ./src/
COPY models/ ./models/
COPY app.py .

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### requirements.txt

```
fastapi==0.104.0
uvicorn==0.24.0
numpy==1.24.0
pandas==2.0.0
scikit-learn==1.3.0
scipy==1.11.0
joblib==1.3.0
autogluon==0.8.0
loguru==0.7.0
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  predictor:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - ./models:/app/models:ro
      - ./logs:/app/logs
    environment:
      - MODEL_PATH=/app/models/production_v1
      - LOG_LEVEL=INFO
    restart: unless-stopped
```

### 启动容器

```bash
# 构建
docker build -t trend-predictor:latest .

# 运行
docker run -p 8000:8000 \
  -v $(pwd)/models:/app/models:ro \
  trend-predictor:latest

# 或使用docker-compose
docker-compose up -d
```

---

## 4️⃣ 监控和日志

### 监控脚本

```python
import logging
from datetime import datetime
import json

class ModelMonitor:
    """模型监控"""
    
    def __init__(self, log_file: str = './logs/predictions.log'):
        self.log_file = log_file
        self.setup_logging()
    
    def setup_logging(self):
        """设置日志"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.log_file),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def log_prediction(self, X: np.ndarray, prediction: int, confidence: float):
        """记录预测"""
        self.logger.info(f"Prediction: {prediction}, Confidence: {confidence:.2%}, Samples: {len(X)}")
    
    def log_error(self, error: str, details: dict = None):
        """记录错误"""
        msg = f"Error: {error}"
        if details:
            msg += f" | {json.dumps(details)}"
        self.logger.error(msg)
    
    def log_model_update(self, model_version: str, metrics: dict):
        """记录模型更新"""
        msg = f"Model updated: v{model_version} | Metrics: {json.dumps(metrics)}"
        self.logger.info(msg)

# 在API中使用
monitor = ModelMonitor()

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        X = np.array(request.samples, dtype=np.float32)
        results = predictor_wrapper.predict(X)
        
        # 记录成功预测
        avg_conf = np.mean(results['confidence'])
        monitor.log_prediction(X, results['predictions'][0], avg_conf)
        
        return PredictionResponse(**results)
    except Exception as e:
        monitor.log_error(str(e), {'request_size': len(request.samples)})
        raise
```

---

## 5️⃣ 生产检查清单

在部署前，确保：

- [ ] 模型训练完成且准确率达标
- [ ] 所有工件已保存 (模型、处理器、元数据)
- [ ] 预处理逻辑与训练时一致
- [ ] API接口已测试
- [ ] 错误处理已完善
- [ ] 日志记录已启用
- [ ] 监控告警已设置
- [ ] 文档已完成
- [ ] 性能测试已通过
- [ ] 负载测试已通过

---

## 6️⃣ 性能优化

### 数据预处理优化

```python
# 缓存处理器
class CachedPredictor(ProductionPredictorWrapper):
    def __init__(self, model_dir: str, cache_size: int = 1000):
        super().__init__(model_dir)
        self.cache_size = cache_size
        self.cache = {}
    
    def preprocess_batch(self, X_raw_list: List[np.ndarray]) -> np.ndarray:
        """批量预处理"""
        # 批量操作比单个快
        X_batch = np.concatenate(X_raw_list)
        return self.preprocess(X_batch)
```

### 并发处理

```python
from concurrent.futures import ThreadPoolExecutor

class AsyncPredictor:
    def __init__(self, model_dir: str, workers: int = 4):
        self.wrapper = ProductionPredictorWrapper(model_dir)
        self.executor = ThreadPoolExecutor(max_workers=workers)
    
    async def predict_async(self, X_raw: np.ndarray):
        """异步预测"""
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            self.executor,
            self.wrapper.predict,
            X_raw
        )
```

---

## 7️⃣ 故障恢复

### 自动重启机制

```python
import time
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
def load_predictor(model_dir: str):
    """带重试的模型加载"""
    try:
        return ProductionPredictorWrapper(model_dir)
    except Exception as e:
        print(f"加载失败，重试中: {e}")
        raise

# 初始化
try:
    predictor = load_predictor('./models/production_v1')
except Exception as e:
    print(f"最终失败: {e}")
    # 回退到备用模型
    predictor = load_predictor('./models/backup_v0')
```

---

## 📊 部署检查表

```python
# 部署前验证脚本
def verify_deployment(model_dir: str):
    """验证部署准备就绪"""
    
    from pathlib import Path
    checks = []
    
    # 1. 文件检查
    model_path = Path(model_dir)
    files_ok = all([
        (model_path / 'data_pipeline.pkl').exists(),
        (model_path / 'metadata.json').exists(),
        (model_path / 'feature_names.json').exists()
    ])
    checks.append(('文件检查', files_ok))
    
    # 2. 模型加载检查
    try:
        predictor = ProductionPredictorWrapper(model_dir)
        checks.append(('模型加载', True))
    except Exception as e:
        checks.append(('模型加载', False))
    
    # 3. 预测检查
    try:
        X_test = np.random.randn(5, 60, 51).astype(np.float32)
        results = predictor.predict(X_test)
        assert len(results['predictions']) == 5
        checks.append(('预测功能', True))
    except Exception as e:
        checks.append(('预测功能', False))
    
    # 4. API检查（如果部署为API）
    try:
        import requests
        resp = requests.get('http://localhost:8000/health', timeout=5)
        checks.append(('API健康', resp.status_code == 200))
    except:
        checks.append(('API健康', False))
    
    # 打印结果
    print("\n部署检查结果:")
    print("=" * 40)
    for check_name, result in checks:
        status = "✅" if result else "❌"
        print(f"{status} {check_name}")
    print("=" * 40)
    
    return all(result for _, result in checks)

# 运行验证
if __name__ == '__main__':
    is_ready = verify_deployment('./models/production_v1')
    if is_ready:
        print("\n✅ 部署已准备就绪！")
    else:
        print("\n❌ 部署检查失败，请修复上述问题。")
```

---

**现在你已经准备好在生产环境中部署你的模型了！** 🚀
