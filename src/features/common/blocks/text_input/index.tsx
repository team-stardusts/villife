import InputIdentityNumber from "./\bidentity_number";
import Input6DigitAuthCode from "./6_digit_auth_code";
import InputPhoneNumber from "./phone_number";
import InputPlateNumber from "./plate_number";
import { ReusableTextInputProps } from "./types";

export default function ReusableTextInput(props: ReusableTextInputProps) {
    switch (props.type) {
        case "6digit-authcode":
            return <Input6DigitAuthCode {...props} />;
        case "phone-number":
            return <InputPhoneNumber {...props} />;
        case "plate-number":
            return <InputPlateNumber {...props} />;
        case "identity-number":
            return <InputIdentityNumber {...props} />;
    }
}
