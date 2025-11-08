import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routesToPrerender = [
  '/',
  '/uk-savings-calculator-interest-estimator',
  '/free-online-word-counter-tool',
  '/free-secure-password-generator-online',
  '/uk-mortgage-payment-calculator-online',
  '/uk-compound-interest-calculator-online',
  '/uk-stocks-and-shares-isa-calculator',
  '/uk-credit-card-repayment-calculator',
  '/uk-student-loan-repayment-calculator',
  '/net-worth-calculator',
  '/about',
  '/terms',
  '/privacy',
  '/contact',
  '/disclaimer'
]

;(async () => {
  for (const url of routesToPrerender) {
    const appHtml = render(url);
    const html = template.replace(`<!--app-html-->`, appHtml)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
