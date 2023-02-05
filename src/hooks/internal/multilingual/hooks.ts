import MultilingualMessage from ".";
import { ScreenMessages } from "./types";

export default function useScreenMessage(language: ScreenMessages.Languages) {
    return new MultilingualMessage(language);
};