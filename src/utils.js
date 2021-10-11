const { readFile } = require('fs').promises

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

async function languageIcon (lang) {
  if (!lang) {
    return ''
  }

  switch (String(lang).toLowerCase()) {
    case 'c': return await readFile('./templates/icons/clang.svg', { encoding: 'utf8' })
    case 'csharp': return await readFile('./templates/icons/csharp.svg', { encoding: 'utf8' })
    case 'go': return await readFile('./templates/icons/golang.svg', { encoding: 'utf8' })
    case 'java': return await readFile('./templates/icons/java.svg', { encoding: 'utf8' })
    case 'javascript': return await readFile('./templates/icons/javascript.svg', { encoding: 'utf8' })
    case 'typescript': return await readFile('./templates/icons/typescript.svg', { encoding: 'utf8' })
    case 'json':
    case 'kotlin':
    case 'ocaml':
    case 'php':
    case 'python':
    case 'ruby':
    case 'generic':
    default: return ''
  }
}

module.exports.readableLanguageName = readableLanguageName
module.exports.languageIcon = languageIcon
