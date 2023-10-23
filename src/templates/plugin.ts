import { defineTemplate, prompt } from '../utils'

const templates = {
  default: `export default defineNuxtPlugin((nuxtApp) => {
    
})`
}

export default defineTemplate(async ({name}) => {
  const type: { value: string } = await prompt({
    name: 'value',
    type: 'list',
    message: 'Type?',
    choices: [
      {
        name: 'Client',
        value: 'client',
        key: 'client',
      },
      {
        name: 'Server',
        value: 'server',
        key: 'server',
      },
      {
        name: 'Both',
        value: 'both',
        key: 'both',
      },
    ],
  })

  return {
    name: 'plugin',
    path: `plugins/${name}${type.value === 'both' ? '' : `.${type.value}`}.ts`,
    content: templates.default
  }
})
