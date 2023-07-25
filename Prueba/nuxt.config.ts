export default defineNuxtConfig({
  ssr: false,
  devtools: true,
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      }
    }
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@vue-macros/nuxt',
  ],

  imports: {
    dirs: ['stores/**']
  },

  pinia: {
    autoImports: ['defineStore']
  },

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
  
