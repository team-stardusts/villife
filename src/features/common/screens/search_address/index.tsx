import Postcode from "@actbase/react-daum-postcode";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import { SafeAreaView, LogBox } from "react-native";
import { useRecoilState } from "recoil";
import selectedAddressState from "../../hooks/states/atoms/address/selected_address";
import SelectedAddressStateType from "../../hooks/states/atoms/address/selected_address/types";
import SearchAddressScreenProps from "./types";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    //'Did not receive response to shouldStartLoad in time'
]);

export default function SearchAddressScreen({ navigation, route }: SearchAddressScreenProps) {
    const [address, setAddress] = useRecoilState<SelectedAddressStateType>(selectedAddressState);

    const handleOnSelected = (searched: OnCompleteParams) => {
        const { roadAddress, jibunAddress, buildingCode, buildingName, zonecode } = searched;

        setAddress({
            roadAddress,
            jibunAddress,
            buildingCode,
            buildingName,
            zonecode,
        });

        navigation.goBack();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Postcode
                style={{ flex: 1, width: "100%" }}
                jsOptions={{ animation: true }}
                onSelected={handleOnSelected}
                onError={function (error: unknown): void {
                    throw new Error("Function not implemented.");
                }}
            />
        </SafeAreaView>
    );
}
