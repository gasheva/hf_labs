<script lang="ts" setup>
import BaseButton from "@/ui/button/BaseButton.vue";

interface IProps {
    id: string;
    temperatures: number[];
}

const {id, temperatures} = defineProps<IProps>();

const emit = defineEmits<{
    (e: "onDelete"): void;
    (e: "onChange"): void;
}>();
</script>

<template>
  <div class="record-item">
    <div class="record">
      <span class="column">
        <span>Id:</span>
        {{ id }}
      </span>
      <div class="column">
        Температура:
        <span
          v-for="(temperature, idx) in temperatures"
          :key="idx"
        >
          {{ temperature }}
        </span>
      </div>
    </div>
    <span class="record-item__buttons">
      <base-button
        label="Изменить"
        @on-click="emit('onChange')"
      />
      <base-button
        label="Удалить"
        @on-click="emit('onDelete')"
      />
    </span>
  </div>
</template>

<style scoped>
.record-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem 1.5rem;

    border: 1px solid #808080;
    border-radius: 8px;
}

.record-item__buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 100%;
}

@media (max-width: 480px) {
    .record-item__buttons {
        flex-direction: column;
        justify-content: space-between;
    }
}

.record {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: end;
    overflow-wrap: anywhere;
}
</style>
