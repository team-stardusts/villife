import StringValidator from "../../../../../libs/string_validator";

export const MODEL_MIN_LENGTH: number = 3;
export const MODEL_MAX_LENGTH: number = 15;
export const VISITING_PERPOSE_MIN_LENGTH: number = 5;
export const VISITING_PERPOSE_MAX_LENGTH: number = 30;

export class TextValidator {
    private static validator = new StringValidator();

    public static validatePlateNumber(plateNumber: string): boolean {
        return this.validator.isCorrectVehiclePlateNumber(plateNumber);
    }

    public static validateModel(model: string): boolean {
        const inCorrectLength: boolean = MODEL_MIN_LENGTH <= model.length && model.length <= MODEL_MAX_LENGTH;
        let hadSpecialChar: boolean = false;

        // 공백을 특수문자로 보기 때문에 아래와 같이 검사함
        model.split(" ").forEach((word) => {
            if (word === "" || this.validator.hasSpecialChar(word)) {
                hadSpecialChar = true;
            }
        });
        if (!hadSpecialChar && inCorrectLength) {
            return true;
        }
        return false;
    }

    public static validatePhoneNumber = (phoneNumber: string): boolean => {
        console.log(this.validator.isPhoneNumber(phoneNumber, true));
        return this.validator.isPhoneNumber(phoneNumber, true);
    };

    public static validateVisitingPerpose = (perpose: string): boolean => {
        return VISITING_PERPOSE_MIN_LENGTH <= perpose.length && perpose.length <= VISITING_PERPOSE_MAX_LENGTH;
    };
}
