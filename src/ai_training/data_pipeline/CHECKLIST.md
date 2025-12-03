# ✅ AutoDataPipeline 设置检查清单

在使用框架前，请确保以下项目已完成：

## 📦 依赖安装

- [ ] NumPy: `pip install numpy`
- [ ] Pandas: `pip install pandas`
- [ ] scikit-learn: `pip install scikit-learn`
- [ ] SciPy: `pip install scipy`
- [ ] joblib: `pip install joblib`
- [ ] loguru (可选): `pip install loguru`
- [ ] AutoGluon (如果用于训练): `pip install autogluon`

检查命令：
```bash
python -c "import numpy, pandas, sklearn, scipy, joblib; print('✅ 所有依赖已安装')"
```

---

## 📂 文件结构

- [ ] `src/ai_training/data_pipeline/__init__.py` 存在
- [ ] `src/ai_training/data_pipeline/pipeline.py` 存在
- [ ] `src/ai_training/data_pipeline/processors.py` 存在
- [ ] `src/ai_training/feature_extractor.py` 存在（被pipeline导入）
- [ ] `src/ai_training/kline_data_loader.py` 存在（被pipeline导入）

验证命令：
```bash
ls -la src/ai_training/data_pipeline/
```

---

## 🗂️ 数据目录结构

检查你的训练数据目录是否遵循以下结构：

```
ai_training_data/
├── day_kline_training/
│   ├── down_trend/
│   │   └── data.json
│   ├── sideways/
│   │   └── data.json
│   └── up_trend/
│       └── data.json
├── 5min_kline_training/   (可选)
│   ├── down_trend/data.json
│   ├── sideways/data.json
│   └── up_trend/data.json
└── 15min_kline_training/  (可选)
    ├── down_trend/data.json
    ├── sideways/data.json
    └── up_trend/data.json
```

检查命令：
```bash
ls -la ai_training_data/day_kline_training/
```

---

## 📝 数据文件验证

对于每个 `data.json` 文件，检查：

- [ ] 文件不为空
- [ ] JSON格式正确（可用 `python -m json.tool` 验证）
- [ ] 包含必需字段：
  - `kline_data`: K线数据列表
  - `period`: K线周期
  - `actual_return`: 实际收益率（可选）

检查命令：
```bash
python -m json.tool ai_training_data/day_kline_training/down_trend/data.json | head -20
```

---

## 🔧 框架配置

### 常量验证

确保以下常量正确设置（在 `pipeline.py` 中）：

- [ ] `SEQUENCE_LENGTH = 60` ✓
- [ ] `FEATURES_PER_STEP = 51` ✓ （与 feature_extractor.py 的 NUM_FEATURES 一致）
- [ ] `TOTAL_FEATURES = 3060` ✓ （= 60 × 51）

### 特征提取器验证

确保 `src/ai_training/feature_extractor.py` 中：

- [ ] `NUM_FEATURES = 51`
- [ ] `FEATURE_NAMES` 是长度为51的列表
- [ ] `extract_features_sequence_from_kline_data()` 函数存在且可用

检查命令：
```python
from src.ai_training.feature_extractor import NUM_FEATURES, FEATURE_NAMES
assert NUM_FEATURES == 51
assert len(FEATURE_NAMES) == 51
print("✅ 特征提取器配置正确")
```

---

## 🧪 测试框架

### 测试1：导入框架

```python
from src.ai_training.data_pipeline import AutoDataPipeline
print("✅ AutoDataPipeline 导入成功")
```

### 测试2：初始化（不运行）

```python
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training', enable_logging=True)
print("✅ Pipeline 初始化成功")
```

### 测试3：加载数据

```python
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
pipeline.load_data()
print(f"✅ 加载数据成功: {pipeline.X.shape}")
```

### 测试4：完整运行

```python
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
print(f"✅ 完整管道运行成功")
print(f"   训练集: {X_train.shape}")
print(f"   测试集: {X_test.shape}")
```

### 测试5：元数据检查

```python
metadata = pipeline.get_metadata()
assert 'timestamp' in metadata
assert 'statistics' in metadata
assert 'warnings' in metadata
print("✅ 元数据结构正确")
```

---

## 📊 数据质量检查

运行框架后，检查元数据：

```python
metadata = pipeline.get_metadata()

# 检查样本数
print(f"总样本: {metadata['statistics']['total_samples']}")
assert metadata['statistics']['total_samples'] >= 60, "样本数过少"

# 检查类别分布
dist = metadata['class_distribution']
print(f"类别分布: {dist}")
assert sum(dist.values()) == metadata['statistics']['total_samples']

# 检查处理过程
print(f"处理步骤数: {len(metadata['processing_log'])}")
print(f"警告数: {len(metadata['warnings'])}")

# 检查数据分割
split = metadata['data_split']
print(f"数据分割: train={split['train']}, val={split['val']}, calibrate={split['calibrate']}, test={split['test']}")
assert sum(split.values()) == metadata['statistics']['total_samples']
```

---

## 🚀 使用场景检查

### 场景1：用于AutoGluon

- [ ] AutoGluon 已安装
- [ ] 可以运行 `pipeline.run_with_dataframe()`
- [ ] 返回的 DataFrame 可直接用于 TabularPredictor

### 场景2：用于自定义模型

- [ ] 可以运行 `pipeline.run()`
- [ ] 返回的数据形状正确 (N, 60, 51)
- [ ] 可以直接喂给 PyTorch/TensorFlow

### 场景3：用于预测阶段

- [ ] 可以保存状态: `pipeline.save_state()`
- [ ] 可以加载状态: `pipeline.load_state()`
- [ ] 可以获取 scaler: `pipeline.get_scaler()`

---

## 📋 最终检查清单

在投入使用前，完成以下检查：

```python
from src.ai_training.data_pipeline import AutoDataPipeline

# 1. 初始化
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')

# 2. 运行
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()

# 3. 验证数据形状
assert X_train.shape[1:] == (60, 51), "特征形状错误"
assert y_train.min() == 0 and y_train.max() == 2, "标签范围错误"
assert len(X_train) + len(X_val) + len(X_calibrate) + len(X_test) == len(X_train) + len(X_val) + len(X_calibrate) + len(X_test)

# 4. 检查元数据
assert metadata['statistics']['total_samples'] > 0
assert 'processing_log' in metadata

# 5. 检查处理状态
report = pipeline.get_processing_report()
assert '✅' in report or '完成' in report.lower()

print("✅✅✅ 所有检查通过！框架已就绪。")
```

---

## 🆘 常见问题排查

### 问题1：ImportError: No module named 'feature_extractor'

**原因**: 特征提取器未安装或路径不对

**解决**:
```bash
# 检查文件是否存在
ls src/ai_training/feature_extractor.py

# 检查__init__.py
ls src/ai_training/__init__.py
```

### 问题2：ValueError: 没有加载到有效数据

**原因**: 数据文件为空或格式错误

**解决**:
```bash
# 检查数据文件
wc -l ai_training_data/day_kline_training/down_trend/data.json
python -m json.tool ai_training_data/day_kline_training/down_trend/data.json
```

### 问题3：AssertionError: 特征维度错误

**原因**: SEQUENCE_LENGTH 或 NUM_FEATURES 不匹配

**解决**:
```python
from src.ai_training.feature_extractor import NUM_FEATURES
print(f"NUM_FEATURES = {NUM_FEATURES}")  # 应该是 51

# 在 pipeline.py 检查
# SEQUENCE_LENGTH = 60
# FEATURES_PER_STEP = 51
```

---

## 📞 需要帮助？

1. 查看 `PIPELINE_GUIDE.md` 的"故障排除"部分
2. 查看 `example_usage.py` 的示例
3. 运行 `pipeline.print_full_log()` 查看详细日志

---

**准备好了吗？开始使用框架吧！** 🚀
