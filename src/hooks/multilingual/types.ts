export interface IMessages {
    readonly language: Languages;
    readonly messages: MessagesByLanguage;
}

export type Languages = "korean" | "english";

export type MessagesByLanguage = {
    main: {
        home: {
            screen_title: string;
        };
        parking: {
            screen_title: string;
        };
        complaints: {
            screen_title: string;
        };
        payment: {
            screen_title: string;
        };
        mypage: {
            screen_title: string;
        };
    };
    auth: {
        login: {
            screen_title: string;
            request_login: {
                line_1: string;
                line_2: string;
            };
            title_of_id_input: string;
            title_of_password_input: string;
            title_of_login_btn: string;
            title_of_naver_social_login_btn: string;
            join: string;
            reset_password: string;
        };
        join: {
            screen_title: string;
            join: string;
            identification: string;
            title_of_name_input: string;
            title_of_birth_input: string;
            title_of_select_carrier_input: string;
            title_of_send_btn: string;
        };
        create_account: {
            screen_title: string;
            title: string;
            subtitle_1: string;
            subtitle_2: string;
            subtitle_3: string;
            name_input_title: string;
            name_input_placeholder: string;
            password_input_title: string;
            password_input_placeholder: string;
            confirm_password_input_title: string;
            confirm_password_input_placeholder: string;
            next_btn_title: string;
        };
        set_building: {
            screen_title: string;
            title: string;
            subtitle: string;
            adress_input_title: string;
            adress_input_placeholder: string;
            room_number_input_title: string;
            room_number_input_placeholder: string;
            car_number_input_title: string;
            car_number_input_placeholder: string;
            nickname_input_title: string;
            nickname_input_placeholder: string;
            next_btn_title: string;
            next_btn_title_when_change_next: string;
        };
        terms_of_service: {
            screen_title: string;
            title: string;
            subtitle: string;
            terms_of_service_all: string;
            terms_of_service_service: string;
            terms_of_service_Privacy: string;
        };
        welcome: {
            screen_title: string;
            title: string;
            subtitle_1: string;
            subtitle_2: string;
            next_btn_title: string;
        };
        permission_request: {
            screen_title: string;
            title: string;
            subtitle_1: string;
            phone_permission_1: string;
            phone_permission_2: string;
            address_book_1: string;
            address_book_2: string;
            subtitle_2: string;
            camera_permission_1: string;
            camera_permission_2: string;
            location_permission_1: string;
            location_permission_2: string;
            Additional_Information_1: string;
            Additional_Information_2: string;
            next_btn_title_1: string;
            next_btn_title_2: string;
        };
    };
    splash: {
        screen_title: string;
    };
    words: {
        screen_title: string;
        renter: string;
        landlord: string;
        siteAdmin: string;
        use_english: string;
        use_english_only_smallcase: string;
        use_number: string;
        use_special_char: string;
        tokens_for_4to10: string;
        tokens_for_8to20: string;
        matching_password: string;
    };
};
