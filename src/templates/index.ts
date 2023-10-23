export const templates = [
  'page',
  'store',
  'store:actions',
  'store:state',
  'server:api',
  'client:api',
  'composable',
  'component',
  'layout',
  'entity',
  'type',
  'plugin',
  'server:plugin',
  'middleware',
  'env'
] as const 

export type TemplateName = typeof templates[number]