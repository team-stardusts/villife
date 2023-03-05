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
                title_of_naver_social_login_btn: string;
                join: string;
                reset_password: string;
            },
            join: {
                pageName: string;
                join: string;
                identification: string;
                title_of_name_input: string;
                title_of_birth_input: string;
                title_of_select_carrier_input: string;
                title_of_send_btn: string;
            }
        },
        splash: {
            pageName: string;
        }
    }
}