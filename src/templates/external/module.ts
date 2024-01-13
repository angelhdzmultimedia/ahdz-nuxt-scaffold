import { defineTemplate, prompt } from '../../utils'
import {ofetch} from 'ofetch'
export default defineTemplate( async ({name}) => {
  const {modules} = await ofetch('https://api.nuxt.com/modules')
  const selectedModules: {value: string[]} = await prompt({
    type: 'checkbox',
    name: 'value',
    message: 'Select modules',
    
    choices: [
      ...modules.map(({name, npm}: any) => ({name: npm, value: npm, key: npm})),
    ]
  })

  const sortedModules = selectedModules.value.sort().map(module => `pnpx nuxi@latest module add ${module}`).join(' && ')

  return {
    name: 'external:module',
    isExecutable: true,
    cmd: 'pwsh',
    args: [
      '-NoExit',
      '-Command', 
      `"${sortedModules}"`
    ]
  }
})

