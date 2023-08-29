<script lang="ts" setup>
import {useNumberInputValidation} from "@/composable/useNumberInputValidation";
import {nextTick, ref, watch} from "vue";
import BaseInput from "@/ui/input/BaseInput.vue";

interface IProps {
    value: string | number;
    label?: string;
    disabled?: boolean;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
    (e: "update:value", value: string): void;
}>();

const valueData = ref("");
const inputKey = ref(0);
const inputRef = ref<HTMLDivElement>();
const {validate} = useNumberInputValidation();

const rerenderInput = () => {
    inputKey.value++;
};

watch(
    () => props.value,
    (v) => {
        if (v === valueData.value) return;
        valueData.value = v.toString();
        rerenderInput();
    },
);

const onChange = (v: string) => {
    const targetValue = v.trim();
    const {status} = validate(targetValue);
    if (!status) {
        rerenderInput();
        nextTick(() => inputRef.value?.focus());
        return;
    }
    valueData.value = targetValue;
    emit("update:value", valueData.value);
};
</script>

<template>
  <base-input
    :key="inputKey"
    ref="inputRef"
    v-bind="props"
    :value="props.value"
    @update:value="onChange($event)"
  />
</template>

<style scoped></style>
