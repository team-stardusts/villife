export type CommonIconProps = {
    color?: string;
    size: number;
};

export type IconSeries =
    | "home"
    | "car"
    | "person"
    | "people-round"
    | "person-round"
    | "messenger"
    | "speaker"
    | "wallet"
    | "arrow-left"
    | "arrow-right"
    | "arrow-up"
    | "arrow-down"
    | "arrow-right-with-midline"
    | "phone"
    | "plus"
    | "pencil"
    | "letter"
    | "clock-arrow";

export type ChildIconProps = CommonIconProps & {
    [key: string]: string | number | undefined;
};

type IconProps = CommonIconProps & {
    name: IconSeries;
};

export default IconProps;
