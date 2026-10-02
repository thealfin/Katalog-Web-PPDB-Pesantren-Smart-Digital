// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  experimental: { appManifest: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    adminUsername: process.env.NUXT_ADMIN_USERNAME || 'psdadmin',
    adminPassword: process.env.NUXT_ADMIN_PASSWORD || 'ppdb2026secure!',
    sessionSecret: process.env.NUXT_SESSION_SECRET || 'psd-secret-key-2026',
  },

  app: {
    head: {
      title: 'PSD Web PPDB Katalog — Template Website Pesantren',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Katalog template website PPDB siap pakai untuk Pondok Pesantren. Pilih dari 17+ desain profesional, download ZIP, langsung pasang.',
        },
        { property: 'og:title', content: 'PSD Web PPDB Katalog' },
        {
          property: 'og:description',
          content: 'Template website pesantren profesional siap pakai',
        },
        { name: 'theme-color', content: '#166534' },
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/logo-psd.jpeg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        },
      ],
    },
  },

  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },
})
