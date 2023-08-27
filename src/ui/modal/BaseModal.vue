<script lang="ts" setup>
import BaseButton from "@/ui/button/BaseButton.vue";

interface IProps {
    isOpen: boolean;
    text: string;
}

const {text, isOpen} = defineProps<IProps>();

const emit = defineEmits<{
    (e: "update:isOpen", value: boolean): void;
    (e: "cancel"): void;
    (e: "submit"): void;
}>();

const hide = () => {
    emit("update:isOpen", false);
};

const onCancel = () => {
    hide();
    emit("cancel");
};

const onSubmit = () => {
    hide();
    emit("submit");
};
</script>

<template>
  <div>
    <Teleport to="body">
      <div
        v-show="isOpen"
        class="popup-base-background"
        @click="hide"
      />
      <div
        v-show="isOpen"
        class="popup-base"
        @click.prevent
      >
        <span class="popup-base__text">{{ text }}</span>
        <div class="popup-base__footer">
          <span class="popup-base__button">
            <base-button
              label="Отмена"
              @click="onCancel"
            />
          </span>
          <span class="popup-base__button">
            <base-button
              color="blue"
              label="Подтвердить"
              @click="onSubmit"
            />
          </span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.popup-base-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 60%;
}

.popup-base {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 600px;
    width: 100%;
    height: fit-content;
    padding: 1rem;
    background: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
}

@media (max-width: 720px) {
    .popup-base {
        max-width: 90%;
    }
}

.popup-base__footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 2rem;
    gap: 1rem;
}

.popup-base__button {
    max-width: 120px;
    width: 120px;
}
</style>
