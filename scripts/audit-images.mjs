// Lists image files under public/images that nothing in src/data/images.js (or elsewhere in src, index.html, scripts) references.
// Dry run by default. `node scripts/audit-images.mjs --delete` removes the unreferenced files after listing them.
// It never touches public/images/brand, public/images/flags or anything outside public/images, and the
// protected "images and logo" folder is not part of this project at all.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const imgRoot = path.join(root, 'public', 'images')
const PROTECTED = ['brand', 'flags']
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))

// Registry entries -> every file they can resolve to
const reg = fs.readFileSync(path.join(root, 'src/data/images.js'), 'utf8')
const used = new Set()
for (const m of reg.matchAll(/P\(\s*'([^']+)',\s*'([^']+)',\s*\[([^\]]+)\]/g)) {
  for (const w of m[3].split(',').map((s) => s.trim())) used.add(path.join(imgRoot, m[1], `${m[2]}-${w}.webp`))
}
// Any other literal /images/... path in the source
const srcFiles = [...walk(path.join(root, 'src')), path.join(root, 'index.html'), ...walk(path.join(root, 'scripts'))].filter((f) => /\.(jsx?|mjs|css|html)$/.test(f))
for (const f of srcFiles) for (const m of fs.readFileSync(f, 'utf8').matchAll(/\/images\/([A-Za-z0-9_\-./]+\.[a-z0-9]+)/g)) used.add(path.join(imgRoot, m[1]))

const missing = [...used].filter((f) => !fs.existsSync(f) && !f.includes('${'))
const unused = walk(imgRoot).filter((f) => !used.has(f) && !PROTECTED.includes(path.relative(imgRoot, f).split(path.sep)[0]))
console.log(`Referenced files: ${used.size}`)
console.log(missing.length ? `MISSING (broken references):\n${missing.map((f) => '  ' + path.relative(root, f)).join('\n')}` : 'No broken references.')
console.log(unused.length ? `Unreferenced files:\n${unused.map((f) => '  ' + path.relative(root, f)).join('\n')}` : 'No unreferenced files.')
if (process.argv.includes('--delete') && !missing.length) { for (const f of unused) fs.unlinkSync(f); console.log(`Deleted ${unused.length} files.`) }
else if (process.argv.includes('--delete')) console.log('Not deleting: fix the broken references first.')
