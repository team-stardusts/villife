type BasicContent = {
    room_number: number;
    building_name: string;
    title: string;
    sub_title: string;
};

export type RequestCotent1001 = BasicContent & {
    user_id: string;
    user_name: string;
    phone_number: string;
};

export type RequestCotent2001or2002 = BasicContent & {
    vehicle_number: string;
    vehicle_model: string;
};
