export function capitalizeWords(words: string[]): string {
  let _text: string = ''

  for (const word of words) {
    _text += capitalize(word)
  }

  return _text
}

export function capitalize(text: string): string {
  return `${text[0].toUpperCase()}${text.substring(1).toLowerCase()}`
}
