import { existsSync, readFileSync } from 'node:fs'
import {writeFile} from 'node:fs/promises'
import {mkdir} from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { TemplateData } from '../types/template-data'
import {loadNuxtConfig} from '@nuxt/kit'
import consola from 'consola'
import { NuxtOptions } from '@nuxt/schema'

export async function generateTemplate(templateData: TemplateData, baseDir: string): Promise<void> {
  const {content, name, path, onFileCreated, data} = templateData

  const cwd = resolve(process.cwd() || '.')
  const config: NuxtOptions = await loadNuxtConfig({cwd})
  const srcDir: string = config.srcDir
  const _path: string = resolve(srcDir, path)
  const parentDir: string = dirname(_path)

  if (!existsSync(parentDir)) {
    consola.info('Creating directory', parentDir)
    if (name === 'page') {
      consola.info('This enables vue-router functionality!')
    }
    if (name === 'store') {
      consola.info('This enables pinia store functionality!')
    }
    await mkdir(parentDir, { recursive: true })
  }

  let _content: string = content
    
  if (data) {
    for (const key in data) {
      _content = _content.split(`[${key}]`).join(data[key])
    }
  }

  await writeFile(path, _content.trim() + '\n')

  if (onFileCreated) {
    const templateData: TemplateData = await onFileCreated({currentPath: _path})
    templateData && await generateTemplate(templateData, baseDir)
  }
}

