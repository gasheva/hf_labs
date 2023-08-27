<script lang="ts" setup>
import {ref} from "vue";

interface IProps {
    value: string | number;
    label?: string;
}

const {value, label} = withDefaults(defineProps<IProps>(), {
    label: "",
});

const emit = defineEmits<{
    (e: "update:value", value: string): void;
}>();

const inputRef = ref<HTMLInputElement>();

defineExpose({
    focus: () => {
        inputRef.value?.focus();
    },
});

const emitValue = (e: Event) => {
    emit("update:value", (e.target as HTMLInputElement).value.trim());
};
</script>

<template>
  <div class="base-input">
    <label>{{ label }}</label>
    <input
      ref="inputRef"
      :value="value"
      @input="emitValue"
    >
  </div>
</template>

<style scoped>
.base-input {
    display: flex;
    flex-direction: column;
    max-width: 200px;
}
</style>
