<script setup lang="ts">
useHead({
    title: "Todo App",
    meta: [
        {name: "description", content: "todo app with nuxt"},
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
        },
        {
            charset: "utf-8",
        },
    ],
});
</script>

<template>
    <main aria-label="app" id="app" role="main">
        <NuxtPage />
    </main>
</template>
