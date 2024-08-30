<script setup lang="ts">
import DarkModeHandler from "../darkModeHandler/darkModeHandler.vue";
const {signOut} = useAuth();
interface Props {
    hasAvatar?: string;
    username: string;
}

defineProps<Props>();

const items = [
    [
        {
            label: "sign out",
            icon: "i-heroicons-arrow-left-on-rectangle",
            click: () => signOut(),
        },
    ],
];


</script>
<template>
    <header
        aria-label="header section"
        class="py-3 border-b border-b-gray-200 dark:border-b-stone-700"
        role="banner"
    >
        <div
            aria-label="container"
            class="max-w-[700px] mx-auto px-3 flex justify-between items-center"
        >
            <h1
                role="heading"
                aria-level="1"
                aria-label="username"
                class="flex justify-center items-center gap-x-3"
            >
                <UIcon name="i-logos-nuxt-icon" class="w-10 h-10" />
                <span class="capitalize text-sm font-[800]">
                    <data :value="username" aria-label="username">{{
                        username
                    }}</data>
                </span>
            </h1>
            <div
                aria-label="controllers"
                class="flex justify-center items-center gap-x-3"
            >
                <DarkModeHandler />
                <UDropdown :items="items" :popper="{placement: 'bottom-start'}">
                    <UAvatar
                        alt="profile picture"
                        icon="i-solar-user-circle-bold-duotone"
                        :src="hasAvatar"
                        size="sm"
                    />
                </UDropdown>
            </div>
        </div>
    </header>

</template>
