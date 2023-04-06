export interface StringRegularExpressions {
    [key: string]: RegExp;
}

export default interface IStringValidator {
    readonly regExps: StringRegularExpressions;
    
    isID(id: string): boolean;
    isPassword(password: string): boolean;
    isPhoneNumber(phoneNumber: string, doesItContainHypen: boolean): boolean;
    isEmail(email: string): boolean;
}