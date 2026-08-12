import sharp from 'sharp'
import { rename, stat } from 'node:fs/promises'

// One-shot compression for oversized PNGs. Writes to a temp file then
// renames over the original (sharp cannot write to its own input path).
const jobs = [
  { file: 'public/logo.png', width: 512 },        // schema.org logo; Google needs >=112px
  { file: 'public/logo-mark.png', width: 96 },    // header renders at 36px; 96 covers the 2x srcset bucket
  { file: 'public/images/portfolio/justwell-clinical.png', width: 1440 },
  { file: 'public/images/portfolio/terracotta-construction.png', width: 1440 },
  { file: 'public/images/portfolio/stephen-long-congress.png', width: 1440 },
]

for (const { file, width } of jobs) {
  const tmp = `${file}.tmp`
  const before = (await stat(file)).size
  await sharp(file)
    .resize({ width, withoutEnlargement: true })
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toFile(tmp)
  await rename(tmp, file)
  const after = (await stat(tmp.replace(/\.tmp$/, ''))).size
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`)
}
