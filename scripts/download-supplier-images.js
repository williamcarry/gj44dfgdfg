// Download supplier images into public/images/supplier
import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'

const outDir = path.resolve(process.cwd(), 'public', 'images', 'supplier')
fs.mkdirSync(outDir, { recursive: true })

const files = [
  {
    url: 'https://cdn.builder.io/api/v1/image/assets%2F4eba30cb5d5f4c0ca00697b512d15f87%2F93455931cd0a4b65af82a6c206b158c7?format=webp&width=800',
    name: 'screenshot.png'
  },
  { url: 'https://img.saleyee.cn/upload/imgs/landing/icon-form.png', name: 'icon-form.png' },
  { url: 'https://img.saleyee.cn/upload/imgs/landing/icon-phone.png', name: 'icon-phone.png' },
  { url: 'https://img.saleyee.cn/upload/imgs/landing/icon-verify.png', name: 'icon-verify.png' },
  { url: 'https://img.saleyee.cn/upload/imgs/landing/icon-smile.png', name: 'icon-smile.png' },
  { url: 'https://img.saleyee.cn/upload/imgs/landing/banner1.png', name: 'banner1.png' },
  { url: 'https://img.saleyee.cn/upload/imgs/landing/banner2.png', name: 'banner2.png' }
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error('Failed to download ' + url + ' status ' + res.statusCode))
          return
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve()))
        file.on('error', (err) => reject(err))
      })
      .on('error', (err) => reject(err))
  })
}

async function run() {
  console.log('Downloading supplier images to', outDir)
  for (const f of files) {
    const dest = path.join(outDir, f.name)
    try {
      process.stdout.write('Downloading ' + f.url + ' ... ')
      await download(f.url, dest)
      console.log('OK')
    } catch (err) {
      console.error('\nFailed to download', f.url, err.message)
    }
  }
  console.log('Done')
}

run()
