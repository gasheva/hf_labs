import type {Record} from "@/types/Record";

export const useRecord = () => {
    const isIdExisted = (id: string, records: Record[]) => {
        return records.find((record: Record) => record.id === id) !== undefined;
    }
    const isValid = (record: Record) => {
        try {
            validate(record)
            return {status: true, message: ''}
        } catch (e: Error) {
            return {status: false, message: e.message}
        }
    }

    const validate = (record: Record) => {
        if (record.id == null || record.id === '') {
            throw new Error('ID не может быть пустым')
        }
        if (!record.temperatures?.length) {
            throw new Error('Добавьте хотя бы одну температуру')
        }
    }

    const isTemperaturesValid = (temperatures: (number | string)[]) => {
        const invalidValue = temperatures.find(t => t === '' || isNaN(Number(t)));
        return invalidValue === undefined;
    }

    return {validate, isValid, isTemperaturesValid, isIdExisted}
}