// Ensures text files from git are saved with UTF-8 encoding (best-effort)
// Usage: node scripts/ensure-utf8.js
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function gitFiles() {
  const out = execSync('git ls-files', { encoding: 'utf8' })
  return out.split('\n').filter(Boolean)
}

const textExts = new Set([
  '.js', '.ts', '.jsx', '.tsx', '.vue', '.json', '.css', '.scss', '.less', '.html', '.htm', '.md', '.txt', '.yml', '.yaml', '.xml', '.svg', '.csv', '.env'
])

function isTextFile(file) {
  return textExts.has(path.extname(file).toLowerCase())
}

function ensureUtf8(file) {
  try {
    const buf = fs.readFileSync(file)
    const asUtf8 = buf.toString('utf8')
    const roundtrip = Buffer.from(asUtf8, 'utf8')
    if (roundtrip.equals(buf)) {
      // already valid UTF-8
      return false
    }
    // Not valid UTF-8; try latin1 fallback
    const asLatin1 = buf.toString('latin1')
    fs.writeFileSync(file, asLatin1, { encoding: 'utf8' })
    return true
  } catch (err) {
    console.error('Failed to convert', file, err.message)
    return false
  }
}

function main() {
  const files = gitFiles()
  let changed = 0
  for (const f of files) {
    if (!isTextFile(f)) continue
    try {
      const rel = f
      const abs = path.resolve(process.cwd(), rel)
      if (!fs.existsSync(abs)) continue
      if (ensureUtf8(abs)) {
        console.log('Converted to UTF-8:', rel)
        changed++
      }
    } catch (e) {
      console.error('Error processing', f, e.message)
    }
  }
  console.log(`Done. Files converted: ${changed}`)
}

main()
