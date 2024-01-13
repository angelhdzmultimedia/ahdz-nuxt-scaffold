import { defineCommand, type CommandDef } from 'citty'
import { prompt } from '../utils'

const _rDefault = (r: any) => (r.default || r) as Promise<CommandDef>

export const commands = {
  add: () => import('./add').then(_rDefault),
  new: () => import('./new').then(_rDefault),
  test: () => defineCommand({
    meta: {
      name: 'test',
      
      description: 'Test'
    },
    async run({args}) {
      const selectedModules: {value: string[]} = await prompt({
        name: 'value',
        type: 'checkbox', 
        choices: [
          {
            name: 'Pinia',
            value: 'pinia',
            key: 'pinia',
          },
          {
            name: 'Vue Router',
            value: 'vue-router',
            key: 'vue-router',
          }
        ]
      })
  
      console.log(JSON.stringify(selectedModules))
    }
  })
  }
