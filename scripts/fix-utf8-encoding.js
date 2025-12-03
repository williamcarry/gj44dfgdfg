#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * 扫描并修复项目中的编码问题
 * 确保所有Vue、JS、TS文件以UTF-8编码保存
 */

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        getFilesRecursively(filePath, fileList);
      }
    } else if (stat.isFile()) {
      // 只处理Vue和JS文件
      if (file.endsWith('.vue') || file.endsWith('.js') || file.endsWith('.ts')) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

function isValidUTF8(buffer) {
  let i = 0;
  while (i < buffer.length) {
    if ((buffer[i] & 0x80) === 0) {
      i++;
    } else if ((buffer[i] & 0xE0) === 0xC0) {
      if (i + 1 >= buffer.length || (buffer[i + 1] & 0xC0) !== 0x80) return false;
      i += 2;
    } else if ((buffer[i] & 0xF0) === 0xE0) {
      if (i + 2 >= buffer.length || (buffer[i + 1] & 0xC0) !== 0x80 || (buffer[i + 2] & 0xC0) !== 0x80) return false;
      i += 3;
    } else if ((buffer[i] & 0xF8) === 0xF0) {
      if (i + 3 >= buffer.length || (buffer[i + 1] & 0xC0) !== 0x80 || (buffer[i + 2] & 0xC0) !== 0x80 || (buffer[i + 3] & 0xC0) !== 0x80) return false;
      i += 4;
    } else {
      return false;
    }
  }
  return true;
}

function fixFileEncoding(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // 检查是否已是有效的UTF-8
    if (isValidUTF8(buffer)) {
      // 检查和移除BOM（如果存在）
      if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        fs.writeFileSync(filePath, buffer.slice(3), 'utf8');
        return { status: 'fixed', file: filePath, message: '移除UTF-8 BOM' };
      }
      return { status: 'ok', file: filePath, message: '已是UTF-8编码' };
    }
    
    // 尝试使用标准转换方式
    const content = buffer.toString('utf8');
    fs.writeFileSync(filePath, content, 'utf8');
    return { status: 'fixed', file: filePath, message: '已转换为UTF-8编码' };
  } catch (error) {
    return { status: 'error', file: filePath, message: error.message };
  }
}

function main() {
  console.log('🔍 开始扫描项目文件...\n');
  
  const srcPath = path.join(__dirname, '../src');
  const files = getFilesRecursively(srcPath);
  
  console.log(`📁 找到 ${files.length} 个需要检查的文件\n`);
  
  const results = {
    ok: [],
    fixed: [],
    error: []
  };
  
  let processedCount = 0;
  files.forEach(file => {
    const result = fixFileEncoding(file);
    results[result.status].push(result);
    processedCount++;
    
    // 简化输出
    if (result.status === 'fixed') {
      console.log(`✅ ${path.relative(process.cwd(), result.file)}`);
    } else if (result.status === 'error') {
      console.log(`❌ ${path.relative(process.cwd(), result.file)}: ${result.message}`);
    }
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 修复��果统计：`);
  console.log(`  ✅ 已是UTF-8: ${results.ok.length} 个文件`);
  console.log(`  🔧 已修复: ${results.fixed.length} 个文件`);
  console.log(`  ❌ 出错: ${results.error.length} 个文件\n`);
  
  if (results.fixed.length > 0) {
    console.log('✨ 编码修复完成！所有文件现已使用UTF-8编码（无BOM）。\n');
  } else if (results.error.length === 0) {
    console.log('✅ 所有文件都已是正确的UTF-8编码，无需修改。\n');
  }
}

main();
