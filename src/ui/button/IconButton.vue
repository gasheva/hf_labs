<script lang="ts" setup>
interface IProps {
    color?: "white" | "gray" | "blue";
}

const props = withDefaults(defineProps<IProps>(), {
    color: "gray",
});

const emit = defineEmits<{
    (e: "onClick"): void;
}>();
</script>

<template>
  <button
    :class="`icon-button--${props.color}`"
    class="icon-button"
    @click="emit('onClick')"
  >
    <slot/>
  </button>
</template>

<style scoped>
.icon-button {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    outline: none;
    border: none;
    cursor: pointer;
}

.icon-button:hover {
    opacity: 0.8;
}

.icon-button--white {
    background-color: #ffffff;
    color: black;
}

.icon-button--gray {
    background-color: #808080;
    color: white;
}

.icon-button--blue {
    background-color: #4a72c4;
    color: white;
}
</style>
