const { readFile } = require('fs').promises
const { resolve } = require('path')

function readableLanguageName (lang) {
  if (!lang) {
    return ''
  }

  switch (lang.toLowerCase()) {
    case 'js':
    case 'javascript': return 'JavaScript'
    case 'ts':
    case 'typescript': return 'TypeScript'
    case 'kt': return 'Kotlin'
    case 'csharp': return 'C#'
    case 'yaml': return 'YAML'
    case 'json': return 'JSON'
    case 'php': return 'PHP'
    default: return lang.charAt(0).toUpperCase() + lang.slice(1)
  }
}

async function readIconContent (iconPath) {
  return await readFile(resolve(__dirname, iconPath), { encoding: 'utf8' })
}

async function technologyInfo (lang, technology) {
  if (!lang) {
    return ''
  }

  technology = technology || []

  let name = readableLanguageName(lang)
  let icon = ''

  switch (String(lang).toLowerCase()) {
    case 'bash':
      icon = await readIconContent('./template/icons/bash.svg')
      break
    case 'c':
      icon = await readIconContent('./template/icons/clang.svg')
      break
    case 'csharp':
    case 'c#':
      if (technology.includes('.net')) {
        name = '.Net'
        icon = await readIconContent('./template/icons/dot-net.svg')
      } else {
        icon = await readIconContent('./template/icons/csharp.svg')
      }
      break
    case 'dockerfile':
      icon = await readIconContent('./template/icons/docker.svg')
      break
    case 'go':
      icon = await readIconContent('./template/icons/go.svg')
      break
    case 'java':
      if (technology.includes('spring')) {
        name = 'Spring'
        icon = await readIconContent('./template/icons/spring.svg')
      } else {
        icon = await readIconContent('./template/icons/java.svg')
      }
      break
    case 'js':
    case 'javascript':
      if (technology.includes('express')) {
        name = 'Express'
        icon = await readIconContent('./template/icons/express.svg')
      } else if (technology.includes('angular') || technology.includes('angularjs')) {
        name = 'Angular'
        icon = await readIconContent('./template/icons/angularjs.svg')
      } else if (technology.includes('react') || technology.includes('reactjs')) {
        name = 'React'
        icon = await readIconContent('./template/icons/react.svg')
      } else {
        icon = await readIconContent('./template/icons/javascript.svg')
      }
      break
    case 'ts':
    case 'typescript':
      if (technology.includes('express')) {
        name = 'Express'
        icon = await readIconContent('./template/icons/express.svg')
      } else if (technology.includes('angular') || technology.includes('angularjs')) {
        name = 'Angular'
        icon = await readIconContent('./template/icons/angularjs.svg')
      } else if (technology.includes('react') || technology.includes('reactjs')) {
        name = 'React'
        icon = await readIconContent('./template/icons/react.svg')
      } else {
        icon = await readIconContent('./template/icons/typescript.svg')
      }
      break
    case 'kt':
    case 'kotlin':
      icon = await readIconContent('./template/icons/kotlin.svg')
      break
    case 'ocaml':
      icon = await readIconContent('./template/icons/ocaml.svg')
      break
    case 'php':
      if (technology.includes('laravel')) {
        name = 'Laravel'
        icon = await readIconContent('./template/icons/laravel.svg')
      } else if (technology.includes('symfony')) {
        name = 'Symfony'
        icon = await readIconContent('./template/icons/symfony.svg')
      } else if (technology.includes('doctrine')) {
        name = 'Doctrine'
        icon = await readIconContent('./template/icons/doctrine.svg')
      } else {
        icon = await readIconContent('./template/icons/php.svg')
      }
      break
    case 'python':
      if (technology.includes('django')) {
        name = 'Django'
        icon = await readIconContent('./template/icons/django.svg')
      } else if (technology.includes('flask')) {
        name = 'Flask'
        icon = await readIconContent('./template/icons/flask.svg')
      } else {
        icon = await readIconContent('./template/icons/python.svg')
      }
      break
    case 'ruby':
      if (technology.includes('rails')) {
        name = 'Ruby on Rails'
        icon = await readIconContent('./template/icons/rails.svg')
      } else {
        icon = await readIconContent('./template/icons/ruby.svg')
      }
      break
    case 'scala':
      icon = await readIconContent('./template/icons/scala.svg')
      break
    case 'terraform':
      icon = await readIconContent('./template/icons/terraform.svg')
      break
    case 'json':
    case 'yaml':
    case 'generic':
    default:
      icon = await readIconContent('./template/icons/generic.svg')
  }
  return { icon, name }
}

function getVulnerabilityInfo (rule) {
  const { metadata } = (rule || {})
  const { owasp, cwe } = (metadata || {})
  if (owasp) {
    const owaspMessage = Array.isArray(owasp) ? owasp[0] : owasp
    let match = owaspMessage.match(/^(A0?[1-9]|10):\s(.+)$/)
    if (match) {
      return { type: match[1], title: match[2].trim() }
    } else {
      match = owaspMessage.match(/.*(A[01][0-9]:[0-9]{4})\s+(.*)$/)
      if (match) {
        let title = match[2].trim()
        if (title[0] === '-') {
          title = title.slice(1).trim()
        }
        return { type: match[1], title }
      }
    }
  }

  if (cwe) {
    const cweMessage = Array.isArray(cwe) ? cwe[0] : cwe
    const cweMatch = cweMessage.match(/(CWE-[\d]+):\s+(\w.*)$/)
    if (cweMatch) {
      return { type: cweMatch[1], title: cweMatch[2].trim() }
    }
  }

  return null
}

module.exports.readableLanguageName = readableLanguageName
module.exports.technologyInfo = technologyInfo
module.exports.getVulnerabilityInfo = getVulnerabilityInfo
