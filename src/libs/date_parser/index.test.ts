import StardustDateParser from ".";

describe("STARDUST_DATE_PARSER", () => {
    const testDate = new Date("2023-12-01"); // 만약 시간을 지정하면 자동으로 -9시간을 해버림 (to GMT 0)
    const testDateNum = 1701388800;

    it("Date를 number로 바꾼다.", () => {
        expect(StardustDateParser.serialize(new Date())).toBeGreaterThan(0);
    });

    it("Number를 Date로 바꾼다.", () => {
        expect(StardustDateParser.deserialize(1701388800)).toBeInstanceOf(Date);
    });

    it("Date를 number로 바꾼 값은 예상한 값과 같다.", () => {
        const expected = testDateNum;
        expect(StardustDateParser.serialize(testDate)).toEqual(expected);
    });

    it("Number를 Date로 바꾼 값은 예상한 값과 같다.", () => {
        const expected = testDate;
        expect(StardustDateParser.deserialize(testDateNum)).toEqual(expected);
    });

    it("GMT를 변경하면 기대한 값이 나온다.", () => {
        const gmt9 = StardustDateParser.changeGMT(testDate, "kr");
        const expected = testDateNum + 60 * 60 * 9;

        expect(StardustDateParser.serialize(gmt9)).toEqual(expected);
    });

    it("GMT를 변경한 Number를 Deserialize 하면 예상한 Date가 생성된다.", () => {
        const dateNum = testDateNum + 60 * 60 * 9;
        const expected = StardustDateParser.changeGMT(testDate, "kr");

        expect(StardustDateParser.deserialize(dateNum)).toEqual(expected);
    });

    it("원하는 시간으로 변경할 수 있다.", () => {
        const changedDate = StardustDateParser.changeTime(testDate, { hours: 9, min: 30 }, "kr");
        const expected = StardustDateParser.changeGMT(new Date("2023-12-01T09:30:00"), "kr");

        expect(changedDate).toEqual(expected);
    });
});
