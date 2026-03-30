import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    baseURL: '/sentec-butler/',
  },

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
      extensions: ['.vue'],
    },
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue'],
    },
  ],

  modules: ['@nuxt/fonts'],

  fonts: {
    families: [
      { name: 'Quicksand', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ],
    defaults: {
      weights: [300, 400, 500, 600, 700],
    },
  },

  devtools: { enabled: true },
  ssr: false,

  hooks: {
    'prerender:routes' ({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    }
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        'lucide-vue-next',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
        '@vueuse/core',
        '@tabler/icons-vue',
      ],
    },
  },
})
