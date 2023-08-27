import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../../../../common/router/types";
import { useRecoilState } from "recoil";
import SelectedAddressStateType from "../../../../../../common/hooks/states/atoms/address/selected_address/types";
import selectedAddressState from "../../../../../../common/hooks/states/atoms/address/selected_address";
import { useEffect } from "react";
import { View, Text } from "react-native";
import UniversalTextInput from "../../../../../../common/blocks/universial/textinput";
import Icon from "../../../../../../common/atoms/icon";
import Badge from "../../../../../../common/atoms/badge";
import type { AddressSetterProps } from "./types";

export default function AddressSetter({ styles }: AddressSetterProps) {
    const navigation = useNavigation<RouterParams["navigation"]>();
    const [address, setAddress] = useRecoilState<SelectedAddressStateType | null>(selectedAddressState);

    useEffect(() => {
        setAddress(null);
    }, []);

    useEffect(() => {
        if (address === null) return;

        console.log(address);
    }, [address]);

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>주소</Text>
            </View>
            <View style={styles.searcherBox}>
                <View style={styles.searcher}>
                    <UniversalTextInput
                        placeholder="빌라 이름을 검색해주세요."
                        value={address?.roadAddress && address.roadAddress}
                        onPressIn={() => navigation.navigate("search_address")}
                    />
                    <View style={styles.magnifierBox}>
                        <Icon name="magnifier" size={styles.magnifierIcon.width} color={styles.magnifierIcon.color} />
                    </View>
                </View>
            </View>
            <View style={styles.badgeBox}>
                <Badge title="등록된 빌라" size={styles.badge.width} />
            </View>
        </View>
    );
}
