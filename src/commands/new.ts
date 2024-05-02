import {prompt} from '../utils'
//import consola from 'consola'
import { resolve, join } from 'node:path'
import { spawn } from 'cross-spawn'
import { readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs'
//import { deletedDiff } from 'deep-object-diff'
import { rimrafSync} from 'rimraf'
import { defineCommand } from 'citty'
import {platform} from 'node:os'
import { SpawnOptionsWithoutStdio } from 'node:child_process'
import {loadNuxtConfig} from 'nuxt/kit'
import { writeNuxtManifest } from '../utils/nuxt'



const shell: 'pwsh' | 'bash' = platform() === 'win32' ? 'pwsh' : 'bash'

function asyncSpawn(command: string, args: readonly string[] | undefined, options: SpawnOptionsWithoutStdio | undefined): Promise<void>
function asyncSpawn(command: string, args: readonly string[] | undefined): Promise<void>
function asyncSpawn(command: string, options: SpawnOptionsWithoutStdio | undefined): Promise<void>
function asyncSpawn(command: string): Promise<void>
function asyncSpawn(...args: any[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const result = spawn(args[0], args[1], {
      ...args[2],
      stdio: 'inherit'
    })

    result.on('message', (data) => {
      console.log(data)
    })

    result.on('exit', () => resolve())
    result.on('error', error => reject(error))
  })
}

/* function asyncDeleteByExtension(extension: string, baseDir: string, callback?: (file: string) => void): Promise<void> {
  return new Promise((resolve) => {
    const deleteTestingFiles = (dir: string) => {
      const files = readdirSync(dir)
    
      files.forEach((file) => {
        const filePath = join(dir, file)
        const stats = statSync(filePath)
    
        if (stats.isDirectory()) {
          deleteTestingFiles(filePath)
        } else if (filePath.endsWith(extension)) {
          callback && callback(file)
          rmSync(filePath)
        }
      })
    }
    
    deleteTestingFiles(baseDir)
    resolve()
  })
} 
*/

function write(file: string, data: string) {
  writeFileSync(file, data)
}

function writeJson(file: string, data: any) {
  write(file, JSON.stringify(data, null, 2))
}

function read(file: string) {
  return readFileSync(file).toString()
}

function readJson(file: string) {
  return JSON.parse(read(file))
}

 async function main(args: any) {
  const name = await prompt({
    name: 'value',
    type: 'input',
    message: 'App Name?',
  })

  

  const manager = await prompt({
    name: 'value',
    type: 'list',
    choices: [
      {
        checked: true,
        name: 'pnpm',
        value: 'pnpm',
        key: 'pnpm',
      },

      {
        checked: true,
        name: 'bun',
        value: 'bun',
        key: 'bun',
      },

      {
        checked: true,
        name: 'npm',
        value: 'npm',
        key: 'npm',
      },

      {
        checked: true,
        name: 'yarn',
        value: 'yarn',
        key: 'yarn',
      },
    ]
  })

  type NodePackageManagerCommands = {
    execute: string
    add: string
    install: string
    update: string
    name: NodePackageManagerType
  }

  type NodePackageManagerType = 'pnpm' | 'npm' | 'yarn' | 'bun'
  type NodePackageManagers = { 
    [key in NodePackageManagerType]: NodePackageManagerCommands
  }

  const npm: NodePackageManagerCommands = ((): NodePackageManagers => ({
    npm: {
      execute: 'npx',
      add: 'add',
      install: 'install',
      update: 'update',
      name: 'npm'
    }, 

    pnpm: {
      execute: 'pnpx',
      add: 'add',
      install: 'install',
      update: 'update',
      name: 'pnpm'
    },

    bun: {
      execute: 'bunx',
      add: 'add',
      install: 'install',
      update: 'update',
      name: 'bun'
    },

    yarn: {
      execute: 'yarn dlx',
      add: 'add',
      install: 'install',
      update: 'upgrade',
      name: 'yarn'
    },
  }))()[manager.value as NodePackageManagerType]

  

  const framework = await prompt({
    name: 'value',
    message: 'App Framework?',
    type: 'list',
    choices: [
      {
        name: 'Nuxt (Frontend)',
        value: 'nuxt',
        key: 'nuxt'
      },
      {
        name: 'Nest (Backend)',
        value: 'nest',
        key: 'nest'
      },
      {
        name: 'Vue (Frontend)',
        value: 'vue',
        key: 'vue'
      },
    ]
  })

  // Nest

  if (framework.value === 'nest') {
    /* const database = await prompt({
      name: '',
      type: 'list',
      message: 'Database Library?',
      choices: [
        {
          name: 'none',
          key: 'none', 
          value: 'none'
        },
        {
          name: 'prisma',
          key: 'prisma',
          value: 'prisma',

        },
        {
          name: 'typeorm',
          key: 'typeorm',
          value: 'typeorm',
        },
        {
          name: 'firebase',
          key: 'firebase',
          value: 'firebase',
        },
        {
          name: 'supabase',
          key: 'supabase',
          value: 'supabase',
        },
        {
          name: 'sequelize',
          key: 'sequelize',
          value: 'sequelize',
        },
        {
          name: 'mongoose',
          key: 'mongoose',
          value: 'mongoose',
        },
        {
          name: 'typegoose',
          key: 'typegoose',
          value: 'typegoose',
        }
      ]
    }) */
    await asyncSpawn(shell, ['-c', 'nest', 'new', name.value, '--skip-install'])

    console.log('\nSetting up domains...')
    mkdirSync(join(name.value, 'src', 'domains'), {recursive: true})
    mkdirSync(join(name.value, 'src', 'app'), {recursive: true})
    mkdirSync(join(name.value, 'src', 'domains', 'auth'), {recursive: true})
    await asyncSpawn(shell, ['-c', 'nest', 'g', 'resource', 'auth'])
    

    const packageJson = readJson(resolve(name.value, 'package.json'))

    packageJson.dependencies ??= {}
    packageJson.devDependencies ??= {}
    packageJson.scripts = {
      ...packageJson.scripts,
      format: 'prettier --write \"src/**/*.ts\"',
      ['start:dev']: 'pnpm format && nest start --watch'
    }

    const dependencies: any[] = [
      '@nestjs/config',
      '@nestjs/websockets',
      '@nestjs/swagger',
    ]
  
    const devDependencies: any[] = [
      
    ]
    
    console.log('\nAdding development and production dependencies...')
  
    for (const value of dependencies) {
      packageJson.dependencies[value] = '*'
      console.log(`${value} production dependency added.`)
    }
  
    for (const value of devDependencies) {
      packageJson.devDependencies[value] = '*'
      console.log(`${value} development dependency added.`)
    }

    console.log('\nRemoving development and production dependencies...')

    const disposedDeps = [
      ...Object.keys(packageJson.devDependencies)
        .filter(item => item.includes('eslint'))
    ]

    for (const dep of disposedDeps) {
      delete packageJson.devDependencies[dep]
      console.log(`${dep} development dependency removed.`)
    }
  
    // Hardcoded versions
    console.log('Modifying settings...\n')
    /* console.log(`package.json settings modified:
     {
      scripts: {
        format,
        start:dev,
        clean
      }
     }
    `)

    console.log(`.prettierrc settings modified:
      {
        semi
      }
    `)

    console.log(`nest-cli.json settings modified: 
      {
        generateOptions: {
          spec
        }
      }
    `) */

    console.log('Creating files...\n')

    console.log('package.json created.\n')
  
    writeJson(resolve(name.value, 'package.json'), packageJson)
    

    const nestConfig = readJson(resolve(name.value, 'nest-cli.json'))

    nestConfig.generateOptions = {
      sourceRoot: 'src/app',
      spec: false
    }


    console.log('nest-cli.json created.\n')

  
    writeJson(resolve(name.value, 'nest-cli.json'), nestConfig) 

    let tsConfig = readJson(resolve(name.value, 'tsconfig.json'))

    if (tsConfig.compilerOptions === undefined) {
      tsConfig.compilerOptions = {}
    }

    if (tsConfig.compilerOptions.paths === undefined) {
      tsConfig.compilerOptions.paths = {}
    }

    tsConfig.compilerOptions.paths['~/*'] = ['src/*']

    tsConfig.compilerOptions.strict = true
    tsConfig.compilerOptions.strictNullChecks = true

    writeJson(resolve(name.value, 'tsconfig.json'), tsConfig)

    console.log('tsconfig.json created.\n')


    const prettierConfig = readJson(resolve(name.value, '.prettierrc'))
    prettierConfig.semi = false

    console.log('.prettierrc created.\n')

    writeJson(resolve(name.value, '.prettierrc'), prettierConfig) 

    console.log('Deleting files...\n')

    const disposedFiles = [
      '.eslintrc.js'
    ]

    for (const file of disposedFiles) {
      console.log(`${file} deleted.`)
      rimrafSync(resolve(name.value, file))
    }

    console.log('Deleting tests files...')
    /* await asyncDeleteByExtension('.spec.ts', resolve(name.value, 'src'), (file: string) => {
      console.log(`${file} deleted.`)
    }) */
    rimrafSync(`${name.value}/src/**/*.spec.ts`, {glob: true, filter(path: string, options) {
      console.log(`${path} deleted.`)
      return true
    }})

    rimrafSync(resolve(name.value, 'test'))
    console.log(`/test deleted.`)


    console.log('Installing dependencies...\n')

    await asyncSpawn(shell, ['-c', npm.name, npm.install], {
      cwd: name.value
    })

    /* console.log('Updating dependencies...\n')
    await asyncSpawn(shell, ['-c', npm.name, npm.update], {
      cwd: name.value
    }) */
  } 
  
  // Nuxt

  if (framework.value === 'nuxt') {
    const type = await prompt({
      name: 'value',
      type: 'list',
      message: 'Type?',
      choices: [
        {
          name: 'SPA',
          value: 'spa',
          key: 'spa',
          checked: true
        },
        {
          name: 'SSR',
          value: 'ssr',
          key: 'ssr',
        },
      ]
    })

  await asyncSpawn(shell, ['-c', `${npm.execute} nuxi@latest init ${name.value} --no-install --packageManager=${npm.name}`])
  console.log('\nUpdating Nuxt...\n')

  await asyncSpawn(shell, [`${npm.execute} nuxi@latest upgrade -f`], {
    cwd: name.value
  })

  const packageJson = readJson(resolve(name.value, 'package.json'))
  
  packageJson.dependencies ??= {}
  packageJson.devDependencies ??= {}
  packageJson.scripts = {
    ...packageJson.scripts
  }

  const dependencies: any[] = [
   
  ]

  const devDependencies: any[] = [
    
  ]

  console.log('\nAdding development and production dependencies...')

  for (const value of dependencies) {
    packageJson.dependencies[value] = '*'
    console.log(`${value} production dependency added.`)
  }

  for (const value of devDependencies) {
    packageJson.devDependencies[value] = '*'
    console.log(`${value} development dependency added.`)
  }

  // Hardcoded versions




  console.log('\nCreating files...\n')
  

  console.log('package.json created.\n')

  writeJson(resolve(name.value, 'package.json'), packageJson)

  console.log('nuxt.config.ts created.\n')
 
 
  write(resolve(name.value, 'nuxt.config.ts'), 
`export default defineNuxtConfig({
  ssr: ${type.value === 'ssr' ? 'true' : 'false'},
  devtools: { enabled: false },

  modules: [

  ],

  i18n: {
    langDir: 'lang',
    lazy: true,
    defaultLocale: 'en-US',
    locales: [
      {
        code: 'en-US',
        name: 'English (United States)',
        file: 'en-US.json',
      },
      {
        code: 'es-ES',
        name: 'Español (España)',
        file: 'es-ES.json',
      }
    ]
  },

  quasar: {
    iconSet: 'material-icons',
    plugins: [
      'Dark',
      'Notify',
      'Dialog'
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: [
        'fontawesome-v6',
        'material-icons',
        'mdi-v7',
        'ionicons-v4'
      ]
    }
  }
})
  
`)

  // Modules
  const _modules = [
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ]


console.log('\nAdding modules...\n')
for (const _module of _modules) {
  await asyncSpawn(shell, ['-c', `${npm.execute} nuxi@latest module add ${_module}`], {
    cwd: name.value
  })
}


 /*  const dirs = await inquirer.prompt({
    type: 'checkbox',
    message: 'Generate Directories?',
    name: 'value',
    choices: [
      'pages',
      'layouts',
      'middleware',
      'server/api',
      'server/middleware',
      'server/routes',
      'server/plugins',
      'plugins',
      'components', 
      'stores',
      'assets',
      'modules'
    ]
  })

  for (const dir of dirs.value) {
    const path: string = join(name.value, dir)
    if (!existsSync(path)) {
      mkdirSync(path)
    }
  } */

  const dirs = ['lang']

  for (const dir of dirs) {
    const path: string = join(name.value, dir)
    if (!existsSync(path)) {
      mkdirSync(path)
    }
  } 

  console.log('lang/en-US.json created.\n')

  writeJson(join(name.value, 'lang', 'en-US.json'), {
    message: 'Hello Locale'
  })

  console.log('lang/es-ES.json created.\n')

  writeJson(join(name.value,'lang', 'es-ES.json'), {
    message: 'Hola Localización'
  })

 
  console.log('Updating dependencies...\n')

  //await asyncSpawn('cmd', ['/c', npm.name, npm.update])
  }
  console.log('\nEnjoy your new application! 🔥')
}


export default defineCommand({
  meta: {
    name: 'new',
    description: 'Build nuxt and analyze production bundle (experimental)'
  },
  async run ({args}) {
    await main(args)
  }
})