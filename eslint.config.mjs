import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  globalIgnores([
    'docs/**',
    'public/_pagefind/**',
  ]),
])

export default eslintConfig
