// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app : {
    head : {
      titleTemplate : ' - Digital Office',
      link: [
        {
          id: 'theme-css',
          rel: 'stylesheet',
          type: 'text/css',
          href: '/themes/lara-light-indigo/theme.css'
        }
      ]
    }
  },
  css: [
    'primeicons/primeicons.css'
    , 'primeflex/primeflex.scss'
    , 'primevue/resources/primevue.min.css'
    , '@/assets/styles.scss'
  ],
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    usePrimeVue: true,
    components: {
      include: '*'
    }
  }
})
