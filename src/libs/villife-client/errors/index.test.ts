import VillifeError from ".";

describe("VILLIFE_ERROR", () => {
    it("Test VillifeError occurrence.", () => {
        const errMessage = "Hello, world!";

        const createError = (): never => {
            throw new VillifeError(errMessage);
        };

        expect(createError).toThrowError(VillifeError);
        expect(createError).toThrowError(errMessage);
        expect(createError).toThrowError(Error);
    });
});
