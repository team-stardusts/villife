export interface StringRegularExpressions {
    [key: string]: RegExp;
}

export default interface IStringValidator {
    readonly regExps: StringRegularExpressions;

    isNumber(text: string): boolean;
    hasNumber(text: string): boolean;
    hasAlpha(text: string): boolean;
    hasAlphaLargeCase(text: string): boolean;
    hasSpecialChar(text: string): boolean;
    isLongerThan(text: string, length: number): boolean;
    isShorterThan(text: string, length: number): boolean;
    isLengthWithinRange(text: string, from: number, to: number): boolean;
    isID(id: string): boolean;
    isPassword(password: string): boolean;
    isPhoneNumber(phoneNumber: string, doesItContainHypen: boolean): boolean;
    isEmail(email: string): boolean;
    isCorrectVehiclePlateNumber(plateNumber: string): boolean;
}
