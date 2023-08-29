<script lang="ts" setup>
import {ref} from "vue";

interface IProps {
    value: string | number;
    label?: string;
}

const props = withDefaults(defineProps<IProps>(), {
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

const onChange = (e: Event) => {
    emit("update:value", (e.target as HTMLInputElement).value.trim());
};
</script>

<template>
  <div class="base-input">
    <label>{{ props.label }}</label>
    <input
      ref="inputRef"
      :value="props.value"
      @input="onChange"
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
