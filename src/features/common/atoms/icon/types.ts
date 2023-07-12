export type CommonIconProps = {
    color?: string;
    size: number;
};

export type IconSeries =
    | "arrow-left"
    | "arrow-right"
    | "arrow-up"
    | "arrow-down"
    | "arrow-right-with-midline"
    | "building"
    | "car"
    | "clock-arrow"
    | "home"
    | "menu"
    | "messenger"
    | "letter"
    | "list"
    | "parking-lot"
    | "person"
    | "people-round"
    | "person-round"
    | "phone"
    | "plus"
    | "pencil"
    | "round_person"
    | "speaker"
    | "wallet"
    | "letter"
    | "clock-arrow"
    | "menu"
    | "round-person"
    | "question-mark";

export type ChildIconProps = CommonIconProps & {
    [key: string]: string | number | undefined;
};

type IconProps = CommonIconProps & {
    name: IconSeries;
};

export default IconProps;
