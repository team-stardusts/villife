import VillifeError from ".";
import { errorCode } from "./code";

describe("VILLIFE_ERROR", () => {
    it("Test VillifeError occurrence.", () => {
        const errMessage = "Hello, world!";

        const createError = (): never => {
            throw new VillifeError(errorCode.UnknownedError, errMessage);
        };

        expect(createError).toThrowError(VillifeError);
        expect(createError).toThrowError(errMessage);
        expect(createError).toThrowError(Error);
    });
});
