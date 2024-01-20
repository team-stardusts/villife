import { insertHighpenIntoPhoneNumber } from "./global_function";

describe("[GLOBAL_FUNCTION]", () => {
    it("핸드폰 번호에 '-'을 넣는 것이 정상적으로 동작해여한다.", () => {
        expect(insertHighpenIntoPhoneNumber("01055555555")).toBe("010-5555-5555");
        expect(insertHighpenIntoPhoneNumber("0105555555")).toBe("010-555-5555");
        expect(insertHighpenIntoPhoneNumber("010-5555-5555")).toBe("010-5555-5555");
    });
});
