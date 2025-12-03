# 🔄 数据处理管道完整文档

## 快速开始（5分钟）

### 最简单的使用方式
```python
from src.ai_training.data_pipeline import AutoDataPipeline

# 一行代码，所有数据处理搞定
pipeline = AutoDataPipeline(data_dir='./ai_training_data/day_kline_training')
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()

# 直接喂给模型
from autogluon.tabular import TabularPredictor
predictor = TabularPredictor(label='trend')
predictor.fit(X_train, y_train)
```

---

## 📋 这个框架做了什么？

**你不需要再手动处理以下事项：**

| 步骤 | 框架自动处理 | 你无需关心 |
|------|-------------|---------|
| 1️⃣ 数据加载 | ✅ 自动从JSON加载，处理多个数据源 | 不需要写加载逻辑 |
| 2️⃣ 数据验证 | ✅ 检查NaN/Inf，类别完整性，维度 | 不需要手动检查 |
| 3️⃣ NaN处理 | ✅ 自动用均值填充，记录处理详情 | 不需要决定如何处理 |
| 4️⃣ 特征工程 | ✅ 自动生成语义化特征名（K0_open等） | 不需要写特征处理 |
| 5️⃣ 标准化 | ✅ StandardScaler自动fit/transform | 不需要手动调用 |
| 6️⃣ 数据分割 | ✅ 自动选择3-way或4-way split | 不需要计算比例 |
| 7️⃣ 一致性检查 | ✅ 验证各子集类别分布，计算JS散度 | 不需要担心数据泄露 |
| 8️⃣ 元数据记录 | ✅ 保存所有处理过程和参数 | 不需要自己记录 |

---

## 🎯 工作流程图

```
原始数据 (JSON)
    ↓
[加载数据] → 检查文件完整性
    ↓
[验证数据] → 检查维度、NaN、类别
    ↓
[数据清理] → 填充NaN、删除Inf
    ↓
[特征处理] → 生成语义特征名
    ↓
[标准化] → StandardScaler
    ↓
[数据分割] → 3-way/4-way split（自动选择）
    ↓
[验证一致性] → 检查分布、JS散度
    ↓
准备好的数据 ✅
```

---

## 📖 完整API文档

### 类：`AutoDataPipeline`

#### 初始化
```python
from src.ai_training.data_pipeline import AutoDataPipeline

pipeline = AutoDataPipeline(
    data_dir: str,                    # 必需：数据目录
    period: str = 'auto',             # 可选：K线周期（auto/day/5min/15min等）
    enable_logging: bool = True,       # 可选：是否打印日志
    random_seed: int = 42,             # 可选：随机种子，保证可复现
    min_samples_per_class: int = 20,   # 可选：每个类最少样本数
    imbalance_threshold: float = 2.0   # 可选：类别不平衡警告阈值
)
```

#### 运行管道
```python
# 方法1：一键运行，获取所有数据
X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()

# 方法2：获取DataFrame格式（用于AutoGluon）
train_df, val_df, calibrate_df, test_df, metadata = pipeline.run_with_dataframe()

# 方法3：分步执行，监控每个阶段
pipeline.load_data()
pipeline.validate_data()
pipeline.clean_data()
pipeline.engineer_features()
pipeline.standardize_data()
pipeline.split_data()
pipeline.validate_consistency()
results = pipeline.get_results()
```

#### 获取元数据
```python
# 获取完整的处理记录
metadata = pipeline.get_metadata()

print(metadata['data_statistics'])  # 数据统计
print(metadata['processing_log'])   # 处理日志
print(metadata['warnings'])          # 警告信息
print(metadata['scalers'])          # 标准化器（用于预测时复现）
```

---

## 💡 使用示例

### 示例1：基础使用
```python
from src.ai_training.data_pipeline import AutoDataPipeline
import numpy as np

# 初始化
pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')

# 运行
try:
    X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
    print(f"✅ 数据加载成功")
    print(f"  训练集: {X_train.shape}")
    print(f"  测试集: {X_test.shape}")
    
except Exception as e:
    print(f"❌ 处理失败: {e}")
    print(pipeline.get_error_report())  # 获取详细错误报告
```

### 示例2：用于AutoGluon
```python
from src.ai_training.data_pipeline import AutoDataPipeline
from autogluon.tabular import TabularPredictor

# 获取DataFrame
train_df, val_df, calibrate_df, test_df, metadata = pipeline.run_with_dataframe()

# 直接训练
predictor = TabularPredictor(label='trend', problem_type='multiclass')
predictor.fit(
    train_data=train_df,
    tuning_data=val_df,
    time_limit=3600
)

# 评估
test_acc = predictor.evaluate(test_df)
print(f"Test Accuracy: {test_acc:.2%}")
```

### 示例3：监控处理过程
```python
pipeline = AutoDataPipeline('./data')

# 分步执行，每步都能检查
pipeline.load_data()
print(f"Step 1: 加载完成，{pipeline.get_stage_info('load')}")

pipeline.validate_data()
print(f"Step 2: 验证完成，{pipeline.get_stage_info('validate')}")

pipeline.clean_data()
print(f"Step 3: 清理完成，{pipeline.get_stage_info('clean')}")

# ... 继续

# 获取最终报告
report = pipeline.get_processing_report()
print(report)
```

---

## ⚙️ 配置选项

### 数据分割策略（自动选择）
```
小数据 (< 500 samples)：
  ├─ 训练集: 70%
  ├─ 验证集: 15%
  └─ 测试集: 15%

大数据 (≥ 500 samples)：
  ├─ 训练集: 50%
  ├─ 验证集: 20%
  ├─ 校准集: 20%
  └─ 测试集: 10%
```

### 自定义配置
```python
config = {
    'scaling_method': 'standard',      # standard / minmax / robust
    'impute_strategy': 'mean',         # mean / median / most_frequent
    'split_method': 'time_series',     # time_series / random / stratified
    'validation_level': 'strict'       # strict / normal / lenient
}

pipeline = AutoDataPipeline(data_dir, config=config)
```

---

## 🔍 故障排除

### 问题1：数据加载失败
```
错误信息：FileNotFoundError: data directory not found
解决方案：
  1. 检查目录路径是否正确
  2. 确保目录结构：
     data_dir/
     ├── down_trend/data.json
     ├── sideways/data.json
     └── up_trend/data.json
```

### 问题2：数据验证失败
```
错误信息：DataValidationError: Feature dimension mismatch
解决方案：
  1. 检查SEQUENCE_LENGTH (应为60)
  2. 检查NUM_FEATURES (应为51)
  3. 如果都正确，可能是raw data问题
  → 使用 pipeline.get_debug_info() 获取详细信息
```

### 问题3：类别不平衡警告
```
警告信息：Class imbalance ratio 3.2:1 exceeds threshold
处理方法：
  1. 可以继续使用（框架已处理）
  2. 如需平衡，使用自定义权重：
     class_weights = compute_class_weight('balanced', y_train)
```

### 获取帮助
```python
# 查看完整日志
pipeline.print_full_log()

# 获取错误诊断报告
print(pipeline.get_error_report())

# 获取数据统计信息
print(pipeline.get_statistics())
```

---

## 📊 输出数据格式

### NumPy格式（pipeline.run()）
```python
X_train:   shape (N, 60, 51)     # 3D数据：(样本数, 时间步, 特征数)
y_train:   shape (N,)             # 1D标签：[0, 1, 2]

X_test:    shape (M, 60, 51)
y_test:    shape (M,)
```

### DataFrame格式（pipeline.run_with_dataframe()）
```python
train_df columns:
├── K0_open, K0_close, K0_high, ... (K线特征)
├── K1_open, K1_close, ...
├── ...
├── K59_volume, K59_ma20
└── trend (标签：0/1/2)

# 完全可直接用于AutoGluon
```

### 元数据格式
```python
metadata = {
    'timestamp': '2024-01-15T10:30:00',
    'total_samples': 1000,
    'data_split': {'train': 700, 'val': 150, 'calibrate': 0, 'test': 150},
    'class_distribution': {'down': 333, 'sideways': 334, 'up': 333},
    'statistics': {
        'nans_found': 12,
        'nans_filled': 12,
        'infs_found': 0,
        'processing_time': 2.34  # 秒
    },
    'warnings': [],
    'scalers': {
        'method': 'StandardScaler',
        'mean': [...],
        'std': [...]
    },
    'processing_log': [
        'Step 1: Load - OK',
        'Step 2: Validate - Found 12 NaNs',
        ...
    ]
}
```

---

## 🚀 高级用法

### 保存和恢复
```python
# 保存处理配置和结果
pipeline.save_state('checkpoint.pkl')

# 恢复
pipeline.load_state('checkpoint.pkl')
```

### 重用标准化器
```python
# 获取标准化器，用于预测阶段
scaler = pipeline.get_scaler()

# 在预测时
X_pred_scaled = scaler.transform(X_pred_raw)
```

### 批处理多个数据集
```python
from src.ai_training.data_pipeline import batch_process_pipelines

pipelines = [
    './data/day_kline_training',
    './data/5min_kline_training',
    './data/15min_kline_training'
]

results = batch_process_pipelines(pipelines)

for period, (X_train, y_train, ..., metadata) in results.items():
    print(f"Period {period}: {X_train.shape}")
```

---

## ✅ 质量保证

### 自动进行的检查
- ✅ 所有输入数据维度验证
- ✅ 数据类型检查（float32/int32）
- ✅ NaN/Inf值处理
- ✅ 类别分布一致性（JS散度 < 0.1）
- ✅ 样本数充足性（最少60条）
- ✅ 每类样本数充足性（最少20条）
- ✅ 标准化后的无穷值检查
- ✅ 数据泄露检查（train/val/test严格分离）

### 报告示例
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 数据处理完成报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 数据统计
  总样本数: 1000
  训练集: 700 (70%)
  验证集: 150 (15%)
  测试集: 150 (15%)

📈 类别分布
  下跌趋势: 333 (33.3%)
  横盘震荡: 334 (33.4%)
  上涨趋势: 333 (33.3%)
  → 分布均衡 ✅

🔧 数据清理
  发现NaN: 12 → 已用均值填充
  发现Inf: 0 → 无需处理
  异常值: 0 → 无需处理

📏 一致性检查
  Jensen-Shannon散度: 0.0082
  → 分布高度一致 ✅

⏱️ 处理耗时
  总耗时: 2.34秒
  阶段时间:
    - 加载: 0.45s
    - 验证: 0.23s
    - 清理: 0.38s
    - 特征工程: 0.21s
    - 标准化: 0.18s
    - 分割: 0.15s
    - 验证一致性: 0.34s

⚠️ 警告: 无
✅ 处理状态: 完全成功
```

---

## 📝 常见问题

**Q: 如果数据有问题，框架会怎样？**
A: 框架会自动修复大部分问题（NaN填充、Inf转NaN等），并在元数据中记录。如果无法修复，会抛出具体异常，说明原因。

**Q: 能自定义分割比例吗？**
A: 可以。通过`config`参数指定`split_ratios`。

**Q: 标准化器保存在哪？**
A: 自动保存在元数据中。`pipeline.get_metadata()['scalers']` 可获取。

**Q: 可以在预测时用同一个标准化器吗？**
A: 可以！这正是框架的设计初衷。见"高级用法"中的"重用标准化器"。

**Q: 处理大数据会很慢吗？**
A: 不会。对于10000条样本，整个流程通常 < 5秒。

---

## 📞 支持

遇到问题？
1. 查看`pipeline.get_error_report()`
2. 检查`pipeline.print_full_log()`
3. 查看本文档的"故障排除"部分
4. 联系开发人员并提供`pipeline.get_debug_info()`的输出

---

## 版本信息

| 版本 | 日期 | 特性 |
|------|------|------|
| 1.0 | 2024-01-15 | 初始发布，支持AutoGluon/scikit-learn |
| 1.1 | - | (计划) 支持自定义处理器 |
| 2.0 | - | (计划) 支持GPU加速 |

---

**最后一句话：现在你只需要调用 `AutoDataPipeline().run()` 就完了，剩下的框架全搞定。🎉**
