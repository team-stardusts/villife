import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
    BuildingTenantFloorViewProps,
    BuildingTenantMatrixViewProps,
    BuildingTenantProps,
    OnBuildingTenantCheck,
} from "./types";
import useBuildingTenantMatrixViewStyles from "./styles";
import { useEffect, useState } from "react";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import Icon from "../../../../../common/atoms/icon";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../../common/router/types";

export default function BuildingTenantMatrixView(props: BuildingTenantMatrixViewProps) {
    const messages = useScreenMessage()["messages"];
    const styles = useBuildingTenantMatrixViewStyles();
    const [floors, setFloors] = useState<number[]>([]);
    const [messagingTargets, setMessagingTargets] = useState<number[]>([]);

    useEffect(() => {
        let _floors: number[] = [];

        for (let i = 0; i < props.tenants.length; i++) {
            if (_floors.find((floor) => floor === props.tenants[i].floor) === undefined) {
                _floors.push(props.tenants[i].floor);
            }
        }
        setFloors(_floors.sort());
    }, [props.tenants]);

    useEffect(() => {
        props.onCheckTarget(messagingTargets);
    }, [messagingTargets]);

    useEffect(() => {
        if (props.selectAllStatus === "select_all") {
            setMessagingTargets(props.tenants.map((_, index) => index));
        } else if (props.selectAllStatus === "unselect_all") {
            setMessagingTargets([]);
        }
    }, [props.selectAllStatus]);

    const handleOnCheck = ({ isCheck, tenant }: OnBuildingTenantCheck) => {
        // Check 시 대상 어레이에 없는 경우 추가
        const tenantIndex = props.tenants.findIndex((value) => value.roomNumber === tenant.roomNumber);

        if (isCheck && messagingTargets.find((target) => target === tenantIndex) === undefined) {
            setMessagingTargets([...messagingTargets, tenantIndex]);

            return;
        }

        // Check 했는데 대상 어레이에 없는 경우 return
        if (isCheck) return;

        // 대상 어레이에서 삭제하기 위해 index searching
        const findedIndex = messagingTargets.findIndex((value) => value === tenantIndex);

        // 대상 어레이에 없는 경우 return
        if (findedIndex === -1) {
            return;
        }

        // 찾아낸 index의 값을 제외하고 reset
        setMessagingTargets([...messagingTargets.filter((target) => target !== messagingTargets[findedIndex])]);
    };

    return (
        <ScrollView style={styles.main.container} showsVerticalScrollIndicator={false}>
            {floors.map((floor, index) => (
                <BuildingTenantFloorView
                    key={index}
                    styles={styles.floor}
                    messages={messages}
                    tenants={props.tenants.filter((tenant) => tenant.floor === floor)}
                    targetCheckMode={props.checkmode}
                    selectAllStatus={props.selectAllStatus}
                    onCheck={handleOnCheck}
                />
            ))}
        </ScrollView>
    );
}

function BuildingTenantFloorView(props: BuildingTenantFloorViewProps) {
    const [check, setCheck] = useState<OnBuildingTenantCheck | null>(null);

    useEffect(() => {
        if (check === null) return;
        props.onCheck(check);
    }, [check]);

    return (
        <ScrollView style={props.styles.container} showsHorizontalScrollIndicator={false} horizontal>
            {props.tenants.map((tenant, index) => (
                <BuildingTenant
                    key={index}
                    styles={props.styles}
                    messages={props.messages}
                    roomInfo={tenant}
                    targetCheckMode={props.targetCheckMode}
                    selectAllStatus={props.selectAllStatus}
                    onCheck={({ isCheck, tenant }) =>
                        setCheck({
                            ...check,
                            isCheck,
                            tenant,
                        })
                    }
                />
            ))}
        </ScrollView>
    );
}

function BuildingTenant(props: BuildingTenantProps) {
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();

    useEffect(() => {
        props.onCheck({ isCheck, tenant: props.roomInfo });
    }, [isCheck]);

    useEffect(() => {
        if (props.roomInfo.roomState !== "signed") return;

        switch (props.selectAllStatus) {
            case "select_all":
                setIsCheck(true);
                return;
            case "unselect_all":
                setIsCheck(false);
                return;
            case "unselect_element":
                return;
        }
    }, [props.selectAllStatus]);

    const setContainerShadow = () => {
        switch (props.roomInfo.roomState) {
            case "empty":
                return props.styles.emptyStatus;
            case "signed":
                return props.styles.signedStatus;
            case "unsigned":
                return props.styles.unsignedStatus;
        }
    };

    return (
        <TouchableOpacity
            style={[
                props.styles.tenantBox,
                setContainerShadow(),
                props.targetCheckMode && props.roomInfo.roomState !== "signed" ? props.styles.disabledTenantBox : {},
            ]}
            activeOpacity={0.5}
            onPress={() => {
                if (props.targetCheckMode) {
                    setIsCheck(!isCheck);
                } else {
                    if (props.roomInfo.roomState === "empty" && props.roomInfo.roomID !== undefined) {
                        navigation.navigate("tenant_setting", {
                            type: "addtion",
                            roomID: props.roomInfo.roomID,
                        });
                    } else {
                        navigation.navigate("tenant_detail", {
                            roomInfo: JSON.stringify(props.roomInfo),
                        });
                    }
                }
            }}
            disabled={props.targetCheckMode && props.roomInfo.roomState !== "signed"}
            //disabled={!props.targetCheckMode || props.tenant.roomState !== "signed"}
        >
            <Text>
                {props.roomInfo.roomNumber}
                {props.messages.words.room_postfix}
            </Text>
            {props.targetCheckMode && (
                <View style={props.styles.checkIconWrapper}>
                    <Icon
                        name="check"
                        size={isCheck ? props.styles.checkedCheckIcon.width : props.styles.checkIcon.width}
                        color={isCheck ? props.styles.checkedCheckIcon.color : props.styles.checkIcon.color}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
}
