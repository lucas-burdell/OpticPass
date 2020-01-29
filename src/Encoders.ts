const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = lowercaseLetters.toUpperCase();
const numbers = "1234567890";
const symbols = "!@#$%^&*()-_=+<>[]{},./|?'\";:`~";
const everything = String.prototype.concat(
    lowercaseLetters,
    uppercaseLetters,
    numbers,
    symbols
);

export type IEncoder = (buffer: Buffer) => string;

const toBase64: IEncoder = (buffer) => buffer.toString("base64");
const toPrintable: IEncoder = (buffer) => {
    const stringBuffer: string[] = [];
    buffer.forEach((x) => stringBuffer.push(everything[x % everything.length]));
    return stringBuffer.reduce((x, y) => x + y);
};

export const Encoders = {
    toBase64,
    toPrintable
};
