import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  globalIgnores([
    '_site/**',
    'public/_pagefind/**',
  ]),
])

export default eslintConfig
