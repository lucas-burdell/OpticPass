import { Encoders } from "Encoders";

describe("Encoder", () => {
    test("Printable works", () => {
        const result = Encoders.toPrintable(
            Buffer.from(
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}\\|;:\"'<>,.?/`~"
            )
        );

        expect(result).toBe(
            "efghijklmnopqrstuvwxyzABCD$%^&*()-_=+<>[]{},./|?'\";:WXYZ123456H#JKLbMQOPTc0R`aEG~F87IN9!SU@VdH"
        );
    });
});
