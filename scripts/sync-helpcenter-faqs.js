const fs = require('fs')
const path = require('path')

const navPath = path.resolve(__dirname, '../src/data/helpCenterNav.ts')
const faqPath = path.resolve(__dirname, '../src/data/faqData.ts')

let nav = fs.readFileSync(navPath, 'utf8')
let faq = fs.readFileSync(faqPath, 'utf8')

// Build title -> id map from faqData.ts
const titleIdMap = {}
const faqRegex = /id:\s*'([a-z0-9]+)'[\s\S]*?question:\s*'([^']+)'/gi
let m
while ((m = faqRegex.exec(faq)) !== null) {
  const id = m[1]
  const title = m[2].trim()
  titleIdMap[title] = id
}

// Replace occurrences of url: 'https://www.saleyee.com/faq/xxx.html' when title matches
// We look for { title: 'xxx', url: 'https://www.saleyee.com/faq/YYY.html' } patterns
const itemRegex = /(\{\s*title:\s*'([^']+)',\s*url:\s*')https:\/\/www\.saleyee\.com\/faq\/[a-zA-Z0-9_\-]+\.html('\s*\})/g
nav = nav.replace(itemRegex, (full, prefix, title, suffix) => {
  const tid = titleIdMap[title.trim()]
  if (tid) {
    return `${prefix}https://www.saleyee.com/faq/${tid}.html${suffix}`
  }
  return full
})

fs.writeFileSync(navPath, nav, 'utf8')
console.log('Synced helpCenterNav URLs with faqData (where title matched).')
