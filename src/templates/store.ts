import { defineTemplate } from '../utils'
import { capitalizeWords } from '../utils/capitalize'

const templates = {
  default: `import {defineStore} from 'pinia'
  import * as state from './state'
  import * as actions from './actions'
        
  export const use[name]Store = defineStore('[id]', () => {
          
    return {
      ...state,
      ...actions
    }
  })
  `
}

export default defineTemplate( async ({name}) => {
  const _name = name.split('-')
  const storeName: string = capitalizeWords(_name)
  
  return {
      name: 'store',
      path: `stores/${name}/index.ts`,
      data: {name: storeName, id: _name},
      content: templates.default,
      onFileCreated({currentPath}) {
        return {
          name: 'store:actions',
          path: `stores/${name}/actions.ts`,
          content: `export {}`,
          onFileCreated({currentPath}) {
            return {
              name: 'store:state',
              path: `stores/${name}/state.ts`,
              content: `export {}`,
            }
          }
        }
      }
  }
})

