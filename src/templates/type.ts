import { defineTemplate, prompt } from '../utils'
import { capitalizeWords } from '../utils/capitalize'

const templates = {
  default: `export type [name] =[extend]{

}  
`
}

export default defineTemplate(async ({name}) => {
  const typeName: string = capitalizeWords(capitalizeWords(name.split(' ')).split('-'))
  
  const withExtend = await prompt({
    name: 'value',
    type: 'confirm',
    message: 'With interesection?',
  })
  let extendType = undefined
  if (withExtend.value) {
    extendType = await prompt({
      name: 'value',
      type: 'input',
      message: 'Interesection name?',
    })
  }
  
  const capitalizedExtend: string = withExtend.value ? capitalizeWords(
    capitalizeWords(
      extendType?.value.split(' ')
      ).split('-')
  ) : ''

  return {
    name: 'entity',
    path: `types/${name}.ts`,
    data: {
      name: typeName,
      extend: withExtend.value ? ` ${capitalizedExtend} & ` : '',
    },
    content: templates.default
  }
})
