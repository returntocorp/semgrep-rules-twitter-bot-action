const puppeteer = require('puppeteer')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const { languageIcon } = require('./utils')
const { readableLanguageName } = require('./utils')

class ImageGenerator {
  async init () {
    // const templateContent = await fs.promises.readFile(path.join(__dirname, 'template/', 'index.html'), 'utf8')
    const templateContent = await fs.promises.readFile(path.join(__dirname, 'template/', 'index_tmp.html'), 'utf8')
    this.template = ejs.compile(templateContent)
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
  }

  async close () {
    if (this.browser) {
      await this.browser.close()
    }
  }

  async produce (ruleMetaData) {
    if (!this.browser) {
      await this.init()
    }
    const { id, message, lang, vuln, user } = ruleMetaData
    const icon = await languageIcon(lang)
    const html = this.template({
      id,
      languageIcon: icon,
      userName: (user && user.name) || '',
      vulnTitle: (vuln && vuln.title) || '',
      vulnType: (vuln && vuln.type) || '',
      message: marked.parseInline(message),
      lang: readableLanguageName(lang)
    })

    const page = await this.browser.newPage()
    await page.setViewport({
      width: 1200,
      height: 600
    })
    await page.setContent(html)
    const screenshot = await page.screenshot({
      type: 'png',
      encoding: 'base64',
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 600
      }
    })
    await page.close()
    return screenshot
  }
}

module.exports = ImageGenerator
