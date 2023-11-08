import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VillifeStackParamList } from "../../../common/router/types";
import { Authority } from "../../../../libs/rest_apis/villife/types";

type SetAccountScreenProps = NativeStackScreenProps<VillifeStackParamList, "set_account">;

export default SetAccountScreenProps;
