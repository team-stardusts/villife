import { ScreenMessages } from "../types";

class Korean implements ScreenMessages.IMessagesByLanguage {
    readonly mainSM: ScreenMessages.MainScreensMessages = {
        home: {
            pageName: "홈",
        }
    };

    readonly authSM: ScreenMessages.AuthScreensMessages = {
        login: {
            pageName: "로그인",
        }
    };

    readonly splashSM: ScreenMessages.SplashScreensMessages = {
        pageName: "스플래쉬",
    };
}

export default Korean;