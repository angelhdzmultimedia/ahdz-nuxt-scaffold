import { defineTemplate, prompt } from '../utils'
import { capitalizeWords } from '../utils/capitalize'

const templates = {
  default: 
`export class [name][extend] {
[super]
}`
}

export default defineTemplate(async ({name}) => {
  const entityName: string = capitalizeWords(capitalizeWords(name.split(' ')).split('-'))

  const withExtend = await prompt({
    name: 'value',
    type: 'confirm',
    message: 'With extends?',
  })
  
  let extendClass

  if (withExtend.value) {
     extendClass = await prompt({
      name: 'value',
      type: 'input',
      message: 'Extends Class?',
    })
  }
  
  const capitalizedExtends: string = withExtend.value ? capitalizeWords(capitalizeWords(extendClass?.value.split(' ')).split('-')) : ''
  const baseEntityName: string = withExtend.value ? capitalizedExtends : ''
  const superCall: string = 
` constructor() {
    super()
  }`

  return {
    name: 'entity',
    path: `server/entities/${name}.ts`,
    data: {
      name: entityName,
      extend: withExtend.value ? ` extends ${baseEntityName} ` : '',
      super: withExtend.value ? superCall : '',
    },
    content: templates.default 
  }
})
