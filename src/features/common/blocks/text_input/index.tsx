import InputIdentityNumber from "./\bidentity_number";
import InputPhoneNumber from "./phone_number";
import InputPlateNumber from "./plate_number";
import { ReusableTextInputProps } from "./types";

export default function ReusableTextInput(props: ReusableTextInputProps) {
    switch (props.type) {
        case "phone-number":
            return <InputPhoneNumber {...props} />;
        case "plate-number":
            return <InputPlateNumber {...props} />;
        case "identity-number":
            return <InputIdentityNumber {...props} />;
    }
}
