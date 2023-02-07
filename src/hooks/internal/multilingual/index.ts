import { ScreenMessages } from "./types";
import korean from "../../../data/languages/kr.json"

export const LANGUAGES: ScreenMessages.LANGUAGES = {
    KR: "korean",
    EN: "english",
}

class MultilingualMessage implements ScreenMessages.IMessages{
    readonly language: ScreenMessages.Languages;
    readonly messages: ScreenMessages.MessagesByLanguage;

    constructor(language: ScreenMessages.Languages) {
        this.language = language;
        
        switch (language) {
            case LANGUAGES.KR:
                this.messages = korean;
            default:
                this.messages = korean;
        }
    }
}

export default MultilingualMessage;