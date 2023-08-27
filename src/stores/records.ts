import {defineStore} from 'pinia'
import type {Record} from "@/types/Record";

type State = {
    records: Record[]
}

const updateRecordsInPersistedState = (state: State) => {
    localStorage.setItem('records', JSON.stringify(state.records))
}

const restoreRecordsFromPersistedState = (): State => {
    const persistedState = localStorage.getItem('records')
    if (persistedState) {
        return JSON.parse(persistedState)
    }
    return []
}

export const useRecordsStore = defineStore('records', {
    state: (): State => ({
        records: restoreRecordsFromPersistedState(),
    }),

    actions: {
        add(record: Record) {
            this.records.push(record);
            updateRecordsInPersistedState(this.$state)
        },
        remove(id: string) {
            this.records = this.records.filter((record: Record) => record.id != id)
            updateRecordsInPersistedState(this.$state)
        },
        updateRecord(id: string, record: Record) {
            this.records = this.records.map((r: Record) => r.id === id ? record : r)
            updateRecordsInPersistedState(this.$state)
        }
    }
})
