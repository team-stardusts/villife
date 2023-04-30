import { IMessages, Languages, MessagesByLanguage } from "./types";
import korean from "../../../../data/languages/kr.json";

class MultilingualMessage implements IMessages {
    readonly language: Languages;
    readonly messages: MessagesByLanguage;

    constructor(language: Languages) {
        this.language = language;

        switch (language) {
            case "korean":
                this.messages = korean;
            default:
                this.messages = korean;
        }
    }
}

export default MultilingualMessage;
