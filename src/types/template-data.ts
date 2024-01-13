import { TemplateName } from '../templates'

export type DynamicTemplate = {data?: any, name: string}

export type TemplateData = {
  content?: string
  data?: any,
  name: TemplateName
  nameReplace?: string
  path?: string
  isExecutable?: boolean
  cmd?: string 
  args?: string[]
  onFileCreated?: (event: {currentPath: string}) => TemplateData
}
