const puppeteer = require('puppeteer')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const { technologyInfo, getVulnerabilityInfo } = require('./utils')

class ImageGenerator {
  async init () {
    const templateContent = await fs.promises.readFile(path.join(__dirname, 'template/', 'index.html'), 'utf8')
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

  async produce (rule) {
    if (!this.browser) {
      await this.init()
    }
    const { id, message, languages, contributor, metadata } = rule
    const lang = languages[0]

    const vuln = getVulnerabilityInfo(rule)
    const { icon, name } = await technologyInfo(lang, metadata && metadata.technology)
    const html = this.template({
      id,
      languageIcon: icon,
      userName: (contributor && contributor.name) || '',
      userAvatar: (contributor && contributor.avatarUrl) || '',
      vulnTitle: (vuln && vuln.title) || '',
      vulnType: (vuln && vuln.type) || '',
      message: marked.parseInline(message),
      lang: name
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
