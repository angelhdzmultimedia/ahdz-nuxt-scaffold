
import { templates } from '../templates'
import { TemplateData } from '../types/template-data'
import { Template } from '../types/template'
import { capitalizeWords } from '../utils/capitalize'
import { generateTemplate } from '../utils/generate-file'
import {prompt} from '../utils'
import consola from 'consola'
import { resolve } from 'path'
import { loadNuxtConfig } from '@nuxt/kit'
import { defineCommand } from 'citty'
import { spawn } from 'node:child_process'
import { spawnSync } from 'child_process'


 async function main(args: any) {
  const cwd = resolve(args.cwd || '.')
  const config = await loadNuxtConfig({ cwd })
  const template: { value: string } = await prompt({
    name: 'value',
    type: 'rawlist',
    message: 'What to scaffold?',
    choices: [
      ...templates.filter(item => (item !== 'store:actions' && item !== 'store:state')).map(item => ({
        name: capitalizeWords(item.split(':')),
        key: item,
        value: item
      })),
      {
        name: '[Exit]',
        key: 'exit',
        value: 'exit'
      }
    ],
  })

  console.log(`Selected Template: ${template.value}`)

  if (template.value === 'exit') {
    console.log('Thanks for using nuxt-scaffold! console.log(\'Have fun!\') ✌😊')
    return
  }

  const name = await prompt({
    name: 'value',
    type: 'input',
    message: 'Name?',
  })

  const foundTemplate: string = templates.find(item => item === template.value)!

  if (templates.some(item => item === foundTemplate)) {
    const _templateName: string = foundTemplate.split(':').join('/')
    const _module: { default: Template } = await import(`../templates/${_templateName}`)
    const _template: Template = _module.default
    const _templateBaseDir: string = resolve(cwd, 'templates', _templateName)
    const _templateData: TemplateData = await _template.apply(undefined, [{name: name.value, baseDir: _templateBaseDir}])
    
    if (_templateData.content) {
      await generateTemplate(_templateData, _templateBaseDir)
    }

    const {isExecutable, cmd, args} = _templateData 

    if (isExecutable) {
      const result = spawn(cmd!, args ?? [], {
        stdio: 'inherit',
        cwd: process.cwd(),
        shell: true

      })
      let _resolve: any 
      const promise = new Promise<void>((resolve, reject) => _resolve = resolve)
      result.on('exit', () => _resolve())
      result.on('error', console.error)
      await promise
    }
    
  } else {
    consola.error('Scaffold template not valid.')
    consola.info(`The available scaffold templates are: \n${templates.map(item => `\n- item`)}`)
  }

  // Recursion
  await main(args)
}



export default defineCommand({
  meta: {
    name: 'add',
    
    description: 'Build nuxt and analyze production bundle (experimental)'
  },
  async run({args}) {
    await main(args)
  }
})