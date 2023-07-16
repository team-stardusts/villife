import IStringValidator, { StringRegularExpressions } from "./types";

class StringValidator implements IStringValidator {
    readonly regExps: StringRegularExpressions = {
        isNumber: /^\d+$/,
        //영문자로 시작하는 영문자 또는 숫자 5~10자
        id: /^[a-z]+[a-z0-9]{4,10}$/g,
        //8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
        password: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        phoneNumber: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
        // '-' 입력 시
        phoneNumberWithHypen: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
        email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
        number: /^[0-9]+$/,
        hasNumber: /\d/,
        hasAlpha: /[a-zA-Z]/,
        hasAlphaLargeCase: /[A-Z]/,
        hasSpecialChar: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
        // 공백 반드시 포함
        vehiclePlateNumber: /^(([0-9]{2,3})|([가-힣]{2,3}))[가-힣]{1}[\s\u3000]\d{4}$/,
        // 공백 포함 미포함 : /^(([0-9]{2,3})|([가-힣]{2,3}))[\s\u3000]?[가-힣]{1}[\s\u3000]?\d{4}$/,
    };

    public isNumber(text: string): boolean {
        return this.regExps.number.test(text);
    }

    // string length >= length
    public isLongerThan(text: string, length: number): boolean {
        return new RegExp(`^.{${length.toString()},}$`).test(text);
    }

    // string length <= length
    public isShorterThan(text: string, length: number): boolean {
        return new RegExp(`^.{0,${length.toString()}}$`).test(text);
    }

    public isLengthWithinRange(text: string, from: number, to: number): boolean {
        return this.isLongerThan(text, from) && this.isShorterThan(text, to);
    }

    public hasNumber(text: string): boolean {
        return this.regExps.hasNumber.test(text);
    }

    public hasAlpha(text: string): boolean {
        return this.regExps.hasAlpha.test(text);
    }

    public hasAlphaLargeCase(text: string): boolean {
        return this.regExps.hasAlphaLargeCase.test(text);
    }

    public hasSpecialChar(text: string): boolean {
        return this.regExps.hasSpecialChar.test(text);
    }

    public isID(id: string): boolean {
        return this.regExps.id.test(id);
    }

    public isPassword(password: string): boolean {
        return this.regExps.password.test(password);
    }

    public isPhoneNumber(phoneNumber: string, doesItContainHypen: boolean = true): boolean {
        if (doesItContainHypen) {
            return this.regExps.phoneNumberWithHypen.test(phoneNumber);
        } else {
            return this.regExps.phoneNumber.test(phoneNumber);
        }
    }

    public isEmail(email: string): boolean {
        return this.regExps.email.test(email);
    }

    public isCorrectVehiclePlateNumber(plateNumber: string): boolean {
        return this.regExps.vehiclePlateNumber.test(plateNumber);
    }
}

export default StringValidator;
