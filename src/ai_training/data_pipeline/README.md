# 🔄 AutoDataPipeline - 自动化数据处理框架

**一行代码处理所有数据逻辑。框架搞定所有细节，你专注于模型训练。**

```python
from src.ai_training.data_pipeline import AutoDataPipeline

# 完成！所有数据处理搞定
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = \
    AutoDataPipeline('./ai_training_data/day_kline_training').run()

# 直接喂给模型
from autogluon.tabular import TabularPredictor
predictor = TabularPredictor(label='trend')
predictor.fit(X_train, y_train)
```

---

## 📂 文件结构

```
src/ai_training/data_pipeline/
├── __init__.py              # 包初始化
├── pipeline.py              # 核心AutoDataPipeline类 ⭐
├── example_usage.py         # 8个使用示例
├── PIPELINE_GUIDE.md        # 完整文档（详细说明）
└── README.md                # 本文件（快速开始）
```

---

## 🚀 快速开始（3步）

### 步骤1：安装依赖
```bash
pip install autogluon pandas numpy scikit-learn scipy joblib
```

### 步骤2：导入框架
```python
from src.ai_training.data_pipeline import AutoDataPipeline
```

### 步骤3：运行
```python
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
```

**完成！** 数据已完全准备好。

---

## 📋 框架做了什么？

| 步骤 | 你不需要关心 |
|------|-------------|
| ✅ 数据加载 | 自动从JSON加载，处理多源数据 |
| ✅ 数据验证 | 检查维度、NaN、Inf、类别 |
| ✅ NaN处理 | 自动用均值填充 |
| ✅ 特征工程 | 生成语义化特征名（K0_open等） |
| ✅ 标准化 | StandardScaler自动fit/transform |
| ✅ 数据分割 | 自动选择3-way或4-way split |
| ✅ 一致性检查 | 验证各子集分布，计算JS散度 |
| ✅ 元数据记录 | 保存所有处理过程 |

---

## 💡 常见用法

### 用法1：基础使用
```python
from src.ai_training.data_pipeline import AutoDataPipeline

pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
```

### 用法2：用于AutoGluon
```python
train_df, val_df, calibrate_df, test_df, metadata = pipeline.run_with_dataframe()

from autogluon.tabular import TabularPredictor
predictor = TabularPredictor(label='trend')
predictor.fit(train_data=train_df, tuning_data=val_df)
```

### 用法3：监控处理过程
```python
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
pipeline.load_data()
pipeline.validate_data()
pipeline.clean_data()
# ... 继续
print(pipeline.get_processing_report())
```

### 用法4：批处理多个数据集
```python
for period in ['day', '5min', '15min']:
    pipeline = AutoDataPipeline(f'./ai_training_data/{period}_kline_training')
    X_train, y_train, ..., metadata = pipeline.run()
    print(f"✅ {period}: {len(X_train)} 样本")
```

### 用法5：预测阶段使用相同的标准化器
```python
# 训练时保存
pipeline.save_state('my_pipeline.pkl')

# 预测时加载
pipeline.load_state('my_pipeline.pkl')
scaler = pipeline.get_scaler()
imputer = pipeline.get_imputer()

# 预处理新数据
X_new_processed = imputer.transform(X_new)
X_new_processed = scaler.transform(X_new_processed)
```

---

## 📖 更多信息

- **详细文档**: 见 `PIPELINE_GUIDE.md`
- **使用示例**: 见 `example_usage.py`
- **问题排查**: 见 `PIPELINE_GUIDE.md` 的"故障排除"部分

---

## ⚙️ API 速查表

### 初始化
```python
pipeline = AutoDataPipeline(
    data_dir='./ai_training_data/day_kline_training',
    period='auto',           # 自动检测周期
    enable_logging=True,
    random_seed=42
)
```

### 运行
```python
# 方法1：一键运行
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()

# 方法2：DataFrame格式（用于AutoGluon）
train_df, val_df, calibrate_df, test_df, metadata = pipeline.run_with_dataframe()

# 方法3：分步执行
pipeline.load_data()
pipeline.validate_data()
pipeline.clean_data()
pipeline.engineer_features()
pipeline.standardize_data()
pipeline.split_data()
pipeline.validate_consistency()
```

### 获取信息
```python
metadata = pipeline.get_metadata()                 # 元数据
report = pipeline.get_processing_report()         # 处理报告
scaler = pipeline.get_scaler()                    # 标准化器
imputer = pipeline.get_imputer()                  # 填充器
feature_names = pipeline.get_feature_names()      # 特征名
stage_info = pipeline.get_stage_info('load')      # 阶段信息
```

### 保存/加载状态
```python
pipeline.save_state('checkpoint.pkl')
pipeline.load_state('checkpoint.pkl')
```

---

## ✅ 质量保证

框架自动执行的检查：

- ✅ 维度验证 (3D)
- ✅ 类别完整性 (0/1/2)
- ✅ NaN/Inf处理
- ✅ 样本数充足性 (最少60条)
- ✅ 类别分布一致性 (JS散度)
- ✅ 数据泄露检查 (train/test严格分离)
- ✅ 标准化有效性

---

## 🆘 常见问题

**Q: 数据加载失败？**
A: 检查目录结构是否正确：
```
data_dir/
├── down_trend/data.json
├── sideways/data.json
└── up_trend/data.json
```

**Q: 性能怎样？**
A: 10000条样本通常 < 5秒。

**Q: 可以自定义配置吗？**
A: 可以，通过`config`参数。

**Q: 其他问题？**
A: 见 `PIPELINE_GUIDE.md` 的完整文档。

---

## 📚 下一步

1. **查看示例**: `python example_usage.py 1`
2. **读完整文档**: `PIPELINE_GUIDE.md`
3. **集成到你的代码**: 复制3行代码即可

---

## 版本

- **版本**: 1.0.0
- **发布日期**: 2024-01-15
- **维护者**: AI Team

---

**现在你有一个强大的数据处理框架。去训练你的模型吧！🚀**
