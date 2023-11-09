import { ColorValue } from "react-native";

export type CommonIconProps = {
    color?: ColorValue;
    size: number;
};

export type IconSeries =
    | "arrow-left"
    | "arrow-right"
    | "arrow-up"
    | "arrow-down"
    | "arrow-right-with-midline"
    | "apple-logo"
    | "building"
    | "calendar"
    | "car"
    | "charactor-book"
    | "check"
    | "clock-arrow"
    | "copy"
    | "home"
    | "magnifier"
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
    | "matrix"
    | "naver-logo"
    | "round-person"
    | "question-mark"
    | "three-dots-vertical"
    | "trash-can"
    | "filter-setting"
    | "villife";

export type ChildIconProps = CommonIconProps & {
    [key: string]: ColorValue | string | number | undefined;
};

type IconProps = CommonIconProps & {
    name: IconSeries;
};

export default IconProps;
