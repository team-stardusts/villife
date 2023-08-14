import { Text, TouchableOpacity, View } from "react-native";
import { SelectAllStatus, TentantLayoutProps } from "./types";
import useTentantLayoutStyles from "./styles";
import BuildingTenantListView from "./list";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import BuildingTenantMatrixView from "./matrix";
import { Building } from "../../../../../libs/rest_apis/villife/building/types";
import TenantRoomStateLabel from "./blocks/status_label";

export default function TentantLayout(props: TentantLayoutProps) {
    const styles = useTentantLayoutStyles();
    const messages = useScreenMessage().messages;
    const [targets, setTargets] = useState<number[]>([]);
    const [selectAllStatus, setSelectAllStatus] = useState<SelectAllStatus>("unselect_all");
    const roomStates: Building.RoomState[] = ["signed", "unsigned", "empty"];

    useEffect(() => {
        // 전체 선택 후 개별 요소의 체크를 해제 하는 경우를 위한 status
        if (targets.length !== 0 && targets.length !== props.tenants.length) {
            setSelectAllStatus("unselect_element");
        }

        // Messaging의 대상 전달
        props.onCheckTarget &&
            props.onCheckTarget(props.tenants.filter((_, index) => targets.find((i) => i === index)));
    }, [targets, props.tenants]);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {props.layout === "matrix" && (
                    <View style={styles.labelContainer}>
                        {roomStates.map((state, index) => (
                            <View key={index} style={styles.labelWrapper}>
                                <TenantRoomStateLabel roomState={state} />
                            </View>
                        ))}
                    </View>
                )}
                {props.checkmode && (
                    <View style={[styles.selectAllBtnContainer, props.layout !== "matrix" && { flex: 1 }]}>
                        <TouchableOpacity
                            style={styles.selectAllBtn}
                            activeOpacity={0.9}
                            onPress={() => {
                                if (selectAllStatus === "select_all") {
                                    setSelectAllStatus("unselect_all");
                                } else {
                                    setSelectAllStatus("select_all");
                                }
                            }}>
                            <Icon
                                name={"check"}
                                size={styles.selectAllIcon.width}
                                color={
                                    selectAllStatus === "select_all"
                                        ? styles.selectedSelectAll.color
                                        : styles.selectAllIcon.color
                                }
                            />
                            <Text
                                style={[
                                    styles.selectedAllText,
                                    selectAllStatus === "select_all" ? styles.selectedSelectAll : {},
                                ]}>
                                {messages.words.select_all}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {props.layout === "list" ? (
                <BuildingTenantListView {...props} onCheckTarget={setTargets} selectAllStatus={selectAllStatus} />
            ) : (
                <BuildingTenantMatrixView {...props} onCheckTarget={setTargets} selectAllStatus={selectAllStatus} />
            )}
        </View>
    );
}
