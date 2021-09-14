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

module.exports.readableLanguageName = readableLanguageName
