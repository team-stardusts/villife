
export interface IMessages {
    readonly language: Languages;
    readonly messages: MessagesByLanguage;
}

export type Languages = "korean" | "english";


export type MessagesByLanguage = {
    main: {
        home: {
            page_name: string;
        },
    },
    auth: {
        login: {
            page_name: string;
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
            page_name: string;
            join: string;
            identification: string;
            title_of_name_input: string;
            title_of_birth_input: string;
            title_of_select_carrier_input: string;
            title_of_send_btn: string;
        },
        create_account: {
            page_name: string;
            title: string;
            subtitle_1: string;
            subtitle_2: string;
            name_input_title: string;
            name_input_placeholder: string;
            password_input_title: string;
            password_input_placeholder: string;
            confirm_password_input_title: string;
            confirm_password_input_placeholder: string;
            next_btn_title: string;
        },
        set_building: {
            page_name: string;
            title: string;
            subtitle: string;
            adress_input_title: string;
            adress_input_placeholder: string;
            room_number_input_title: string;
            room_number_input_placeholder: string;
            car_number_input_title: string;
            car_number_input_placeholder: string;
            nickname_input_title:string;
            nickname_input_placeholder: string;
            next_btn_title: string;
        }
    },
    splash: {
        page_name: string;
    }
}