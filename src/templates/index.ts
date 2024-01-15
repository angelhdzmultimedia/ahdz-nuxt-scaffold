export const templatesNames = [
  'page',
  'store',
  'storeActions',
  'storeState',
  'serverApi',
  'clientApi',
  'composable',
  'component',
  'layout',
  'entity',
  'type',
  'plugin',
  'serverPlugin',
  'middleware',
  'env',
  "module", 
  "externalModule",
] as const 

export type TemplateName = typeof templatesNames[number]

export { default as page } from './page'
export { default as store } from './store'
export { default as serverApi } from './server/api'
export { default as composable } from './composable'
export { default as component } from './component'
export { default as layout } from './layout'
export { default as entity } from './entity'
export { default as type } from './type'
export { default as plugin } from './plugin'
export { default as serverPlugin } from './server/plugin'
export { default as middleware } from './middleware'
export { default as env } from './env'
export { default as module } from './module'
export { default as externalModule } from './external/module'
