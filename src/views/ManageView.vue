<script lang="ts" setup>
import {ref} from "vue";
import BaseButton from "@/ui/button/BaseButton.vue";
import {useRoute, useRouter} from "vue-router";
import {useRecordsStore} from "@/stores/records";
import {storeToRefs} from "pinia";
import type {Record} from "@/types/Record";
import {useRecord} from "@/composable/record/useRecord";
import BaseInput from "@/ui/input/BaseInput.vue";
import BaseModal from "@/ui/modal/BaseModal.vue";
import TemperatureItem from "@/components/TemperatureItem.vue";
import type {Temperature} from "@/types/Temperature";
import {Modes} from "@/enums/Mode";


const {
    isValid: isRecordValid,
    isTemperaturesValid,
    isIdExisted,
} = useRecord();
const recordsStore = useRecordsStore();
const {records} = storeToRefs(recordsStore);
const {add, updateRecord} = recordsStore;
const route = useRoute();
const router = useRouter();

const id = route.params.id;
const record = ref<Record>({
    id: "",
    temperatures: [],
});
const temperatures = ref<Temperature[]>([]);
const errorSaving = ref<string | null>(null);
const error = ref<string | null>(null);
const modal = ref<{
    isOpen: boolean;
    data: {
        text: string;
        callback: (id?: number) => void
    };
}>({
    isOpen: false,
    data: {
        text: "",
        callback: () => {
        },
    },
});
const mode = ref<Modes>(Modes.CREATE);
const wasChanged = ref<boolean>(false);

if (id) {
    const searchingRecord = records.value.find((r) => r.id == id);
    if (!searchingRecord) {
        error.value = "Запись не найдена";
    } else {
        mode.value = Modes.EDIT;
        record.value = searchingRecord;
        temperatures.value = record.value.temperatures.map(
            (t: number, idx: number) => ({
                id: idx,
                oldValue: t,
                value: t,
                isEdit: false,
            }),
        );
    }
}

const addTemperature = () => {
    temperatures.value.push({
        id: Date.now(),
        oldValue: 0,
        value: 0,
        isEdit: false,
    });
    wasChanged.value = true;
};

const onTemperatureUpdate = (id: number, val: string) => {
    const temperature = temperatures.value.find((t) => t.id === id);
    if (!temperature) {
        return;
    }
    temperature.value = val;
    temperature.isEdit = true;
    wasChanged.value = true;
};

const deleteTemperature = (id: number) => {
    const idx = temperatures.value.findIndex((t) => t.id === id);
    if (idx === -1) {
        return;
    }
    temperatures.value.splice(idx, 1);
    wasChanged.value = true;
};

const onTemperatureReset = (id: number) => {
    const temperature = temperatures.value.find((t) => t.id === id);
    if (!temperature) {
        return;
    }
    temperature.value = temperature.oldValue;
    temperature.isEdit = false;
};

const onIdUpdate = (val: string) => {
    record.value.id = val;
    wasChanged.value = true;
};

const onCancel = () => {
    modal.value.isOpen = true;
    modal.value.data.text =
        "Вы уверены, что хотите отменить несохраненные изменения и вернуться к списку?";
    modal.value.data.callback = () => router.push({name: "home"});
};

const onDelete = (id: number) => {
    modal.value.isOpen = true;
    modal.value.data.text = "Вы уверены, что хотите удалить запись?";
    modal.value.data.callback = () => deleteTemperature(id);
};

const onSave = () => {
    errorSaving.value = null;
    if (!isTemperaturesValid(temperatures.value.map((t) => t.value))) {
        errorSaving.value = "Проверьте правильность заполнения данных";
        return;
    }
    if (
        mode.value === Modes.CREATE &&
        isIdExisted(record.value.id, records.value)
    ) {
        errorSaving.value = "Id должен быть уникальным";
        return;
    }

    if (
        mode.value === Modes.EDIT &&
        isIdExisted(record.value.id, records.value) &&
        id !== record.value.id
    ) {
        errorSaving.value = "Id должен быть уникальным";
        return;
    }

    const savingRecord: Record = {
        id: record.value.id,
        temperatures: temperatures.value.map((t) => Number(t.value)),
    };

    const validation = isRecordValid(savingRecord);
    if (!validation.status) {
        errorSaving.value =
            validation.message || "Проверьте правильность заполнения данных";
        return;
    }
    record.value = savingRecord;
    if (mode.value === Modes.CREATE) {
        add(record.value);
        router.push({name: "home"});
    }
    if (mode.value === Modes.EDIT) {
        updateRecord(record.value.id, JSON.parse(JSON.stringify(record.value)));
        temperatures.value = temperatures.value.map((t) => ({
            ...t,
            oldValue: Number(t.value),
            isEdit: false,
        }));
    }
};
</script>

<template>
  <div>
    <div
      v-if="!error"
      class="manage-view"
    >
      <div class="record">
        <base-input
          v-if="record"
          :value="record.id"
          label="Id:"
          @update:value="onIdUpdate"
        />
        <div class="temperatures">
            <temperature-item  v-for="t in temperatures"
                               :key="t.id" :temperature="t" :mode="mode" @update="onTemperatureUpdate" @reset="onTemperatureReset" @delete="onDelete"/>

          <base-button
            class="button-add"
            color="gray"
            label="Добавить"
            @on-click="addTemperature"
          />
        </div>
      </div>

      <div class="footer">
        <div class="footer__buttons">
          <base-button
            color="gray"
            label="Отменить"
            @on-click="onCancel"
          />
          <base-button
            :disabled="!wasChanged"
            color="blue"
            label="Сохранить"
            @on-click="onSave"
          />
        </div>
        <span
          v-show="errorSaving"
          class="text text__error"
        >{{ errorSaving }}</span>
      </div>
    </div>

    <div
      v-else
      class="error text text__error"
    >
      {{ error }}
    </div>
    <base-modal
      v-model:is-open="modal.isOpen"
      :text="modal.data.text"
      @submit="modal.data.callback"
    />
  </div>
</template>

<style>
.manage-view {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;

    padding: 1rem;
    border: 1px solid;
    border-radius: 8px;
}

.record {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
}

@media (max-width: 600px) {
    .record {
        grid-template-columns: 1fr;
    }
}

.button-add {
    margin: 1rem auto 0 auto;
    max-width: 200px;
}

.temperatures {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.temperatures__item {
    display: flex;
    gap: 1rem;
}

.footer {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.5rem;
    width: 100%;
}

.footer__buttons {
    display: flex;
    gap: 1rem;
}

.error {
    text-align: center;
}
</style>
