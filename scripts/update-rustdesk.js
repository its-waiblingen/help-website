import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '..', 'src', '_data', 'rustdesk.json')

const ASSET_PATTERNS = {
  windows: (ver) => `rustdesk-${ver}-x86_64.exe`,
  'macos-arm': (ver) => `rustdesk-${ver}-aarch64.dmg`,
  'macos-intel': (ver) => `rustdesk-${ver}-x86_64.dmg`,
}

async function main() {
  const res = await fetch('https://api.github.com/repos/rustdesk/rustdesk/releases/latest', {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}: ${await res.text()}`)
  }

  const release = await res.json()
  const version = release.tag_name.replace(/^v/, '')

  const data = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))

  if (data.version === version) {
    console.log(`Already up to date (${version})`)
    return
  }

  console.log(`Updating ${data.version} → ${version}`)

  const assetsByName = Object.fromEntries(release.assets.map((a) => [a.name, a.browser_download_url]))

  for (const download of data.downloads) {
    const pattern = ASSET_PATTERNS[download.os]
    if (!pattern) continue

    const filename = pattern(version)
    const url = assetsByName[filename]

    if (!url) {
      console.warn(`  ⚠ No asset found for ${download.os} (expected ${filename})`)
      continue
    }

    console.log(`  ${download.os}: ${url}`)
    download.url = url
  }

  data.version = version
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  console.log(`Updated rustdesk.json to ${version}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
