import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../../../common/router/types";
import { useRecoilState } from "recoil";
import SelectedAddressStateType from "../../../../../../common/hooks/states/atoms/address/selected_address/types";
import selectedAddressState from "../../../../../../common/hooks/states/atoms/address/selected_address";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import UniversalTextInput from "../../../../../../common/blocks/universial/textinput";
import Icon from "../../../../../../common/atoms/icon";
import Badge from "../../../../../../common/atoms/badge";
import type { AddressSetterProps } from "./types";
import BuildingManagementServiceProvider from "../../../../services/provider";
import StringValidator from "../../../../../../../libs/string_validator";
import VillifeToastMessage from "../../../../../../common/atoms/toast";
import { StardustAlertContent } from "../../../../../../common/blocks/universial/stardust_alert/types";
import StardustAlert from "../../../../../../common/blocks/universial/stardust_alert";

export default function AddressSetter(props: AddressSetterProps) {
    const manager = new BuildingManagementServiceProvider();
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const validator = new StringValidator();
    const [address, setAddress] = useRecoilState<SelectedAddressStateType | null>(selectedAddressState);
    const [buildingName, setBuildingName] = useState<string | null>(null);
    const [isBuildingNameOkay, setIsBuildingNameOkay] = useState<boolean>(false);
    const [alert, setAlert] = useState<StardustAlertContent>({
        visible: false,
        title: "이미 등록되어 있는 빌라입니다.",
        message: "관리자 정정이 필요한 경우 빌라이프에 문의해주세요.",
        type: "warning",
    });

    useEffect(() => {
        setAddress(null);

        return () => {
            setAddress(null);
        };
    }, []);

    useEffect(() => {
        if (address === null || buildingName === null || !isBuildingNameOkay) {
            props.onChangeBuildingInfo(null);
            return;
        }

        props.onChangeBuildingInfo({
            address,
            name: buildingName,
        });
    }, [address, buildingName, isBuildingNameOkay]);

    useEffect(() => {
        if (address === null) {
            setBuildingName(null);
            setIsBuildingNameOkay(false);
            return;
        }

        manager.verifyBuildingAddress(address).then((result) => {
            if (result === null) return;

            setAddress(null);
            setBuildingName(null);
            setAlert({ ...alert, visible: true });
        });
    }, [address]);

    const handleChangeBuidingName = (name: string) => {
        // Input의 문자열을 모두 지울 시
        if (name === "") {
            setBuildingName(null);
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

        if (name.length < 3) _isBuildingNameOkay = false;

        setIsBuildingNameOkay(_isBuildingNameOkay);

        setBuildingName(name);
    };

    const handleEndEditingBuildingName = () => {
        if (buildingName === null) {
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
            <StardustAlert {...alert} setAlert={setAlert} />
            <View style={props.styles.titleBox}>
                <Text style={props.styles.title}>주소</Text>
            </View>
            <View style={props.styles.inputBox}>
                <View style={props.styles.inputWrapper}>
                    <UniversalTextInput
                        placeholder="빌라 이름을 검색해주세요."
                        value={address?.roadAddress ? address.roadAddress : ""}
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

            {/* {address && (
                <View style={props.styles.badgeBox}>
                    <Badge
                        title={buildingName ? "등록된 빌라" : "미등록 빌라"}
                        size={props.styles.badge.width}
                        color={buildingName ? props.styles.registedBadge.color : props.styles.unregistedBadge.color}
                        bgColor={
                            buildingName
                                ? props.styles.registedBadge.backgroundColor
                                : props.styles.unregistedBadge.backgroundColor
                        }
                    />
                </View>
            )} */}

            <View style={props.styles.villaTitleBox}>
                <Text style={props.styles.title}>빌라 이름</Text>
            </View>
            <View style={props.styles.inputBox}>
                <View style={props.styles.inputWrapper}>
                    <UniversalTextInput
                        placeholder="빌라 이름을 세 글자 이상 입력해주세요."
                        value={address ? (buildingName ? buildingName : "") : ""}
                        onChangeText={(text) => handleChangeBuidingName(text)}
                        onEndEditing={() => handleEndEditingBuildingName()}
                        editable={address !== null}
                        lowlightColor={
                            address === null || isBuildingNameOkay
                                ? undefined
                                : props.styles.villaNameInputInvalid.color
                        }
                        highlightColor={
                            address === null || isBuildingNameOkay
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
