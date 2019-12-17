import createHmac from "create-hmac";
export function Hash(subject: string, increment: string) {
    const hmac = createHmac("sha1", "password");
    hmac.update("synchronous write");
    hmac.write(subject);
    hmac.write(increment);
    const result = hmac.digest().toString("base64");
    return result;
}
