import { createResolver } from '@nuxt/kit';
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: '2024-07-09',
  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'it' },
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
      script: [
        {
          id: "cookieyes",
          type: "text/javascript",
          src: "https://cdn-cookieyes.com/client_data/6d8982d0ad7808769861e5cb/script.js",
          defer: true, // Add this if you want the script to load after the initial content is parsed
        },
        {
          id: "google-tag-manager",
          async: true,
          src: "https://www.googletagmanager.com/gtag/js?id=AW-10866766645",
        },
        {
          id: "google-tag-config",
          type: "text/javascript",
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10866766645');
          `,
        },
        {
          id: "conversion-tracking",
          type: "text/javascript",
          children: `
            gtag('event', 'conversion', {
                'send_to': 'AW-10866766645/af7gCP7Yq_8ZELXm1r0o',
                'value': 0.0,
                'currency': 'EUR',
                'transaction_id': ''
            });
          `,
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  experimental: {
    sharedPrerenderData: true,
  },

  plugins: [resolve('./app/plugins/init.ts')],

  components: [{ path: resolve('./app/components'), pathPrefix: false }],

  modules: ['woonuxt-settings', 'nuxt-font-loader', 'nuxt-graphql-client', '@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image', '@nuxtjs/i18n'],

  'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'http://localhost:4000/graphql',
        corsOptions: { mode: 'cors', credentials: 'include' },
      },
    },
  },

  alias: {
    '#constants': resolve('./app/constants'),
    '#woo': '../.nuxt/gql/default',
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./app/pages/${file}`) });
      };

      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue');
      addPage('categoria-prodotto-page', '/categoria-prodotto/:categorySlug', 'categoria-prodotto/[slug].vue');
      addPage('categoria-prodotto-page-pager', '/categoria-prodotto/:categorySlug/page/:pageNumber', 'categoria-prodotto/[slug].vue');
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue');
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue');
    },
  },

  nitro: {
    routeRules: {
      // '/': { prerender: true },
      '/products/**': { swr: 3600 },
      '/checkout/order-received/**': { ssr: false },
      '/order-summary/**': { ssr: false },
    },
  },

  // Multilingual support
  i18n: {
    locales: [
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
      // { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
    ],
    langDir: 'locales',
    defaultLocale: 'it_IT',
    strategy: 'no_prefix',
  },

  fontLoader: {
    autoImport: true,
    local: [
      {
        src: "/fonts/ABCDiatypeSemi-Mono-Regular.woff2",
        family: "D0",
        weight: "normal",
        display: "swap",
        style: "normal",
        fallback: "sans-serif",
      },
      {
        src: "/fonts/ABCDiatypeSemi-Mono-RegularItalic-Trial.woff2",
        family: "D1",
        weight: "normal",
        display: "swap",
        style: "italic",
        fallback: "sans-serif",
      },
    ],
  },
});
