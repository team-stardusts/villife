import ScreenMessage from "../../data/messages";
import { ScreenMessages } from "../../data/messages/types";

export default function useScreenMessage(language: ScreenMessages.Languages) {
    return new ScreenMessage(language);
};