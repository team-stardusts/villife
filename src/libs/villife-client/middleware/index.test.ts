import { objectToCamel, objectToSnake } from "ts-case-convert";

describe("VILLIFE_CLIENT_MIDDLEWARES", () => {
    const testData = {
        snakeCase: {
            first_name: "John",
            last_name: "Doe",
            age: 28,
            address: {
                jiben_address: "경기도 수원시 가가구 나나동 10-11",
                road_address: "경기도 수원시 가가구 다다로 100-1",
            },
            assets: [
                {
                    asset_name: "붕붕이",
                    asset_type: "car",
                },
            ],
        },
        camelCase: {
            firstName: "John",
            lastName: "Doe",
            age: 28,
            address: {
                jibenAddress: "경기도 수원시 가가구 나나동 10-11",
                roadAddress: "경기도 수원시 가가구 다다로 100-1",
            },
            assets: [
                {
                    assetName: "붕붕이",
                    assetType: "car",
                },
            ],
        },
    };

    it.only("Snake case의 Object가 Camel case로 변환되어야 한다.", () => {
        expect(objectToCamel(testData.snakeCase)).toEqual(testData.camelCase);
    });

    it.only("Camel case의 Object가 Snake case로 변환되어야 한다.", () => {
        expect(objectToSnake(testData.camelCase)).toEqual(testData.snakeCase);
    });
});
