import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../common/router/types";

type VerifyPersonalInfoScreenProps = NativeStackScreenProps<VillifeStackParamList, "verify_personal_info">;

export default VerifyPersonalInfoScreenProps;

export type PersonalInfo = {
    name: string | null;
    phoneNumber: string | null;
    mobileCarrier: string | null;
    identityNumber: string | null;
};
