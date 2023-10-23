import {defineTemplate} from '../utils'
//import { capitalizeWords } from '../utils/capitalize'

export default defineTemplate(async ({name}) => {
  return {
    name: 'env',
    path: `.${name}`,
    content: `ENV_VARIABLE=Some value`,
  }
})
