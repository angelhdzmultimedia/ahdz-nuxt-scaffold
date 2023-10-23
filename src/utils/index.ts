import { Template } from '../types/template'
import inquirer from 'inquirer'

export function defineTemplate(callback: Template): Template {
  return callback
}

export function parseName(name: string): string {
  return name.split('/').at(-1)!
}


export const prompt = inquirer.prompt