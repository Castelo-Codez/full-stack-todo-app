// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-08-26",
    devtools: {enabled: false},
    modules: ["@nuxt/ui", "@sidebase/nuxt-auth"],
    auth: {
        baseURL: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/auth`
            : undefined,
        globalAppMiddleware: true,
        provider: {
            type: "authjs",
            trustHost: false,
            defaultProvider: "github",
        },
        sessionRefresh: {
            enableOnWindowFocus: true,
        },
    },
    css: ["~/assets/css/main.css"],
});
