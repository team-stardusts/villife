import { useNavigation } from "@react-navigation/native";
import { RouterParams } from "../../../../../../common/router/types";
import { useRecoilState } from "recoil";
import SelectedAddressStateType from "../../../../../../common/hooks/states/atoms/address/selected_address/types";
import selectedAddressState from "../../../../../../common/hooks/states/atoms/address/selected_address";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UniversalTextInput from "../../../../../../common/blocks/universial/textinput";
import Icon from "../../../../../../common/atoms/icon";
import Badge from "../../../../../../common/atoms/badge";
import type { AddressSetterProps, BuildingType } from "./types";
import BuildingManagementServiceProvider from "../../../../services/provider";
import StringValidator from "../../../../../../../libs/string_validator";
import VillifeToastMessage from "../../../../../../common/atoms/toast";

export default function AddressSetter(props: AddressSetterProps) {
    const manager = new BuildingManagementServiceProvider();
    const navigation = useNavigation<RouterParams["navigation"]>();
    const validator = new StringValidator();
    const [address, setAddress] = useRecoilState<SelectedAddressStateType | null>(selectedAddressState);
    const [building, setBuilding] = useState<BuildingType>(null);
    const [isBuildingNameOkay, setIsBuildingNameOkay] = useState<boolean>(false);

    useEffect(() => {
        setAddress(null);
    }, []);

    useEffect(() => {
        if (address === null || building === null || !isBuildingNameOkay) {
            props.onChangeBuildingInfo(null);
            return;
        }

        props.onChangeBuildingInfo({
            address,
            name: building.name,
        });
    }, [address, building, isBuildingNameOkay]);

    useEffect(() => {
        if (address === null) return;

        manager.verifyBuildingAddress(address).then(setBuilding);
    }, [address]);

    const handleChangeBuidingName = (name: string) => {
        // Input의 문자열을 모두 지울 시
        if (name === "") {
            setBuilding(null);
            setIsBuildingNameOkay(false);
            return;
        }

        // Input에 특수 문자를 입력했을 시
        if (validator.hasSpecialChar(name)) {
            VillifeToastMessage.showBottomToast("error", "빌라 이름에는 특수문자를 사용할 수 없습니다.");
            return;
        }

        // Input에 자음, 모음이 홀로 입력된 값이 있는지 확인
        let _isBuildingNameOkay = true;

        for (let token of name) {
            if (validator.isOnlyVowels(token) || validator.isOnlyConsonant(token)) {
                _isBuildingNameOkay = false;
                break;
            }
        }

        setIsBuildingNameOkay(_isBuildingNameOkay);

        setBuilding({
            ...{
                id: building?.id ?? 0,
                name,
            },
        });
    };

    const handleEndEditingBuildingName = () => {
        if (building === null) {
            VillifeToastMessage.showBottomToast("error", "빌라 이름을 입력해주세요.");
            setIsBuildingNameOkay(false);
            return;
        }

        if (!isBuildingNameOkay) {
            VillifeToastMessage.showBottomToast("error", "빌라 이름에는 모음과 자음을 단독으로 사용할 수 없습니다.");
        }
    };

    return (
        <View style={props.styles.container}>
            <View style={props.styles.titleBox}>
                <Text style={props.styles.title}>주소</Text>
            </View>
            <View style={props.styles.inputBox}>
                <View style={props.styles.inputWrapper}>
                    <UniversalTextInput
                        placeholder="빌라 이름을 검색해주세요."
                        value={address?.roadAddress && address.roadAddress}
                        onPressIn={() => navigation.navigate("search_address")}
                    />
                    <View style={props.styles.magnifierBox}>
                        <Icon
                            name="magnifier"
                            size={props.styles.magnifierIcon.width}
                            color={props.styles.magnifierIcon.color}
                        />
                    </View>
                </View>
            </View>

            {address && (
                <View style={props.styles.badgeBox}>
                    <Badge
                        title={building ? "등록된 빌라" : "미등록 빌라"}
                        size={props.styles.badge.width}
                        color={building ? props.styles.registedBadge.color : props.styles.unregistedBadge.color}
                        bgColor={
                            building
                                ? props.styles.registedBadge.backgroundColor
                                : props.styles.unregistedBadge.backgroundColor
                        }
                    />
                </View>
            )}

            <View style={props.styles.villaTitleBox}>
                <Text style={props.styles.title}>빌라 이름</Text>
            </View>
            <View style={props.styles.inputBox}>
                <View style={props.styles.inputWrapper}>
                    <UniversalTextInput
                        placeholder="빌라 이름을 입력해주세요."
                        value={address ? (building ? building.name : "") : ""}
                        onChangeText={(text) => handleChangeBuidingName(text)}
                        onEndEditing={() => handleEndEditingBuildingName()}
                        editable={address !== null}
                        lowlightColor={
                            isBuildingNameOkay || building === null
                                ? undefined
                                : props.styles.villaNameInputInvalid.color
                        }
                        highlightColor={
                            isBuildingNameOkay || building === null
                                ? undefined
                                : props.styles.villaNameInputInvalid.color
                        }
                        //selectTextOnFocus={address !== null}
                    />
                </View>
            </View>
        </View>
    );
}
