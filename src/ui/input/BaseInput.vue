<script setup lang="ts">
import {ref} from "vue";

interface IProps {
    value: string | number;
    label?: string;
    disabled?: boolean;
}

// const {value, label} = defineProps<IProps>()

const {value, label, disabled} = withDefaults(defineProps<IProps>(), {
    disabled: false,
});

const emit = defineEmits<{
    (e: 'update:value', value: string): void
}>()

const inputRef = ref<HTMLInputElement>();

defineExpose({
    focus: () => {
        inputRef.value?.focus()
    }
})

const emitValue = (e: Event) => {
    emit('update:value', (e.target as HTMLInputElement).value.trim())
}

</script>

<template>
    <div class="base-input">
        <label>{{ label }}</label>
        <input :value="value" :disabled="disabled" @input="emitValue" ref="inputRef"/>
    </div>
</template>

<style scoped>
.base-input {
    display: flex;
    flex-direction: column;
    max-width: 200px;
}
</style>