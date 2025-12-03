#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')

// 创建目录
const iconDir = path.join(__dirname, '../public/frondend/images/DiscountSalePage')
if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true })
  console.log(`✓ 创建目录: ${iconDir}`)
}

// 需要下载的图片列表（非商品图片）
const images = [
  {
    name: 'promotion_icon.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2023/202309/promotion_icon.png'
  },
  {
    name: 'collect.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2023/202309/collect.png'
  },
  {
    name: 'down2.png',
    url: 'https://www.saleyee.com/Content/Images/down2.png'
  },
  {
    name: 'flasting_logo.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2023/202304/flasting_logo.png'
  },
  {
    name: 'publish_icon.png',
    url: 'https://www.saleyee.com/static/imgs/aa83cfdd3cebd0d28376adfbee407bf3.png'
  },
  {
    name: 'download_icon.png',
    url: 'https://www.saleyee.com/static/imgs/cb518a6f8a447ae39c5fd2e61a3792be.png'
  },
  {
    name: 'favorites_icon.png',
    url: 'https://www.saleyee.com/static/imgs/43ad215f8b4093e12361ae2cf252eab7.png'
  },
  {
    name: 'derive_icon.png',
    url: 'https://www.saleyee.com/ContentNew/Images/2023/202309/derive_icon.png'
  }
]

// 用于检查文件是否已存在于其他目录的函数
function findDuplicateInOtherDirs(filename, excludeDir) {
  const baseDir = path.join(__dirname, '../public/frondend/images')
  const dirs = fs.readdirSync(baseDir)

  for (const dir of dirs) {
    if (dir === excludeDir) continue

    const filepath = path.join(baseDir, dir, filename)
    if (fs.existsSync(filepath)) {
      return filepath
    }
  }

  return null
}

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

// 复制函数
function copyImage(sourcePath, destPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(sourcePath, destPath, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(destPath)
      }
    })
  })
}

// 主函数
async function main() {
  console.log('开始下载DiscountSalePage非商品图片...\n')

  let successCount = 0
  let skipCount = 0
  let failCount = 0

  for (const image of images) {
    const filepath = path.join(iconDir, image.name)

    // 检查文件是否已存在于当前目录
    if (fs.existsSync(filepath)) {
      console.log(`⊘ 跳过 (已存在): ${image.name}`)
      skipCount++
      continue
    }

    // 检查是否存在于其他目录（重复）
    const duplicate = findDuplicateInOtherDirs(image.name, 'DiscountSalePage')
    if (duplicate) {
      try {
        await copyImage(duplicate, filepath)
        console.log(`✓ 复制成功 (从其他目录): ${image.name}`)
        successCount++
        continue
      } catch (error) {
        console.error(`✗ 复制失败: ${image.name} - ${error.message}`)
        failCount++
        continue
      }
    }

    // 下载新图片
    try {
      await downloadImage(image.url, filepath)
      console.log(`✓ 下载成功: ${image.name}`)
      successCount++
    } catch (error) {
      console.error(`✗ 下载失败: ${image.name} - ${error.message}`)
      failCount++
    }
  }

  console.log(`\n下载完成! 成功: ${successCount}, 跳过: ${skipCount}, 失败: ${failCount}`)
  if (failCount === 0) {
    console.log('✓ 所有图片已成功处理!')
  }
}

main().catch((error) => {
  console.error('错误:', error)
  process.exit(1)
})
