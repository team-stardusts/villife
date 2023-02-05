import { ScreenMessages } from "./types";
import Korean from "./languages/korean";

export const LANGUAGES: ScreenMessages.LANGUAGES = {
    KR: "korean",
    EN: "english",
}

class ScreenMessage implements ScreenMessages.IMessages{
    readonly language: ScreenMessages.Languages;
    readonly messages: ScreenMessages.IMessagesByLanguage;

    constructor(language: ScreenMessages.Languages) {
        this.language = language;
        
        switch (language) {
            case LANGUAGES.KR:
                this.messages = new Korean;
            default:
                this.messages = new Korean;
        }
    }
}

export default ScreenMessage;