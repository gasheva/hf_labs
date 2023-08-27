<script lang="ts" setup>
interface IProps {
    label?: string;
    color?: "white" | "gray" | "blue";
    disabled?: boolean;
}

const {label, color} = withDefaults(defineProps<IProps>(), {
    color: "gray",
    label: "",
    disabled: false,
});

const emit = defineEmits<{
    (e: "onClick"): void;
}>();
</script>

<template>
  <button
    :class="[`base-button--${color}`, { 'base-button--disabled': disabled }]"
    :disabled="disabled"
    class="base-button"
    @click="emit('onClick')"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.base-button {
    display: block;
    width: 100%;
    max-height: 50px;
    padding: 10px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
}

.base-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.base-button:hover:not(.base-button--disabled) {
    opacity: 0.8;
}

.base-button--white {
    background-color: #ffffff;
    color: black;
}

.base-button--gray {
    background-color: #808080;
    color: white;
}

.base-button--blue {
    background-color: #4a72c4;
    color: white;
}
</style>
