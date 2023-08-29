import {defineStore} from 'pinia'
import type {Record} from "@/types/Record";

type State = {
    records: Record[]
}

const updateRecordsInPersistedState = (records: Record[]) => {
    localStorage.setItem('records', JSON.stringify(records))
}

const restoreRecordsFromPersistedState = (): Record[] => {
    const persistedState = localStorage.getItem('records')
    if (persistedState) {
        return JSON.parse(persistedState) as Record[]
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
            updateRecordsInPersistedState(this.records)
        },
        remove(id: string) {
            this.records = this.records.filter((record: Record) => record.id != id)
            updateRecordsInPersistedState(this.records)
        },
        updateRecord(id: string, record: Record) {
            this.records = this.records.map((r: Record) => r.id === id ? record : r)
            updateRecordsInPersistedState(this.records)
        }
    }
})
