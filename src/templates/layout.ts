
import { defineTemplate,  prompt } from '../utils'

const templates = {
  default: `<script lang="ts" setup>

</script>

<template>
  <main>
    <span>[name]</span>
    <slot/>
  </main>
</template>

<style scoped>

</style>
`,
  quasar: `<script lang="ts" setup>
import {useQuasar} from 'quasar'
const $q = useQuasar()
</script>

<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-btn icon="home" to="/"/>
        <q-toolbar-title>[name]</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <slot/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

</style>
`
}

export default defineTemplate(async function ({name}) {
  const layout: { value: string } = await prompt({
    name: 'value',
    type: 'list',
    choices: [
      {
        name: 'Default',
        value: 'default',
        key: 'default',
      },
      {
        name: 'Quasar',
        value: 'quasar',
        key: 'quasar',
      },
    ],
  })

  const layoutName: string = `${name[0].toUpperCase()}${name
    .substring(1)
    .toLowerCase()} Layout`

  return {
    name: 'layout',
    path: `layouts/${name}.vue`,
    content: templates[layout.value as keyof typeof templates],
    data: { 
      name: layoutName,
    }
  }
})
