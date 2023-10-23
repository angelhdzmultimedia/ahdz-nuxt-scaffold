import { TemplateOptions } from '../types/template-options'
import { defineTemplate, parseName, prompt } from '../utils'
import { capitalizeWords } from '../utils/capitalize'

const templates: any = {
  default: 
`<script lang="ts" setup>

</script>
      
<template>
  <main>
    <span>[name]</span>
  </main>
</template>`,
  layout: `<script lang="ts" setup>

</script>
    
<template>
  <NuxtLayout name="[layout]">
    <main>
      <span>[name]</span>
    </main>
  </NuxtLayout>
</template>`
}

export default defineTemplate(async ({name}: TemplateOptions) => {
  const _name: string = name.endsWith('/') ? 'index' : parseName(name)

  const withLayout: { value: string } = await prompt({
    name: 'value',
    type: 'list',
    message: 'Layout',
    choices: [
      {
        name: 'No Layout',
        key: 'noLayout',
        value: false,
      },

      {
        name: 'With Layout',
        key: 'withLayout',
        value: true,
      },
    ]
  })

  let layout: {value?: string | undefined} | undefined

  if (withLayout.value) {
    layout  = await prompt({
      name: 'value',
      type: 'input',
      message: 'Layout name?',
    })
  }

  const componentName: string = `${capitalizeWords(
    capitalizeWords(_name.split(' ')).split('-')
  )

} Component`

  const template: string | undefined = withLayout.value ? 'layout' : 'default'

  return {
    name: 'component',
    path: `components/${name}.vue`,
    data: {
      name: `${componentName}`,
      layout: layout?.value,
    },
    content: templates[template]
  }
})
