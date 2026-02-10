// Required webserver headers (configure in nginx/Apache/CDN):
//
// HTML pages:
//   Cache-Control: public, max-age=900, s-maxage=1800, stale-while-revalidate=3600
//
// All responses:
//   X-Content-Type-Options: nosniff
//   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; frame-src 'self'; base-uri 'self'; form-action 'self'

export default function (eleventyConfig) {
  // Static assets from public/ → output root
  eleventyConfig.addPassthroughCopy({ 'public': '/' })

  // Watch CSS source for dev server reload
  eleventyConfig.addWatchTarget('src/assets/css/')

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  }
}
