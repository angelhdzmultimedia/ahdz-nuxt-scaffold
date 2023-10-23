import { defineTemplate, prompt } from '../../utils'

const templates = {
  default: `export default defineEventHandler(async (event) => {

})  
`
}

export default defineTemplate(async ({name}) => {
  const method: { value: string } = await prompt({
    name: 'value',
    type: 'list',
    message: 'Method?',
    choices: [
      {
        name: 'Post',
        value: 'post',
        key: 'post',
      },
      {
        name: 'Get',
        value: 'get',
        key: 'get',
      },
    ],
  })

  return {
    name: 'server:api',
    path: `server/api/${name}.${method.value}.ts`,
    content: templates.default,
  }
})
