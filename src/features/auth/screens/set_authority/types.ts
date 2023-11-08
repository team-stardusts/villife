import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../common/router/types";
import { Authority } from "../../../../libs/rest_apis/villife/types";

type SetAuthorityScreenProps = NativeStackScreenProps<VillifeStackParamList, "create_account">;

export default SetAuthorityScreenProps;

export type AccountType = {
    authority: null | Authority["ADMIN"] | Authority["RENTER"];
    id: string | null;
    password: string | null;
    confirm_password: string | null;
};
