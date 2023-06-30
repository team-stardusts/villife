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
            home: {
                screen_title: string;
                my_vehicle_info: string;
                villa_vehicle_info: string;
                register_guest: string;
                say_no_vehicle_info: string;
                induce_to_register_own_vehicle: string;
                modify_vehicle_info: string;
                request_to_modify_etda: string;
                request_to_modify_vehicle_info: string;
                inform_to_modify_vehicle_info: string;
            };
            register_vehicle: {
                screen_title: string;
                register_own_vehicle: string;
                request_input_vehicle_info: string;
                vehicle_plate_number_input_placeholder: string;
                vehicle_model_number_input_placeholder: string;
                invalid_plate_number_and_model: string;
                invalid_plate_number: string;
                invalid_model: string;
            };
            register_guest_vehicle: {
                screen_title: string;
                register_guest_vehicle: string;
                request_input_vehicle_info: string;
                vehicle_plate_number_input_placeholder: string;
                phone_number_input_placeholder: string;
                visiting_perpose_input_placeholder: string;
                invalid_input_value: string;
            };
        };
        complaint: {
            screen_title: string;
            renter_home_content_title: string;
            frequently_reported_complaints: string;
            frequently_reported_complaints_guide: string;
            complaints_received: string;
            complaints_in_progress: string;
            complaints_done: string;
            register: string;
            detail: string;
            received: string;
            inprogress: string;
            done: string;
            progress_status: string;
            edit_progress_status: string;
            edit_progress_status_guide: string;
            complaint_received_and_in_progress: string;
        };
        payment: {
            screen_title: string;
        };
        mypage: {
            screen_title: string;
        };
        noti: {
            screen_title: string;
            screen_modify_title: string;
            screen_register_title: string;
            delete_success: string;
            delete_error: string;
            modify: string;
            delete: string;
            required_reading: string;
            important_reading: string;
            reading: string;
            noti_sucess: string;
            noti_error: string;
            noti_editor_title: string;
            noti_editor_subtitle: string;
            noti_title_error: string;
            noti_important_modal: string;
            noti_general_modal: string;
        };
        approval: {
            screen_title: string;
            reject_success: string;
            reject_error: string;
            accept_success: string;
            accept_error: string;
            reject: string;
            accept: string;
            reject_title: string;
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
            invalid_login_data: {
                id: string;
                password: string;
            };
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
            subtitle: string;
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
        admin: string;
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
        cancle: string;
        delete: string;
        okay: string;
        register: string;
        reject: string;
        accept: string;
        edit: string;
        modified: string;
        modify: string;
        tenant: string;
        guest: string;
        etd: string;
        eta: string;
        plate_number: string;
        vehicle_info: string;
        vehicle_model: string;
        visiting_perpose: string;
        guest_phone_number: string;
    };
    navigation: {
        say_wait: string;
        ask_shutdown: string;
        building_not_selected: string;
    };
    boilerplate: {
        preparing_service: string;
    };
};
