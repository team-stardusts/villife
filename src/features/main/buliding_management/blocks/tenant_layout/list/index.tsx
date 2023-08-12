import { ColorValue, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useBuildingTenantListViewStyles from "./styles";
import { BuildingTenant } from "../../../services/types";
import { BuildingTenantListViewProps } from "./types";
import { useEffect, useState } from "react";
import Icon from "../../../../../common/atoms/icon";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import VillifeToastMessage from "../../../../../common/atoms/toast";
import { SelectAllStatus } from "../types";

export default function BuildingTenantListView(props: BuildingTenantListViewProps) {
    const styles = useBuildingTenantListViewStyles();
    const messages = useScreenMessage().messages;
    const [messagingTargets, setMessagingTargets] = useState<number[]>([]);

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

    const handleOnCheck = (isCheck: boolean, index: number) => {
        // Check 시 대상 어레이에 없는 경우 추가
        if (isCheck && messagingTargets.find((target) => target === index) === undefined) {
            setMessagingTargets([...messagingTargets, index]);

            return;
        }

        // Check 했는데 대상 어레이에 없는 경우 return
        if (isCheck) return;

        // 대상 어레이에서 삭제하기 위해 index searching
        const findedIndex = messagingTargets.findIndex((value) => value === index);

        // 대상 어레이에 없는 경우 return
        if (findedIndex === -1) {
            return;
        }

        // 찾아낸 index의 값을 제외하고 reset
        setMessagingTargets([...messagingTargets.filter((target) => target !== messagingTargets[findedIndex])]);
    };

    return (
        <ScrollView style={styles.main.container}>
            {props.tenants.map((tenant, index) => (
                <BuildingTenantView
                    key={index}
                    index={index}
                    styles={styles.tenant}
                    tenant={tenant}
                    targetCheckMode={props.checkmode}
                    onCheck={handleOnCheck}
                    messages={messages}
                    selectAllStatus={props.selectAllStatus}
                />
            ))}
        </ScrollView>
    );
}

function BuildingTenantView(props: BuildingTenantProps) {
    const [badge, setBadge] = useState<TenantRoomStateBadgeType>({
        status: props.messages.words.empty_room,
        style: props.styles.emptyBadge,
    });
    const [isCheck, setIsCheck] = useState<boolean>(false);

    useEffect(() => {
        setBadgeStatus();
    }, []);

    useEffect(() => {
        if (props.tenant.roomState !== "signed") return;

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

    useEffect(() => {
        props.onCheck(isCheck, props.index);
    }, [isCheck]);

    const setBadgeStatus = () => {
        switch (props.tenant.roomState) {
            case "empty":
                setBadge({
                    ...badge,
                    status: props.messages.words.empty_room,
                    style: props.styles.emptyBadge,
                });
                break;
            case "signed":
                setBadge({
                    ...badge,
                    status: props.messages.words.app_signed_state,
                    style: props.styles.signedBadge,
                });
                break;
            case "unsigned":
                setBadge({
                    ...badge,
                    status: props.messages.words.app_unsigned_state,
                    style: props.styles.unsignedBadge,
                });
                break;
        }
    };

    const switchContractType = () => {
        switch (props.tenant.contract?.rentType) {
            case "lump-sum-deposit":
                return props.messages.words.lump_sum_deposit;
            case "partial-lump-sum-deposit":
                return props.messages.words.partial_lump_sum_deposit;
            case "monthly-rent":
                return props.messages.words.monthly_rent;
            default: // undefined
                return props.messages.words.not_registed;
        }
    };

    const switchTheRemainer = () => {
        switch (props.tenant.contractStatus) {
            case "expired":
                return props.messages.words.expiration;
            case "imminent-expiration":
                return props.messages.words.close_to_expiration;
            default:
                return "";
        }
    };

    return (
        <View style={props.styles.container}>
            <View style={props.styles.wrapper}>
                <View style={props.styles.infoSection}>
                    <View style={[props.styles.badge, { backgroundColor: badge.style.backgroundColor }]}>
                        <Text style={{ ...badge.style }}>{badge.status}</Text>
                    </View>
                    <View style={props.styles.elementWrapper}>
                        <Text style={props.styles.roomNumber}>{props.tenant.roomNumber}호</Text>
                    </View>
                    <View style={props.styles.elementWrapper}>
                        <Text style={props.styles.contractType}>{switchContractType()}</Text>
                    </View>
                </View>
                <View style={props.styles.expirationNotiSection}>
                    <Text
                        style={[
                            props.styles.expirationNoti,
                            {
                                color:
                                    props.tenant.contractStatus === "expired"
                                        ? props.styles.expiration.color
                                        : props.styles.imminentExpiration.color,
                            },
                        ]}>
                        {switchTheRemainer()}
                    </Text>
                </View>
                <View style={props.styles.functionSection}>
                    {props.targetCheckMode ? (
                        <TouchableOpacity
                            style={[
                                props.styles.checkRadio,
                                props.tenant.roomState !== "signed" ? props.styles.disabledCheckRadio : {},
                                isCheck ? props.styles.checkedCheckRadio : {},
                            ]}
                            activeOpacity={0.3}
                            onPress={() => setIsCheck(!isCheck)}
                            disabled={props.tenant.roomState !== "signed"}>
                            {isCheck ? (
                                <Icon
                                    name="check"
                                    size={props.styles.checkRadioIcon.width}
                                    color={props.styles.checkRadioIcon.color}
                                />
                            ) : (
                                <></>
                            )}
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={props.styles.detailBtnWrapper}
                            activeOpacity={0.3}
                            onPress={() => {
                                VillifeToastMessage.showBottomToast(
                                    "info",
                                    props.messages.boilerplate.preparing_service
                                );
                            }}>
                            <Icon
                                name="three-dots-vertical"
                                size={props.styles.detailIcon.width}
                                color={props.styles.detailIcon.color}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}

type BuildingTenantProps = {
    index: number;
    styles: ReturnType<typeof useBuildingTenantListViewStyles>["tenant"];
    tenant: BuildingTenant;
    targetCheckMode: boolean;
    onCheck(isCheck: boolean, tenantIndex: number): void;
    messages: ReturnType<typeof useScreenMessage>["messages"];
    selectAllStatus: SelectAllStatus;
};

type TenantRoomStateBadgeType = {
    status: string;
    style: {
        backgroundColor: ColorValue;
        color: ColorValue;
    };
};
