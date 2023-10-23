import { TemplateData } from './template-data'
import { type TemplateOptions } from './template-options'

export type Template = (options: TemplateOptions) => Promise<TemplateData> | TemplateData