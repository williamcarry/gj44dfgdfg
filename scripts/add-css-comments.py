#!/usr/bin/env python3
import os
import sys

css_comment = """<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
"""

pages_dir = 'src/pages'
files = [f for f in os.listdir(pages_dir) if f.endswith('.vue')]

for file in sorted(files):
    file_path = os.path.join(pages_dir, file)
    with open(file_path, 'r', encoding='utf8') as f:
        content = f.read()
    
    # 检查是否已有注释
    if content.startswith('<!--\nCSS 引用说明：'):
        print(f'跳过 {file} (已有注释)')
        continue
    
    # 添加注释
    new_content = css_comment + content
    with open(file_path, 'w', encoding='utf8') as f:
        f.write(new_content)
    print(f'✓ 已更新 {file}')

print(f'\n完成！已处理 {len(files)} 个文件')
