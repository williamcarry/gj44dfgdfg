#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// 创建目录
const iconDir = path.join(__dirname, '../public/images/icons')
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true })
  console.log(`✓ 创建目录: ${iconDir}`)
}

// 需要下载的图片列表
const images = [
  {
    name: 'prohibition.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2022/202204/prohibition.png'
  },
  {
    name: 'true.png',
    url: 'https://www.saleyee.com/ContentNew/Images/ture.png'
  },
  {
    name: 'false.png',
    url: 'https://www.saleyee.com/ContentNew/Images/false.png'
  },
  {
    name: 'insurance.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2021/November/insurance_icon.png'
  },
  {
    name: 'collect.png',
    url: 'https://www.saleyee.com/ContentNew/Images/collect1.png'
  },
  {
    name: 'feedback.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2024/202406/hight_price.png'
  },
  {
    name: 'note.png',
    url: 'https://www.saleyee.com/ContentNew/Images/note.png'
  },
  {
    name: 'closed.png',
    url: 'https://www.saleyee.com/ContentNew/Images/closed_guide.png'
  }
]

// 下载函数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filepath)

    protocol
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file)
          file.on('finish', () => {
            file.close()
            resolve(filepath)
          })
        } else {
          file.close()
          fs.unlink(filepath, () => {})
          reject(new Error(`HTTP ${response.statusCode}`))
        }
      })
      .on('error', (error) => {
        file.close()
        fs.unlink(filepath, () => {})
        reject(error)
      })
  })
}

// 主函数
async function main() {
  console.log('开始下载商品详情页面图标...\n')

  let successCount = 0
  let failCount = 0

  for (const image of images) {
    const filepath = path.join(iconDir, image.name)

    // 检查文件是否已存在
    if (fs.existsSync(filepath)) {
      console.log(`⊘ 跳过 (已存在): ${image.name}`)
      continue
    }

    try {
      await downloadImage(image.url, filepath)
      console.log(`✓ 下载成功: ${image.name}`)
      successCount++
    } catch (error) {
      console.error(`✗ 下载失败: ${image.name} - ${error.message}`)
      failCount++
    }
  }

  console.log(`\n下载完成! 成功: ${successCount}, 失败: ${failCount}`)
  if (failCount === 0) {
    console.log('✓ 所有图片已成功下载到 public/images/icons/')
  }
}

main().catch((error) => {
  console.error('错误:', error)
  process.exit(1)
})
