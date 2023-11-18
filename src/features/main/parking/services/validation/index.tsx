import StringValidator from "../../../../../libs/string_validator";

export const MODEL_MIN_LENGTH: number = 2;
export const MODEL_MAX_LENGTH: number = 15;
export const VISITING_PERPOSE_MIN_LENGTH: number = 5;
export const VISITING_PERPOSE_MAX_LENGTH: number = 30;

export class TextValidator {
    private static validator = new StringValidator();

    public static validatePieceOfPhoneNumber(index: number, text: string): boolean {
        switch (index) {
            case 0:
                return /^01(?:0|1|[6-9])$/.test(text);
            case 1:
                return /^(\d{3}|\d{4})$/.test(text);
            case 2:
                return /\d{4}$/.test(text);
            default:
                return false;
        }
    }

    public static validatePlateNumber(plateNumber: string): boolean {
        return this.validator.isCorrectVehiclePlateNumber(plateNumber);
    }

    public static validateModel(model: string): boolean {
        const inCorrectLength: boolean = MODEL_MIN_LENGTH <= model.length && model.length <= MODEL_MAX_LENGTH;
        let hadNoSpecialChar: boolean = true;

        // 공백을 특수문자로 보기 때문에 아래와 같이 검사함
        model.split(" ").forEach((word) => {
            if (word === "" || this.validator.hasSpecialChar(word)) {
                hadNoSpecialChar = false;
            }
        });

        return hadNoSpecialChar && inCorrectLength;
    }

    public static validatePhoneNumber = (phoneNumber: string): boolean => {
        return this.validator.isPhoneNumber(phoneNumber, true);
    };

    public static validateVisitingPerpose = (perpose: string): boolean => {
        return VISITING_PERPOSE_MIN_LENGTH <= perpose.length && perpose.length <= VISITING_PERPOSE_MAX_LENGTH;
    };
}
