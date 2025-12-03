# ⚡ 5分钟快速开始

> **给其他AI的最小化指南：如何用这个框架**

---

## 1️⃣ 一行代码加载数据

```python
from src.ai_training.data_pipeline import AutoDataPipeline

# 就这一行！框架处理所有数据逻辑
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = \
    AutoDataPipeline('./ai_training_data/day_kline_training').run()
```

**完成！** 数据已经：
- ✅ 加载完毕
- ✅ 验证通过
- ✅ NaN已处理
- ✅ 已标准化
- ✅ 已分割
- ✅ 一致性已检查

---

## 2️⃣ 用于AutoGluon

```python
from src.ai_training.data_pipeline import AutoDataPipeline
from autogluon.tabular import TabularPredictor

# 获取DataFrame格式
train_df, val_df, calibrate_df, test_df, metadata = \
    AutoDataPipeline('./ai_training_data/day_kline_training').run_with_dataframe()

# 直接训练
predictor = TabularPredictor(label='trend', problem_type='multiclass')
predictor.fit(train_data=train_df, tuning_data=val_df, time_limit=3600)
```

---

## 3️⃣ 了解数据

```python
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()

# 查看统计信息
print(metadata['statistics'])        # 数据统计
print(metadata['class_distribution']) # 类别分布
print(metadata['warnings'])          # 处理过程中的警告

# 查看处理报告
print(pipeline.get_processing_report())
```

---

## 4️⃣ 预测时复现

```python
# 保存处理信息
pipeline.save_state('my_pipeline.pkl')

# 在预测时恢复
new_pipeline = AutoDataPipeline('./dummy')  # 只需要初始化
new_pipeline.load_state('my_pipeline.pkl')

# 用相同的处理器标准化新数据
imputer = new_pipeline.get_imputer()
scaler = new_pipeline.get_scaler()

X_new_clean = imputer.transform(X_new)
X_new_scaled = scaler.transform(X_new_clean.reshape(len(X_new_clean), -1))
```

---

## 常见错误

| 错误 | 原因 | 解决方案 |
|------|------|--------|
| `FileNotFoundError` | 数据目录不存在 | 检查目录路径 |
| `ValueError: 没有加载到有效数据` | JSON文件为空或格式错误 | 检查数据文件 |
| `AssertionError: 特征维度错误` | 原始特征数不对 | 检查SEQUENCE_LENGTH和NUM_FEATURES |

---

## 下一步

- **详细文档**: 见 `PIPELINE_GUIDE.md`
- **更多示例**: 见 `example_usage.py`
- **完整API**: 见 `pipeline.py`的注释

---

**就这样！其他AI只需这5分钟就能用框架了。** 🎉
