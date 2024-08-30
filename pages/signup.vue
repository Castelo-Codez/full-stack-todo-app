<script setup lang="ts">
definePageMeta({
    auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: "/"},
});
import {z} from "zod";
import DarkModeHandler from "../components/ui/darkModeHandler/darkModeHandler.vue";
import type {FormSubmitEvent} from "#ui/types";
const emailIsAlreadyExist = ref(false);
let isLoading = ref(false);
const {signIn} = useAuth();
const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
    username: z
        .string()
        .min(7, "Must be at least 7 characters")
        .max(14, "Must be at most 14 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    email: undefined,
    password: undefined,
    username: undefined,
});

async function onSubmit(body: FormSubmitEvent<Schema>) {
    isLoading.value = !isLoading.value;
    emailIsAlreadyExist.value = false;

    let $req = await $fetch("/api/auth/signup", {
        method: "POST",
        body: body.data,
    })
        .then((res) => {
            isLoading.value = !isLoading.value;
            signIn("credentials", res);
        })
        .catch((error) => {
            isLoading.value = !isLoading.value;
            emailIsAlreadyExist.value = true;
        });
}
watch(state, (newState) => {
    emailIsAlreadyExist.value = false;
});
</script>
<template>
    <div
        aria-label="signup-page"
        class="flex justify-center flex-col items-center min-h-screen"
    >
        <div
            aria-label="header-layout"
            class="mb-5 flex justify-between px-5 min-w-[300px] w-[400px] items-center"
        >
            <a
                href="/login"
                aria-label="go to login page"
                class="capitalize underline text-sm"
                title="login page"
                >Already have an account ?</a
            >
            <DarkModeHandler />
        </div>

        <UForm
            :schema="schema"
            :state="state"
            class="space-y-4 px-5 min-w-[300px] w-[400px]"
            @submit="onSubmit"
        >
            <UFormGroup label="Username" name="username">
                <UInput v-model="state.username" type="text" />
            </UFormGroup>
            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" />
                <p
                    v-if="emailIsAlreadyExist"
                    class="mt-2 text-red-500 dark:text-red-400 text-sm"
                >
                    this email already exist
                </p>
            </UFormGroup>

            <UFormGroup label="Password" name="password">
                <UInput v-model="state.password" type="password" />
            </UFormGroup>

            <UButton type="submit" :loading="isLoading"> Submit </UButton>
        </UForm>
    </div>
</template>
