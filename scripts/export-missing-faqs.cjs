const fs = require('fs')
const path = require('path')

const navPath = path.resolve(__dirname, '../src/data/helpCenterNav.ts')
const faqPath = path.resolve(__dirname, '../src/data/faqData.ts')
const outPath = path.resolve(__dirname, '../src/data/missingFaqs.json')

const nav = fs.readFileSync(navPath, 'utf8')
const faq = fs.readFileSync(faqPath, 'utf8')

const navIds = new Set()
const navRegex = /https:\/\/www\.saleyee\.com\/faq\/(hp[0-9a-zA-Z]+)\.html/g
let m
while ((m = navRegex.exec(nav)) !== null) navIds.add(m[1])

const faqIds = new Set()
const faqIdRegex = /id:\s*'([a-z0-9]+)'/gi
while ((m = faqIdRegex.exec(faq)) !== null) faqIds.add(m[1])

const missing = Array.from(navIds).filter(id => !faqIds.has(id)).sort()

const results = missing.map(id => {
  const url = `https://www.saleyee.com/faq/${id}.html`
  // try to find a title in nav by locating the line containing the url and extracting the nearest title string
  const urlIndex = nav.indexOf(url)
  let title = null
  if (urlIndex !== -1) {
    // search backwards for "title: '...'," before urlIndex within 200 chars
    const sliceStart = Math.max(0, urlIndex - 300)
    const slice = nav.slice(sliceStart, urlIndex + url.length + 200)
    const titleMatch = slice.match(/title:\s*'([^']+)'/)
    if (titleMatch) title = titleMatch[1]
  }
  return { id, url, title }
})

fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf8')
console.log('Wrote', outPath, 'with', results.length, 'items')
