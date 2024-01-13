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
  'env',
  "module", 
  "external:module",
] as const 

export type TemplateName = typeof templates[number]