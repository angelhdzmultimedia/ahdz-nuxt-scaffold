import lodash from 'lodash'
const {capitalize} = lodash
export function capitalizeWords(words: string[]): string {
  let _text: string = ''

  for (const word of words) {
    _text += capitalize(word)
  }

  return _text
}

