<script setup lang="ts">
definePageMeta({
    auth: {unauthenticatedOnly: true, navigateAuthenticatedTo: "/"},
});

import DarkModeHandler from "../components/ui/darkModeHandler/darkModeHandler.vue";

import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
});
const emailIsExistOrNot = ref(false);
const Invalidpassword = ref(false);
let isLoadingGithub = ref(false);
let isLoadingCredentials = ref(false);

type Schema = z.output<typeof schema>;

let state = reactive({
    email: "",
    password: "",
});
const {signIn} = useAuth();
async function onSubmit(event: FormSubmitEvent<Schema>) {
    emailIsExistOrNot.value = false;
    Invalidpassword.value = false;
    isLoadingCredentials.value = true;
    window.sessionStorage.setItem("temp-form-data", JSON.stringify(state));
    signIn("credentials", event.data);
}

function handleSignWithGithub() {
    isLoadingGithub.value = true;
    emailIsExistOrNot.value = false;
    Invalidpassword.value = false;
    signIn("github");
}

const $route = useRoute();
if ($route.query.error == "email is not found") {
    emailIsExistOrNot.value = true;
    onMounted(() => {
        let $sessionObj = window.sessionStorage.getItem("temp-form-data");
        state.email = JSON.parse($sessionObj as string).email;
    });
}

if ($route.query.error == "invalid password") {
    Invalidpassword.value = true;
    onMounted(() => {
        let $sessionObj = window.sessionStorage.getItem("temp-form-data");
        state.password = JSON.parse($sessionObj as string).password;
    });
}


</script>
<template>
    <div
        aria-label="login-page"
        class="flex justify-center items-center min-h-screen"
    >
        <section
            aria-label="form handler"
            class="min-w-[300px] min-h-[500px] gap-x-14 w-[900px] px-2 rounded-md border-b-gray-100 md:flex"
        >
            <section
                aria-label="sub section for image"
                class="hidden border dark:border-neutral-800 md:flex md:justify-center md:items-center basis-2/4 rounded-lg"
            >
                <UIcon
                    name="i-logos-nuxt-icon"
                    class="w-2/4 h-2/4 text-neutral-800"
                />
            </section>
            <section
                aria-label="sub section form"
                class="basis-2/4 flex flex-col justify-center items-center"
            >
                <div
                    aria-label="header-layout"
                    class="mb-10 flex justify-between w-full items-center"
                >
                    <a
                        href="/signup"
                        aria-label="go to login page"
                        class="capitalize underline text-sm"
                        title="sign up page"
                        >Do you want to create a new accout ?</a
                    >
                    <DarkModeHandler />
                </div>
                <UForm
                    :schema="schema"
                    :state="state"
                    class="space-y-4 w-full mb-3"
                    @submit="onSubmit"
                >
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="state.email" autocomplete="off" />
                        <p
                            v-if="emailIsExistOrNot"
                            class="mt-2 text-red-500 dark:text-red-400 text-sm"
                        >
                            this is email is not exist
                        </p>
                    </UFormGroup>

                    <UFormGroup label="Password" name="password">
                        <UInput v-model="state.password" type="password" />
                        <p
                            v-if="Invalidpassword"
                            class="mt-2 text-red-500 dark:text-red-400 text-sm"
                        >
                            Invalid Password
                        </p>
                    </UFormGroup>

                    <UButton
                        type="submit"
                        square
                        variant="solid"
                        block
                        :loading="isLoadingCredentials"
                        :disabled="isLoadingGithub"
                    >
                        Submit
                    </UButton>
                </UForm>
                <UDivider label="OR" class="mb-3" />
                <UButton
                    square
                    variant="solid"
                    class="gray"
                    block
                    type="submit"
                    @click="handleSignWithGithub"
                    :loading="isLoadingGithub"
                    :disabled="isLoadingCredentials"
                >
                    login with
                    <template #trailing>
                        <UIcon name="i-simple-icons-github" class="w-5 h-5" />
                    </template>
                </UButton>
            </section>
        </section>
    </div>
</template>
