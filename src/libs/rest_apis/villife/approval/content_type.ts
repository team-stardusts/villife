//스위치 케이스로 만들어라 content를

type BasicContent = {
    room_number: number;
    building_name: string;
    title: string;
    sub_title: string;
};

export type RequestCotent1001 = BasicContent & {
    user_id: string;
    user_name: string;
    user_phone_number: number;
};

export type RequestCotent2001 = BasicContent & {
    vehicle_number: string;
    vehicle_model: string;
};
