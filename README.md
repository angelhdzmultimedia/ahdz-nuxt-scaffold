# AngelHdz Nuxt Scaffold

`ahdz/nuxt-scaffold`

A series of Nuxt extra tools for a smooth and fast DX.

### [ Usage ]

#### Execution Method

**pnpm:**
`pnpm dlx https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold <command>`

**npm:**
`npx https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold <command>`

**yarn:**
`yarn dlx https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold <command>`

**bun:**
`bunx https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold <command>`

#### Installation Method

**pnpm:**
`pnpm add -g https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold` and execute `scaffold <command>`.

**npm:**
`npm add -g https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold` and execute `scaffold <command>`.

**yarn:**
`yarn global add https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold` and execute `scaffold <command>`.

**bun:**
`bun add -g @https://github.com/angelhdzmultimedia/ahdz-nuxt-scaffold` and execute `scaffold <command>`.

### [ Commands ]

- `new`
- `add`

### [ Description ]

This package is inspired by Nuxt's nuxi tool, but using inquirer's command line prompts to generate Nuxt (frontend), NestJS (backend), and Vue (frontend) projects, and the scaffolding of each.

Scaffolding works currently only for Nuxt, but the other projects types
will eventually have their own.

Nuxt counts with the following scaffolding types:

    - Pages - with layout
    - Layouts - default, quasar, vuetify, and more
    - Plugins
    - Composables
    - Pinia Stores - with separate files for actions and state
    - Middleware
    - Server Plugins
    - Modules - (Coming soon)
    - Server APIs - with HTTP methods
    - Components
    - Entities (classes) - with extends
    - Types - with intersection
    - Client APIs
    - Environment Variables Files - .env or custom name

This is a work in progress, but feel free to submit your suggestions, report issues, or contribute.
