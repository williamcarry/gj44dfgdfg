const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 图片下载列表
const images = [
  {
    name: 'amazon.jpg',
    url: 'https://resource.saleyee.com/UploadFiles/Images/2021/202108/e827b18b-7406-44bd-af87-023264fe1e3f.jpg'
  },
  {
    name: 'walmart.jpg',
    url: 'https://resource.saleyee.com/UploadFiles/Images/2021/202108/624010d8-62d6-4896-b9df-fad86d3388b6.jpg'
  },
  {
    name: 'ebay.jpg',
    url: 'https://resource.saleyee.com/UploadFiles/Images/2021/202108/7f979b21-ecbd-48e9-99bb-f59fb2cc97b5.jpg'
  },
  {
    name: 'temu.png',
    url: 'https://resource.saleyee.com/UploadFiles/Images/2024/202404/e419b640-34a9-47c6-a93e-aea7aa15cc94.png'
  },
  {
    name: 'shein.png',
    url: 'https://resource.saleyee.com/UploadFiles/Images/2023/202306/6354c66a-fee7-43be-a216-b900d199862a.png'
  },
  {
    name: 'tiktok.png',
    url: 'https://resource.saleyee.com/UploadFiles/Images/2022/202205/87d65da5-3a20-4e14-b93c-d33c2f421d53.png'
  }
];

// 目标目录
const targetDir = path.join(__dirname, '../public/frondend/images/crossBordereCommercePage');

// 确保目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`✓ 创建目录: ${targetDir}`);
}

// 下载函数
function downloadImage(imageInfo) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(targetDir, imageInfo.name);
    const protocol = imageInfo.url.startsWith('https') ? https : http;

    protocol.get(imageInfo.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`下载失败: ${imageInfo.name} (状态码: ${response.statusCode})`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✓ 下载完成: ${imageInfo.name}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // 删除不完整文件
        reject(err);
      });
    }).on('error', reject);
  });
}

// 批量下载
async function downloadAll() {
  console.log('开始下载平台图片...\n');

  try {
    for (const imageInfo of images) {
      await downloadImage(imageInfo);
    }
    console.log('\n✓ 所有图片下载完成！');
    process.exit(0);
  } catch (error) {
    console.error(`\n✗ 下载出错: ${error.message}`);
    process.exit(1);
  }
}

downloadAll();
