"""
AutoDataPipeline 使用示例

这个文件展示了如何使用数据处理框架。
"""

# ============================================================================
# 示例1：最简单的使用方式（推荐给其他AI）
# ============================================================================

def example_basic():
    """最基础的使用 - 一行代码搞定所有数据处理"""
    from src.ai_training.data_pipeline import AutoDataPipeline

    # 初始化管道
    pipeline = AutoDataPipeline(
        data_dir='./ai_training_data/day_kline_training'
    )

    # 运行管道，获取所有数据
    X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()

    # 现在数据完全准备好了，可以直接用于训练
    print(f"训练集: {X_train.shape}")
    print(f"验证集: {X_val.shape}")
    print(f"测试集: {X_test.shape}")

    return X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata


# ============================================================================
# 示例2：用于AutoGluon的使用方式
# ============================================================================

def example_autogluon():
    """直接用于AutoGluon训练"""
    from src.ai_training.data_pipeline import AutoDataPipeline
    from autogluon.tabular import TabularPredictor

    # 1. 准备数据（返回DataFrame格式）
    pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
    train_df, val_df, calibrate_df, test_df, metadata = pipeline.run_with_dataframe()

    # 2. 直接训练
    predictor = TabularPredictor(
        label='trend',
        problem_type='multiclass',
        eval_metric='accuracy'
    )

    predictor.fit(
        train_data=train_df,
        tuning_data=val_df,
        time_limit=3600
    )

    # 3. 评估
    test_acc = predictor.evaluate(test_df)
    print(f"测试集准确率: {test_acc:.2%}")

    # 4. 保存模型和处理信息
    predictor.save('my_model')
    pipeline.save_state('my_pipeline_state.pkl')

    return predictor, metadata


# ============================================================================
# 示例3：监控处理过程
# ============================================================================

def example_monitoring():
    """分步执行，监控每个阶段"""
    from src.ai_training.data_pipeline import AutoDataPipeline

    pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')

    # 分步执行
    print("步骤1: 加载数据")
    pipeline.load_data()
    info = pipeline.get_stage_info('load')
    print(f"  耗时: {info['duration']}, 样本数: {info['info']['total_samples']}")

    print("\n步骤2: 验证数据")
    pipeline.validate_data()
    info = pipeline.get_stage_info('validate')
    print(f"  耗时: {info['duration']}, 维度检查: {info['info']['dimensions_ok']}")

    print("\n步骤3: 清理数据")
    pipeline.clean_data()
    info = pipeline.get_stage_info('clean')
    print(f"  耗时: {info['duration']}, NaN数: {info['info']['nan_count']}")

    print("\n步骤4: 特征工程")
    pipeline.engineer_features()
    info = pipeline.get_stage_info('engineer')
    print(f"  耗时: {info['duration']}, 特征数: {info['info']['feature_count']}")

    print("\n步骤5: 标准化")
    pipeline.standardize_data()
    info = pipeline.get_stage_info('standardize')
    print(f"  耗时: {info['duration']}, 平均值: {info['info']['mean']:.6f}")

    print("\n步骤6: 数据分割")
    pipeline.split_data()
    info = pipeline.get_stage_info('split')
    print(f"  耗时: {info['duration']}, 训练集: {info['info']['train_size']}")

    print("\n步骤7: 验证一致性")
    pipeline.validate_consistency()
    info = pipeline.get_stage_info('consistency')
    print(f"  耗时: {info['duration']}, JS散度: {info['info']['js_divergence']:.4f}")

    # 获取所有数据
    X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = (
        pipeline.X_train, pipeline.y_train,
        pipeline.X_val, pipeline.y_val,
        pipeline.X_calibrate, pipeline.y_calibrate,
        pipeline.X_test, pipeline.y_test,
        pipeline.get_metadata()
    )

    # 打印完整报告
    print("\n" + pipeline.get_processing_report())

    return X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata


# ============================================================================
# 示例4：使用标准化器复现预测（预测阶段）
# ============================================================================

def example_preprocessing_for_prediction(X_new, pipeline):
    """
    在预测时，使用相同的标准化器处理新数据
    
    Args:
        X_new: 新的特征数据
        pipeline: 之前训练时的pipeline对象
    """
    import numpy as np

    # 获取处理工具
    imputer = pipeline.get_imputer()
    scaler = pipeline.get_scaler()

    # 应用相同的处理步骤
    X_new_flat = X_new.reshape(len(X_new), -1)

    # 1. 填充NaN
    X_new_flat = imputer.transform(X_new_flat)

    # 2. 标准化（使用训练时的mean/std）
    X_new_flat = scaler.transform(X_new_flat)

    # 3. 重塑
    X_new_processed = X_new_flat.reshape(len(X_new), -1)

    return X_new_processed


# ============================================================================
# 示例5：错误处理
# ============================================================================

def example_error_handling():
    """展示如何处理错误"""
    from src.ai_training.data_pipeline import AutoDataPipeline

    try:
        pipeline = AutoDataPipeline('./ai_training_data/day_kline_training')
        X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
        print("✅ 数据处理成功")

    except FileNotFoundError as e:
        print(f"❌ 数据目录不存在: {e}")
        print("请检查数据目录路径是否正确")

    except ValueError as e:
        print(f"❌ 数据验证失败: {e}")
        print("可能的原因:")
        print("  1. 数据文件不完整")
        print("  2. 数据维度不匹配")
        print("  3. 类别值不对（应该是0/1/2）")

    except Exception as e:
        print(f"❌ 未预期的错误: {e}")
        # 获取详细日志
        pipeline.print_full_log()


# ============================================================================
# 示例6：批处理多个数据集
# ============================================================================

def example_batch_processing():
    """处理多个不同周期的数据集"""
    from src.ai_training.data_pipeline import AutoDataPipeline

    periods = [
        './ai_training_data/day_kline_training',
        './ai_training_data/5min_kline_training',
        './ai_training_data/15min_kline_training'
    ]

    results = {}

    for data_dir in periods:
        try:
            pipeline = AutoDataPipeline(data_dir)
            X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
            results[pipeline.period] = {
                'X_train': X_train,
                'y_train': y_train,
                'metadata': metadata
            }
            print(f"✅ {pipeline.period}: {len(X_train)} 训练样本")
        except Exception as e:
            print(f"❌ {data_dir}: {e}")

    return results


# ============================================================================
# 示例7：自定义配置
# ============================================================================

def example_custom_config():
    """使用自定义配置初始化管道"""
    from src.ai_training.data_pipeline import AutoDataPipeline

    config = {
        'scaling_method': 'standard',  # 标准化方法
        'impute_strategy': 'mean',     # NaN填充策略
        'validation_level': 'strict'   # 验证等级
    }

    pipeline = AutoDataPipeline(
        data_dir='./ai_training_data/day_kline_training',
        period='day',
        enable_logging=True,
        random_seed=42,
        min_samples_per_class=20,
        imbalance_threshold=2.0,
        config=config
    )

    X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata = pipeline.run()
    return X_train, y_train, X_val, y_val, X_calibrate, y_calibrate, X_test, y_test, metadata


# ============================================================================
# 示例8：链式调用（高级用法）
# ============================================================================

def example_chaining():
    """使用链式调用分步执行"""
    from src.ai_training.data_pipeline import AutoDataPipeline

    pipeline = (
        AutoDataPipeline('./ai_training_data/day_kline_training')
        .load_data()
        .validate_data()
        .clean_data()
        .engineer_features()
        .standardize_data()
        .split_data()
        .validate_consistency()
    )

    # 获取所有数据
    X_train, y_train = pipeline.X_train, pipeline.y_train
    X_test, y_test = pipeline.X_test, pipeline.y_test
    metadata = pipeline.get_metadata()

    print(f"训练集: {X_train.shape}")
    print(f"测试集: {X_test.shape}")
    print(f"元数据: {list(metadata.keys())}")


# ============================================================================
# Main - 运行所有示例
# ============================================================================

if __name__ == '__main__':
    import sys

    examples = {
        '1': ('最基础使用', example_basic),
        '2': ('AutoGluon集成', example_autogluon),
        '3': ('监控处理过程', example_monitoring),
        '4': ('预测阶段预处理', lambda: print("见example_preprocessing_for_prediction函数")),
        '5': ('错误处理', example_error_handling),
        '6': ('批处理', example_batch_processing),
        '7': ('自定义配置', example_custom_config),
        '8': ('链式调用', example_chaining),
    }

    print("AutoDataPipeline 使用示例\n")
    print("可用示例:")
    for key, (name, _) in examples.items():
        print(f"  {key}: {name}")

    print("\n用法: python example_usage.py <示例号>")
    print("  例如: python example_usage.py 1")

    if len(sys.argv) > 1:
        example_num = sys.argv[1]
        if example_num in examples:
            name, func = examples[example_num]
            print(f"\n运行示例 {example_num}: {name}\n")
            try:
                func()
            except Exception as e:
                print(f"❌ 示例执行失败: {e}")
                import traceback
                traceback.print_exc()
        else:
            print(f"❌ 示例 {example_num} 不存在")
    else:
        print("\n提示: 指定示例号来运行")
