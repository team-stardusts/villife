declare export namespace ScreenMessages {
    interface IMessages {
        readonly language: Languages;
        readonly messages: MessagesByLanguage;
    }

    type Languages = LANGUAGES.KR | LANGUAGES.EN;

    type LANGUAGES = {
        KR: "korean",
        EN: "english",
    };

    type MessagesByLanguage = {
        main: {
            home: {
                pageName: string;
            },
        },
        auth: {
            login: {
                pageName: string;
                request_login: {
                    line_1: string;
                    line_2: string;
                }
                title_of_id_input: string;
                title_of_password_input: string;
                title_of_login_btn: string;
                join: string;
                reset_password: string;
            }
        },
        splash: {
            pageName: string;
        }
    }
}