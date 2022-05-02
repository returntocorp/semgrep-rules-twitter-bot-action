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
    default: return lang.charAt(0).toUpperCase() + lang.slice(1)
  }
}

module.exports.readableLanguageName = readableLanguageName
