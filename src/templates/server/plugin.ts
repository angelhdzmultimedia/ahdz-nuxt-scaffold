import { defineTemplate } from '../../utils'

const templates = {
  default: `export default defineNitroPlugin(async (nitroPlugin) => {
  
})  
`
}
export default defineTemplate(async ({name}) => {
  return {
    name: 'server:plugin',
    path: `server/plugins/${name}.ts`,
    content: templates.default
  }
})
