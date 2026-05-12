import { mkdirSync, readFileSync, createWriteStream } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SOURCES_PATH = join(__dirname, 'rustdesk-sources.json')
const DOWNLOADS_DIR = join(__dirname, '..', 'public', 'downloads')

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest))
}

async function main() {
  const { binaries } = JSON.parse(readFileSync(SOURCES_PATH, 'utf-8'))
  mkdirSync(DOWNLOADS_DIR, { recursive: true })

  for (const { key, filename, url } of binaries) {
    const dest = join(DOWNLOADS_DIR, filename)
    console.log(`  ${key}: ${url}`)
    try {
      await download(url, dest)
      console.log(`    → ${dest}`)
    } catch (err) {
      throw new Error(`Failed to download ${key} (${filename}): ${err.message}`)
    }
  }

  console.log(`Downloaded ${binaries.length} binaries into ${DOWNLOADS_DIR}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
