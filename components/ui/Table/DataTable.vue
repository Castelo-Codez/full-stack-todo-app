<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
import {$reactiveObj} from "../store/todos";
const columns = [
    {
        key: "title",
        label: "Todo Title",
        sortable: true,
    },
    {
        key: "id",
        label: "ID",
        sortable: true,
    },
    {
        key: "createdAt",
        label: "Date",
        sortable: true,
    },
    {
        key: "done",
        label: "Done",
        sortable: true,
    },
];

const selectedColumns = ref([...columns]);

const $Porps = defineProps<{
    todos: [];
}>();

const page = ref(1);
const pageCount = 5;

const $todos = computed(() => {
    return $Porps.todos.slice(
        (page.value - 1) * pageCount,
        page.value * pageCount
    );
});

function $changeStatus(id: number, status: boolean) {
    $fetch("/api/todos/updatetodo", {
        body: {id: id, status: status},
        headers,
        method: "POST",
    });
}
function deleteOne(id: number) {
    $reactiveObj.todos = $reactiveObj.todos.filter((el: any) => el.id !== id);
    $fetch("/api/todos/deletetodo", {
        body: {id: id},
        headers,
        method: "POST",
    });
}
</script>
<template>
    <section
        aria-label="data of todos"
        class="max-w-[700px] px-3 mx-auto mt-10"
    >
        <div class="flex py-5 border-b border-gray-200 dark:border-gray-700">
            <USelectMenu
                v-model="selectedColumns"
                :options="columns"
                multiple
                placeholder="Columns"
            />
        </div>

        <UTable
            :columns="selectedColumns"
            class="font-[600] text-sm"
            :rows="$todos"
        >
            <template #expand="{row}">
                <div class="p-4 flex items-center justify-between">
                    <UToggle
                        size="md"
                        off-icon="i-heroicons-x-mark-20-solid"
                        v-model="row.done"
                        @change="$changeStatus(row.id, row.done)"
                    />
                    <UButton
                        color="red"
                        class="mr-[6%] md:mr-[7%]"
                        @click="deleteOne(row.id)"
                    >
                        <template #trailing>
                            <UIcon name="i-ion-trash-outline" class="w-4 h-4" />
                        </template>
                    </UButton>
                </div> </template
        ></UTable>
        <div
            class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
        >
            <UPagination
                v-model="page"
                :page-count="pageCount"
                :total="$props.todos.length"
            />
        </div>
    </section>
</template>
