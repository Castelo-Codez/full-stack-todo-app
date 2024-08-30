<script setup lang="ts">
import {z} from "zod";
import type {FormSubmitEvent} from "#ui/types";
import {$reactiveObj} from "../../../store/todos";
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const schema = z.object({
    todo: z.string().min(4, "At least must be 4 Characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
    todo: undefined,
});

interface Todo {
    title: string;
    createdAt: string;
    id: number;
    done: boolean;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const todo: Todo = {
        title: event.data.todo,
        createdAt: `${/\w+\s+\w+\s+\w+\s+\w+\s+\w+:\w+/gi.exec(
            `${new Date()}`
        )}`,
        id: Date.now(),
        done: false,
    };
    $fetch("/api/todos/addtodo", {
        body: JSON.stringify(todo),
        method: "POST",
        headers,
    });
    $reactiveObj.todos.push(todo);
    state.todo = undefined;
}
</script>
<template>
    <section aria-label="form handler section" class="mt-14">
        <div class="max-w-[700px] px-3 mx-auto flex justify-center items-center">
            <UForm
                :schema="schema"
                :state="state"
                class="space-y-4 md:space-y-0 w-full  flex  flex-col md:justify-between items-start md:flex-row"
                @submit="onSubmit"
            >
                <UFormGroup name="todo" class="w-full md:basis-[70%]">
                    <UInput v-model="state.todo" />
                </UFormGroup>
                <UButton
                    class="w-full md:basis-[20%] flex justify-center items-center"
                    icon="i-hugeicons-plus-sign-square"
                    size="md"
                    color="primary"
                    variant="solid"
                    label="Add todo"
                    type="submit"
                />
            </UForm>
        </div>
    </section>
</template>
