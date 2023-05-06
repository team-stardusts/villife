import IconArrow from "./arrow";
import IconCar from "./car";
import IconHome from "./home";
import IconMessenger from "./messenger";
import IconSpeaker from "./speaker";
import IconWallet from "./wallet";
import { IconPerson } from "./human";
import IconProps, { ChildIconProps } from "./types";
import IconLetter from "./letter";
import IconPhone from "./phone";
import IconClockArrow from "./clock_arrow";
import IconPlus from "./plus";
import IconPencil from "./pencil";

export default function Icon(props: IconProps) {
    /* let iconProps: ChildIconProps = {
        size: props.size,
        color: props.color,
    }; */

    const { name, ...iconProps } = props;

    switch (name) {
        case "arrow-left":
        case "arrow-right":
        case "arrow-up":
        case "arrow-down":
            const tokens: string[] = props.name.split("-");
            const _props: ChildIconProps = {
                ...iconProps,
                direction: tokens[tokens.length - 1],
            };

            return <IconArrow {..._props} />;
        case "car":
            return <IconCar {...iconProps} />;
        case "messenger":
            return <IconMessenger {...iconProps} />;
        case "speaker":
            return <IconSpeaker {...iconProps} />;
        case "wallet":
            return <IconWallet {...iconProps} />;
        case "person":
            return <IconPerson {...iconProps} />;
        case "letter":
            return <IconLetter {...iconProps} />;
        case "phone":
            return <IconPhone {...iconProps} />;
        case "plus":
            return <IconPlus {...iconProps} />;
        case "pencil":
            return <IconPencil {...iconProps} />;
        case "clock-arrow":
            return <IconClockArrow {...iconProps} />;
        default:
            return <IconHome {...iconProps} />;
    }
}
