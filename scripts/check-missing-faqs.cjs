const fs = require('fs')
const path = require('path')

const navPath = path.resolve(__dirname, '../src/data/helpCenterNav.ts')
const faqPath = path.resolve(__dirname, '../src/data/faqData.ts')

const nav = fs.readFileSync(navPath, 'utf8')
const faq = fs.readFileSync(faqPath, 'utf8')

const navIds = new Set()
const navTitleById = {}
const navRegex = /https:\/\/www\.saleyee\.com\/faq\/(hp[0-9a-zA-Z]+)\.html/g
let m
while ((m = navRegex.exec(nav)) !== null) {
  navIds.add(m[1])
}

// build set of faq ids
const faqIds = new Set()
const faqIdRegex = /id:\s*'([a-z0-9]+)'/gi
while ((m = faqIdRegex.exec(faq)) !== null) {
  faqIds.add(m[1])
}

const missing = Array.from(navIds).filter(id => !faqIds.has(id)).sort()
if (missing.length === 0) {
  console.log('All nav hp IDs found in faqData.')
} else {
  console.log('Missing hp IDs in src/data/faqData.ts:')
  missing.forEach(id => console.log(id))
}
