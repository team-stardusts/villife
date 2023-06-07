import { Dimensions, Pressable, View } from "react-native";
import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedBoxStyle from "./style";
import ApprovalRequiredModal from "../approval_require_modal";
import { ApprovalDataConverter, ConvertedApprovalData } from "./converter_approval";
import IconMoreVertical from "../../../../common/atoms/icon/more_vertical";
import IconBuilding from "../../../../common/atoms/icon/building";
import useApprovalOutlinedBoxStyle from "./style";
import OutlinedBoxProps from "./type";
import IconUserBorder from "../../../../common/atoms/icon/user_border";

/**
 * @param OutlinedBoxProp
 * @description this componets are used by noti and complaint domains which are incharge of showing its contents
 */
function OutlinedBox(props: OutlinedBoxProps) {
    const size = Dimensions.get("window");
    const styles = useApprovalOutlinedBoxStyle();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [convertedApprovals, setConvertedApprovals] = useState<ConvertedApprovalData>({} as ConvertedApprovalData);

    useEffect(() => {
        const fetchData = () => {
            const converter = new ApprovalDataConverter(props.approvalRequest);
            const convertedData = converter.convert();
            setConvertedApprovals(convertedData);
            console.log("TLqkf", convertedData);
        };
        fetchData();
    }, [props.approvalRequest]);

    return (
        <>
            <ApprovalRequiredModal
                visible={modalVisible}
                setVisible={setModalVisible}
                convertedApprovalRequest={convertedApprovals}
            />
            <Pressable
                onPressOut={() => {
                    setModalVisible(true);
                }}
                style={[styles.container, { minHeight: size.height * 0.1 * 0.8, width: size.width * 0.9 }]}>
                <View style={styles.innerBox}>
                    <View
                        style={[
                            styles.innerTitleSection,
                            {
                                height: size.height * 0.1 * 0.8,
                            },
                        ]}>
                        <View style={styles.titleTextBox}>
                            <Text style={[]}>{convertedApprovals.title}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <View
                                    style={{ flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                                    <IconBuilding size={styles.iconSize.width as number} />
                                    <Text style={[]}>{convertedApprovals.buildingName}</Text>
                                </View>
                                <View
                                    style={{ flexDirection: "row", justifyContent: "center", alignContent: "center" }}>
                                    <IconUserBorder size={styles.iconSize.width as number} />
                                    <Text style={[]}>{convertedApprovals.roomNumber}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.absoluteWrapper}>
                            <View style={{ flexDirection: "row" }}>
                                <Pressable
                                    onPress={() => {
                                        setModalVisible(true);
                                    }}>
                                    <IconMoreVertical color="black" size={30} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </>
    );
}

export default OutlinedBox;
