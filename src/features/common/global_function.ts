export const hexToRGB = (hex: string, alpha?: number) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
};

export const insertCommaToNumber = (num: number): string => {
    if (typeof num !== "number") {
        console.warn("[insertCommaToNumber]", `'${num}' is not number.`);
        return "0";
    }

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const keep2Digit = (num: number) => {
    if (num < 10) {
        return "0" + num.toString();
    }

    return num.toString();
};

export function makeChunk<T>(data: T[] = [], size: number = 1): T[][] {
    const arr: T[][] = [];

    for (let i = 0; i < data.length; i += size) {
        arr.push(data.slice(i, i + size));
    }

    return arr;
}

export function insertHighpenIntoPhoneNumber(phoneNumber: string) {
    if (phoneNumber.includes("-")) return phoneNumber;
    if (!(phoneNumber.length === 10 || phoneNumber.length === 11)) {
        return phoneNumber;
    }

    const first = phoneNumber.substring(0, 3);
    const second = phoneNumber.substring(3, phoneNumber.length === 10 ? 6 : 7);
    const third = phoneNumber.substring(phoneNumber.length === 10 ? 6 : 7);

    return [first, second, third].join("-");
}

export function addSearchParamsToPathname(pathname: string, params: Record<string, string>): string {
    const searchParams = new URLSearchParams();

    // params 객체에서 키와 값을 추출하여 searchParams에 추가
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value);
    }

    // searchParams가 비어있지 않다면 문자열로 변환
    const queryString = searchParams.toString();

    // 새로운 경로 생성 (query string이 비어있지 않은 경우만 추가)
    return queryString ? `${pathname}?${queryString}` : pathname;
}
