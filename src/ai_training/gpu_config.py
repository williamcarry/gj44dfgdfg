"""
GPU配置模块 - 自动检测并配置GPU加速

功能：
  - 自动检测系统中的GPU设备
  - 配置GPU内存增长模式
  - 打印详细的GPU信息
  - 支持多GPU环境（自动使用第一个GPU）
  
使用方法：
  from ai_training.gpu_config import setup_gpu
  
  # 在训练脚本开始时调用
  gpu_available, device_name = setup_gpu()
  
  if gpu_available:
      print(f"使用GPU: {device_name}")
  else:
      print("使用CPU训练")

作者：AI Training Team
日期：2024-12-02
"""

import tensorflow as tf


def setup_gpu(verbose=True):
    """
    检测并配置GPU
    
    参数:
        verbose: 是否打印详细信息 (默认: True)
    
    返回:
        gpu_available: GPU是否可用 (bool)
        device_name: 设备名称 (str)
        gpu_count: GPU数量 (int)
    """
    if verbose:
        print("\n" + "="*70)
        print("🖥️  GPU检测与配置")
        print("="*70)
    
    # 检测物理GPU设备
    gpus = tf.config.list_physical_devices('GPU')
    gpu_count = len(gpus)
    
    if gpus:
        try:
            # 设置GPU内存增长（避免一次性占用所有显存）
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
            
            if verbose:
                # 打印GPU信息
                print(f"\n✅ 检测到 {gpu_count} 个GPU设备：")
                for i, gpu in enumerate(gpus):
                    gpu_name = gpu.name.split('/')[-1]  # 提取设备名称
                    print(f"   GPU {i}: {gpu_name}")
                
                # 获取逻辑GPU信息
                logical_gpus = tf.config.list_logical_devices('GPU')
                print(f"\n✅ 可用逻辑GPU数量: {len(logical_gpus)}")
                
                # 显示将使用哪个GPU
                print(f"\n🚀 训练将使用GPU加速！")
                print(f"   使用设备: {gpus[0].name}")
                print(f"   预计速度提升: 5-10倍（相比CPU）")
            
            return True, gpus[0].name, gpu_count
            
        except RuntimeError as e:
            if verbose:
                print(f"\n⚠️  GPU配置失败: {e}")
                print("   将回退到CPU训练")
            return False, "CPU", 0
            
    else:
        if verbose:
            print("\n📊 未检测到可用的GPU设备")
            print("   将使用CPU训练")
            print("\n💡 提示：")
            print("   - 如果您有NVIDIA显卡，请确保安装了CUDA和cuDNN")
            print("   - TensorFlow 2.10+ 内置GPU支持，无需单独安装tensorflow-gpu")
            print("   - 检查显卡驱动是否正常安装")
            
            # 显示系统信息
            try:
                import platform
                print(f"\n💻 系统信息：")
                print(f"   操作系统: {platform.system()} {platform.release()}")
                print(f"   TensorFlow版本: {tf.__version__}")
            except:
                pass
        
        return False, "CPU", 0


def get_gpu_memory_info():
    """
    获取GPU显存信息
    
    返回:
        list: 每个GPU的显存信息字典列表
    """
    gpus = tf.config.list_physical_devices('GPU')
    memory_info = []
    
    for i, gpu in enumerate(gpus):
        try:
            # TensorFlow 2.x 中获取显存信息的方法
            gpu_details = tf.config.experimental.get_device_details(gpu)
            memory_info.append({
                'gpu_id': i,
                'name': gpu.name,
                'details': gpu_details
            })
        except:
            memory_info.append({
                'gpu_id': i,
                'name': gpu.name,
                'details': 'Not available'
            })
    
    return memory_info


def set_gpu_memory_limit(memory_limit_mb):
    """
    设置GPU显存限制
    
    参数:
        memory_limit_mb: 显存限制（MB）
    
    示例:
        set_gpu_memory_limit(4096)  # 限制为4GB
    """
    gpus = tf.config.list_physical_devices('GPU')
    
    if gpus:
        try:
            # 为每个GPU设置显存限制
            for gpu in gpus:
                tf.config.set_logical_device_configuration(
                    gpu,
                    [tf.config.LogicalDeviceConfiguration(memory_limit=memory_limit_mb)]
                )
            print(f"✅ GPU显存已限制为 {memory_limit_mb}MB")
        except RuntimeError as e:
            print(f"⚠️  设置显存限制失败: {e}")
            print("   注意: 显存限制必须在程序初始化GPU之前设置")
    else:
        print("⚠️  未检测到GPU设备")


def disable_gpu():
    """
    禁用GPU，强制使用CPU
    
    使用场景:
        - 调试时想使用CPU
        - GPU显存不足
        - 测试CPU性能
    """
    try:
        tf.config.set_visible_devices([], 'GPU')
        print("✅ GPU已禁用，将使用CPU训练")
    except:
        print("⚠️  禁用GPU失败")


if __name__ == '__main__':
    """
    测试GPU配置
    """
    print("=" * 70)
    print("GPU配置测试")
    print("=" * 70)
    
    # 测试1: 基本GPU检测
    print("\n【测试1】基本GPU检测:")
    gpu_available, device_name, gpu_count = setup_gpu(verbose=True)
    print(f"\n结果: GPU可用={gpu_available}, 设备={device_name}, 数量={gpu_count}")
    
    # 测试2: 获取显存信息
    if gpu_available:
        print("\n【测试2】GPU显存信息:")
        memory_info = get_gpu_memory_info()
        for info in memory_info:
            print(f"  GPU {info['gpu_id']}: {info['name']}")
            print(f"    详细信息: {info['details']}")
    
    # 测试3: TensorFlow版本信息
    print(f"\n【测试3】TensorFlow信息:")
    print(f"  版本: {tf.__version__}")
    print(f"  内置CUDA支持: {tf.test.is_built_with_cuda()}")
    
    print("\n" + "=" * 70)
    print("测试完成！")
    print("=" * 70)
