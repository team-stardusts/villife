import { useColorScheme } from "react-native";
import LightTheme from "./light";

export default function useAppTheme(): LightTheme {
    const theme = useColorScheme();

    switch (theme) {
        case "light":
            return new LightTheme();
        default:
            return new LightTheme();
    }
}
