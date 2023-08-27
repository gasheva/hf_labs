const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const numberSigns = ['+', '-'];
const numberDelimiters = ['.'];

const hasValue = (value:string) => value?.length;

const isCharactersValid = (str:string, validCharacters:string[]) => [...str.toString()]
    .every((char) => validCharacters.includes(char));

const isDecimal = (value:string) => {
    const num = Number(value);
    return !Number.isNaN(parseFloat(`${num}`)) && Number.isFinite(num);
};

const decimalCheck = (value:string) => {
    const result = { status: true };
    if (!hasValue(value)) return result;
    const validCharacters = [...numbers, ...numberDelimiters];
    let numWithoutSign = value;
    if (numberSigns.includes(value[0])) {
        numWithoutSign = value.slice(1);
    }
    result.status = isDecimal(numWithoutSign)
        && isCharactersValid(numWithoutSign, validCharacters);
    return result;
}

export const useNumber = () => {
    return {decimalCheck}
}