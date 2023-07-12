import IconArrow from "./arrow";
import IconCar from "./car";
import IconHome from "./home";
import IconMessenger from "./messenger";
import IconSpeaker from "./speaker";
import IconWallet from "./wallet";
import { IconPerson, IconRoundPeople, IconRoundPerson } from "./human";
import IconProps, { ChildIconProps } from "./types";
import IconLetter from "./letter";
import IconPhone from "./phone";
import IconClockArrow from "./clock_arrow";
import IconPlus from "./plus";
import IconPencil from "./pencil";
import IconArrowWithMidline from "./arrow_with_midline";
import IconBuilding from "./building";
import IconMenu from "./menu";

import IconList from "./list";
import IconParkingLot from "./parking";

import IconQuestionMark from "./question_mark";

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
        case "arrow-right-with-midline":
            return <IconArrowWithMidline {...iconProps} />;
        case "building":
            return <IconBuilding {...iconProps} />;
        case "car":
            return <IconCar {...iconProps} />;
        case "messenger":
            return <IconMessenger {...iconProps} />;
        case "speaker":
            return <IconSpeaker {...iconProps} />;
        case "wallet":
            return <IconWallet {...iconProps} />;
        case "parking-lot":
            return <IconParkingLot {...iconProps} />;
        case "person":
            return <IconPerson {...iconProps} />;
        case "person-round":
            return <IconRoundPerson {...iconProps} />;
        case "people-round":
            return <IconRoundPeople {...iconProps} />;
        case "letter":
            return <IconLetter {...iconProps} />;
        case "list":
            return <IconList {...iconProps} />;
        case "phone":
            return <IconPhone {...iconProps} />;
        case "plus":
            return <IconPlus {...iconProps} />;
        case "pencil":
            return <IconPencil {...iconProps} />;
        case "clock-arrow":
            return <IconClockArrow {...iconProps} />;
        case "menu":
            return <IconMenu {...iconProps} />;
        case "round-person":
            return <IconRoundPerson {...iconProps} />;
        case "question-mark":
            return <IconQuestionMark {...iconProps} />;
        default:
            return <IconHome {...iconProps} />;
    }
}
