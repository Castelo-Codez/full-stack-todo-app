<script setup lang="ts">
import AppHeader from "../components/ui/Header/AppHeader.vue";
import TodoForm from "../components/ui/TodoForm/TodoForm.vue";
import {$reactiveObj} from "../store/todos";

import DataTable from "../components/ui/Table/DataTable.vue";
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const res = await useFetch("/api/users/getCurrentUser", {headers});
const data: any = res.data;
$reactiveObj.todos = data.value.todos;
</script>
<template>
    <div aria-label="homepage">
        <AppHeader
            v-if="data"
            :username="data.username"
            :has-avatar="data.avatar"
        />
        <TodoForm />
        <DataTable :todos="$reactiveObj.todos" />
    </div>
</template>
