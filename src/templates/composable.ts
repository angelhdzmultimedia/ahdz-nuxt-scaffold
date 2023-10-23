import { defineTemplate } from '../utils'
import { capitalizeWords } from '../utils/capitalize'

const templates = {
  default: 
`export const [name] = async () => {
  return {
  
  }
}`
}

export default defineTemplate(async ({name}) => {
  const _name = capitalizeWords(name.split('-'))
  const composableName: string = `use${_name}`
  
  return {
    name: 'composable',
    path: `composables/${name}.ts`,
    data: {name: composableName},
    content: templates.default,
  }
})
