import IconArrow from "../../atoms/icon/arrow";
import IconCar from "../../atoms/icon/car";
import IconHome from "../../atoms/icon/home";
import IconMessenger from "../../atoms/icon/messenger";
import IconSpeaker from "../../atoms/icon/speaker";
import IconWallet from "../../atoms/icon/wallet";
import IconProps, { ChildIconProps } from "./types";

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
        default:
            return <IconHome {...iconProps} />;
    }
}
