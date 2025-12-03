#!/usr/bin/env node

// CommonJS version of the downloader for environments with "type": "module"
const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

const VUE_PATH = path.join(__dirname, '..', 'src', 'pages', 'DirectDeliveryPage.vue')
const TARGET_DIR = path.join(__dirname, '..', 'public', 'frondend', 'images', 'DirectDeliveryPage')

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        return resolve(downloadFile(res.headers.location, dest))
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`))
      }
      const fileStream = fsSync.createWriteStream(dest)
      res.pipe(fileStream)
      fileStream.on('finish', () => {
        fileStream.close(() => resolve())
      })
      fileStream.on('error', (err) => reject(err))
    })
    req.on('error', reject)
  })
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

function uniqName(dir, basename) {
  const ext = path.extname(basename)
  const name = path.basename(basename, ext)
  let candidate = basename
  let i = 1
  while (fsSync.existsSync(path.join(dir, candidate))) {
    candidate = `${name}-${i}${ext}`
    i++
  }
  return candidate
}

function isProductImageUrl(url) {
  return /\/Resources\/GoodsImages|\/GoodsImages|img-accelerate\.saleyee\.cn/i.test(url)
}

async function main() {
  const vueExists = fsSync.existsSync(VUE_PATH)
  if (!vueExists) {
    console.error(`Vue file not found: ${VUE_PATH}`)
    process.exit(1)
  }

  let content = await fs.readFile(VUE_PATH, 'utf8')

  const urlRegex = /(https?:\/\/[\w\-.:@%\/?=~+&;,]+?\.(?:png|jpe?g|gif|svg))(?:\?|\b)/gi
  const matches = [...content.matchAll(urlRegex)].map(m => m[1])
  const uniq = Array.from(new Set(matches))

  const candidates = uniq.filter(u => !isProductImageUrl(u))

  if (candidates.length === 0) {
    console.log('No non-product images found to download.')
    return
  }

  await ensureDir(TARGET_DIR)

  const mapUrlToLocal = {}

  for (const url of candidates) {
    try {
      const parsed = new URL(url)
      let basename = path.basename(parsed.pathname)
      if (!basename || !path.extname(basename)) {
        basename = encodeURIComponent(parsed.hostname) + path.extname(parsed.pathname || '.png')
      }
      const uniqueBasename = uniqName(TARGET_DIR, basename)
      const dest = path.join(TARGET_DIR, uniqueBasename)
      console.log(`Downloading ${url} -> ${dest}`)
      await downloadFile(url, dest)
      const publicPath = path.posix.join('/frondend/images/DirectDeliveryPage', uniqueBasename)
      mapUrlToLocal[url] = publicPath
    } catch (err) {
      console.error(`Failed to download ${url}:`, err.message)
    }
  }

  const backupPath = VUE_PATH + '.bak'
  if (!fsSync.existsSync(backupPath)) {
    await fs.copyFile(VUE_PATH, backupPath)
    console.log(`Backup created: ${backupPath}`)
  }

  let modified = content
  for (const [orig, local] of Object.entries(mapUrlToLocal)) {
    const escaped = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const r = new RegExp(escaped, 'g')
    modified = modified.replace(r, local)
  }

  await fs.writeFile(VUE_PATH, modified, 'utf8')
  console.log('Updated Vue file with local image paths.')
  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
