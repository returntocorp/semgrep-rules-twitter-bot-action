function readableLanguageName (lang) {
  if (!lang) {
    return ''
  }

  switch (String(lang).toLowerCase()) {
    case 'js':
    case 'javascript': return 'JavaScript'
    case 'ts':
    case 'typescript': return 'TypeScript'
    case 'kt': return 'Kotlin'
    default: return lang
  }
}

module.exports.readableLanguageName = readableLanguageName
