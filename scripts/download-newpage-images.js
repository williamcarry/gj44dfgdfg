const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const downloadDir = path.join(__dirname, '../public/frondend/images/newPage');

// Ensure directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const images = [
  {
    url: 'https://www.saleyee.com/ContentNew/Images/2024/202405/new-icon.png',
    filename: 'new-icon.png'
  },
  {
    url: 'https://resource.saleyee.com/Content/Images/asset/%E6%96%B0%E5%93%81banner/%E6%96%B0%E5%93%81%E4%B8%8A%E5%B8%82.jpg',
    filename: 'new-banner.jpg'
  },
  {
    url: 'https://www.saleyee.com/static/imgs/aa83cfdd3cebd0d28376adfbee407bf3.png',
    filename: 'publish-icon.png'
  },
  {
    url: 'https://www.saleyee.com/Content/Images/down2.png',
    filename: 'download-icon.png'
  },
  {
    url: 'https://www.saleyee.com/static/imgs/43ad215f8b4093e12361ae2cf252eab7.png',
    filename: 'collect-icon.png'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E5%95%86%E5%9F%8E%E9%A6%96%E9%A1%B5/%E5%AE%B6%E5%B1%85%E5%92%8C%E5%AE%B6%E5%85%B7.jpg?v=1524421279',
    filename: 'cat-01-home-furniture.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%BA%AD%E9%99%A2%E5%92%8C%E5%9B%AD%E8%89%BA.jpg?v=232566885',
    filename: 'cat-02-patio-garden.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E9%9F%B3%E4%B9%90%E8%89%BA%E6%9C%AF.jpg?v=232566885',
    filename: 'cat-03-music-art.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%88%B7%E5%A4%96.%E5%A8%B1%E4%B9%90%E5%92%8C%E8%BF%90%E5%8A%A8.jpg?v=232566885',
    filename: 'cat-04-outdoor-sports.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E7%94%B5%E5%99%A8%E7%B1%BB.jpg?v=232566885',
    filename: 'cat-05-appliances.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%B7%A5%E5%95%86%E4%B8%9A%E8%AE%BE%E5%A4%87.jpg?v=232566885',
    filename: 'cat-06-industrial.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%81%A5%E5%BA%B7%E5%92%8C%E7%BE%8E%E5%AE%B9.jpg?v=232566885',
    filename: 'cat-07-health-beauty.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%8A%9E%E5%85%AC%E6%95%99%E8%82%B2%E4%B8%8E%E5%AE%89%E5%85%A8.jpg?v=232566885',
    filename: 'cat-08-office-education.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%AE%A0%E7%89%A9%E7%94%A8%E5%93%81.jpg?v=232566885',
    filename: 'cat-09-pets.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E7%8E%A9%E5%85%B7%E5%A9%B4%E7%AB%A5%E7%94%A8%E5%93%81.JPG?v=232566885',
    filename: 'cat-10-toys-baby.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%B1%BD%E6%91%A9%E9%85%8D%E4%BB%B6.jpg?v=232566885',
    filename: 'cat-11-auto-parts.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%9C%8D%E9%A5%B0%E7%AE%B1%E5%8C%85.jpg?v=232566885',
    filename: 'cat-12-fashion-bags.jpg'
  },
  {
    url: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%B6%88%E8%B4%B9%E7%94%B5%E5%AD%90%E5%99%A8%E6%9D%90.jpg?v=232566885',
    filename: 'cat-13-electronics.jpg'
  }
];

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const filepath = path.join(downloadDir, filename);
    
    client.get(url, { timeout: 10000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filename);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAll() {
  console.log(`📁 Downloading images to: ${downloadDir}\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const image of images) {
    try {
      await downloadFile(image.url, image.filename);
      console.log(`✓ ${image.filename}`);
      success++;
    } catch (err) {
      console.error(`✗ ${image.filename} - ${err.message}`);
      failed++;
    }
  }
  
  console.log(`\n✅ Downloaded: ${success}/${images.length} images`);
  if (failed > 0) {
    console.log(`⚠️ Failed: ${failed} images`);
  }
}

downloadAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
