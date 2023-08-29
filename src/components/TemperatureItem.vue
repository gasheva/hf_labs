<script setup lang="ts">

import IconButton from "@/ui/button/IconButton.vue";
import NumberInput from "@/ui/input/NumberInput.vue";
import type {Temperature} from "@/types/Temperature";
import {Modes} from "@/enums/Mode";

interface IProps {
    temperature: Temperature,
    mode: Modes,
}
defineProps<IProps>()

const emit = defineEmits<{
    (e:'delete', id: number): void,
    (e:'update', id: number, value:string): void,
    (e:'reset', id: number): void,
}>()

</script>

<template>
<div class="temperatures__item">
    <number-input
            :value="temperature.value"
            label="Температура:"
            @update:value="(val: string) => emit('update', temperature.id, val)"
    />
    <icon-button
            color="gray"
            @on-click="() => emit('delete', temperature.id)"
    >
        <template #default>
            <font-awesome-icon icon="fa-regular fa-trash-can" />
        </template>
    </icon-button>
    <icon-button
            v-if="temperature.isEdit && mode === Modes.EDIT"
            color="gray"
            label="о"
            @on-click="() => emit('reset', temperature.id)"
    >
        <template #default>
            <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" />
        </template>
    </icon-button>
</div>
</template>

<style scoped>

</style>