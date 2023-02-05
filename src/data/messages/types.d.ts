declare export namespace ScreenMessages {
    interface IMessages {
        readonly language: Languages;
        readonly messages: IMessagesByLanguage;
    }

    type Languages = LANGUAGES.KR | LANGUAGES.EN;

    
    interface LANGUAGES {
        KR: "korean",
        EN: "english",
    };

    interface IMessagesByLanguage {
        readonly mainSM: MainScreensMessages;
        readonly authSM: AuthScreensMessages;
        readonly splashSM: SplashScreensMessages;
    }
    
    interface MainScreensMessages {
        home: {
            pageName: string;
        }
    }
    
    interface AuthScreensMessages {
        login: {
            pageName: string;
        }
    }
    
    interface SplashScreensMessages {
        pageName: string;
    }
}