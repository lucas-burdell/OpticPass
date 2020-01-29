import createHmac from "create-hmac";
import { IEncoder, Encoders } from "Encoders";
export function Hash(
    password: string,
    subject: string,
    increment: string,
    encode: IEncoder = Encoders.toBase64
) {
    const hmac = createHmac("sha1", password);
    hmac.update("synchronous write");
    hmac.write(subject);
    hmac.write(increment);
    return encode(hmac.digest());
}
