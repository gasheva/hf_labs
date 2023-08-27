const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const signs = ['+', '-'];
const delimiters = ['.'];

const hasValue = (value: string) => value?.length;

const isCharactersValid = (str: string, allowedCharacters: string[]) => [...str]
    .every((char) => allowedCharacters.includes(char));

const isDecimal = (value: string) => {
    const num = parseFloat(value);
    return !Number.isNaN(num) && Number.isFinite(num);
};

const checkNumber = (value: string) => {
    const result = {status: true};

    if (!hasValue(value)) return result;

    const validCharacters = [...digits, ...delimiters];
    let numWithoutSign = value;

    if (signs.includes(value[0])) {
        numWithoutSign = value.slice(1);
    }

    result.status = isDecimal(numWithoutSign)
        && isCharactersValid(numWithoutSign, validCharacters);
    return result;
}

export const useNumber = () => {
    return {checkNumber}
}