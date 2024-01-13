import lodash from 'lodash'

const {camelCase} = lodash
import { defineTemplate } from '../utils'

const templates = {
  default: `import {
    defineNuxtModule, 
    createResolver,
  } from 'nuxt/kit'
  
} from 'nuxt/kit'

export interface ModuleOptions {

}

export const defineNuxtModule<ModuleOptions>({
  meta: {
    name: '{name}',
    configKey: '{id}',
  },
   setup(options, nuxt) {
     const resolver = createResolver(import.meta.url)
   }
})
`
}

export default defineTemplate( async ({name}) => {
  const _name = camelCase(name)
  
  return {
      name: 'module',
      path: `modules/${name}/index.ts`,
      data: {name: _name, id: _name},
      content: templates.default,
      
  }
})

