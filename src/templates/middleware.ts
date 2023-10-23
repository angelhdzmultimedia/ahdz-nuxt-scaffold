import { defineTemplate, prompt } from '../utils'
import { capitalizeWords } from '../utils/capitalize'

const templates = {
  default: `export default defineNuxtRouteMiddleware(async ({path}) => {
    
})
  `
}

export default defineTemplate(async ({name}) => {
  const isGlobal: { value: string } = await prompt({
    name: 'value',
    type: 'confirm',
    message: 'Is global?',  
  })

  const globalPrefix: string = isGlobal.value ? `.global` : ''
  const _name = name.split('-')
  const storeName: string = capitalizeWords(_name)

  return {
    name: 'middleware',
    path: `middleware/${name}${globalPrefix}.ts`,
    data: {name: storeName, id: _name},
    content: templates.default
  }
})

