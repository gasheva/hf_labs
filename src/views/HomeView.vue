<script lang="ts" setup>
import BaseButton from "@/ui/button/BaseButton.vue";
import RecordItem from "@/components/RecordItem.vue";
import {storeToRefs} from "pinia";
import {useRecordsStore} from "@/stores/records";
import BaseModal from "@/ui/modal/BaseModal.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";

const recordsStore = useRecordsStore();
const {records} = storeToRefs(recordsStore);
const {remove} = recordsStore;
const router = useRouter();

const modal = ref<{
    isOpen: boolean;
    data: {
        id: string
    }
}>({
    isOpen: false,
    data: {
        id: "",
    },
});

const onChange = (id: string) => {
    router.push({name: "manage", params: {id}});
};

const onDeleteConfirm = () => {
    remove(modal.value.data.id);
    modal.value.isOpen = false;
};

const onDelete = (id: string) => {
    modal.value.isOpen = true;
    modal.value.data.id = id;
};

const onAdd = () => {
    router.push({name: "manage"});
};
</script>

<template>
  <main class="home">
    <div class="buttons">
      <span>
        <BaseButton
          color="blue"
          label="Создать новую запись"
          type="info"
          @on-click="onAdd"
        />
      </span>
    </div>
    <div class="records">
      <transition-group name="fade">
        <RecordItem
          v-for="record in records"
          :id="record.id"
          :key="record.id"
          :temperatures="record.temperatures"
          @on-change="() => onChange(record.id)"
          @on-delete="() => onDelete(record.id)"
        />
      </transition-group>
      <base-modal
        v-model:is-open="modal.isOpen"
        text="Вы уверены, что хотите удалить показания?"
        @submit="onDeleteConfirm"
      />
    </div>
  </main>
</template>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.buttons {
    display: flex;
    justify-content: end;
}

.records {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
