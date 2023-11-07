export const hexToRGB = (hex: string, alpha: number) => {
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
        console.error("[insertCommaToNumber]", `'${num}' is not number.`);
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
