const { readFile } = require('fs').promises
const { resolve } = require('path')

function readableLanguageName (lang) {
  if (!lang) {
    return ''
  }

  switch (String(lang).toLowerCase()) {
    case 'js':
    case 'javascript': return 'JavaScript'
    case 'ts':
    case 'typescript': return 'TypeScript'
    default: return lang
  }
}

async function readIconContent (iconPath) {
  return await readFile(resolve(__dirname, iconPath), { encoding: 'utf8' })
}

async function languageIcon (lang) {
  if (!lang) {
    return ''
  }

  switch (String(lang).toLowerCase()) {
    case 'bash': return await readIconContent('./template/icons/bash.svg')
    case 'c': return await readIconContent('./template/icons/clang.svg')
    case 'c#': return await readIconContent('./template/icons/csharp.svg')
    case 'dockerfile': return await readIconContent('./template/icons/docker.svg')
    case 'go': return await readIconContent('./template/icons/go.svg')
    case 'java': return await readIconContent('./template/icons/java.svg')
    case 'javascript': return await readIconContent('./template/icons/javascript.svg')
    case 'typescript': return await readIconContent('./template/icons/typescript.svg')
    case 'kotlin': return await readIconContent('./template/icons/kotlin.svg')
    case 'ocaml': return await readIconContent('./template/icons/ocaml.svg')
    case 'php': return await readIconContent('./template/icons/php.svg')
    case 'python': return await readIconContent('./template/icons/python.svg')
    case 'ruby': return await readIconContent('./template/icons/ruby.svg')
    case 'scala': return await readIconContent('./template/icons/scala.svg')
    case 'terraform': return await readIconContent('./template/icons/terraform.svg')
    case 'json':
    case 'yaml':
    case 'generic':
    default: return await readIconContent('./template/icons/generic.svg')
  }
}

module.exports.readableLanguageName = readableLanguageName
module.exports.languageIcon = languageIcon
