import IStringValidator, { StringRegularExpressions } from "./types";


class StringValidator implements IStringValidator{
    readonly regExps: StringRegularExpressions = {
        //영문자로 시작하는 영문자 또는 숫자 6~20자 
        id: /^[a-z]+[a-z0-9]{5,19}$/g,
        //8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
        password: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        phoneNumber: /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/,
        // '-' 입력 시
        phoneNumberWithHypen: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
        email: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    };

    public isID(id: string): boolean {
        return this.regExps.id.test(id);
    }

    public isPassword(password: string): boolean {
        return this.regExps.password.test(password);
    }

    public isPhoneNumber(phoneNumber: string, doesItContainHypen: boolean=true): boolean {
        if (doesItContainHypen) {
            return this.regExps.phoneNumberWithHypen.test(phoneNumber);
        }
        else {
            return this.regExps.phoneNumber.test(phoneNumber);
        }
    }

    public isEmail(email: string): boolean {
        return this.regExps.email.test(email);
    }
}

export default StringValidator;