import { Text, TouchableOpacity, View } from "react-native";
import ContentBox from "../../../../blocks/content_box";
import { BuildingInfoViewProps } from "./tyles";
import useBuildingInfoViewStyles from "./styles";
import BankInfoBox from "./blocks/account";
import { makeChunk } from "../../../../global_function";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../router/types";

export default function BuildingInfoView(props: BuildingInfoViewProps) {
    const styles = useBuildingInfoViewStyles();
    //const navigation = useNavigation<VillifeNavigation>();

    return (
        <ContentBox backgroundColor={styles.contentBox.backgroundColor}>
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>건물 정보</Text>
                    {/* <TouchableOpacity style={styles.editBtn} activeOpacity={0.6} onPress={() => {}}>
                        <Text style={styles.editBtnTitle}>편집하기</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionRowKey}>주소</Text>
                        <Text style={styles.sectionRowValue}>{props.buildingInfo.address}</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionRowKey}>이름</Text>
                        <Text style={styles.sectionRowValue}>{props.buildingInfo.name}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionTitleBox}>
                        <Text style={styles.sectionTitle}>관리비</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionRowKey}>고지일</Text>
                        <Text style={styles.sectionRowValue}>{props.buildingInfo.mfNotiDate}일</Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionRowKey}>마감일</Text>
                        <Text style={styles.sectionRowValue}>+ {props.buildingInfo.mfDueDate}일</Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.section,
                        !props.buildingInfo.isAdmin && {
                            borderBottomWidth: 0,
                            marginBottom: 0,
                        },
                    ]}>
                    <View style={[styles.sectionTitleBox, { marginBottom: styles.sectionTitleBox.marginBottom * 1.5 }]}>
                        <Text style={styles.sectionTitle}>관리비 계좌</Text>
                    </View>
                    {props.buildingInfo.bankAccounts.map((account, index) => (
                        <View key={index} style={[styles.sectionRow]}>
                            <BankInfoBox
                                bankName={account.bank_name}
                                accountNumber={account.account_number}
                                accountHolder={account.owner_name}
                            />
                        </View>
                    ))}
                </View>
                {props.buildingInfo.isAdmin && (
                    <View
                        style={[
                            styles.section,
                            {
                                borderBottomWidth: 0,
                                marginBottom: 0,
                            },
                        ]}>
                        <View style={styles.sectionTitleBox}>
                            <Text style={styles.sectionTitle}>호수 정보</Text>
                        </View>
                        {makeChunk(props.buildingInfo.rooms, 2).map((chunk, index) => (
                            <View key={index} style={[styles.sectionRow, { justifyContent: "space-around" }]}>
                                <View style={[styles.sectionRow, { width: "30%" }]}>
                                    <Text style={styles.sectionRowValue}>{index === 0 ? "지하" : index * 2}층 </Text>
                                    <Text style={styles.sectionRowValue}>{chunk[0] === null ? "0" : chunk[0]}호 </Text>
                                </View>
                                <View style={[styles.sectionRow, { width: "30%" }]}>
                                    {chunk.length === 2 && (
                                        <>
                                            <Text style={styles.sectionRowValue}>{index * 2 + 1}층</Text>
                                            <Text style={styles.sectionRowValue}>
                                                {chunk[1] === null ? "0" : chunk[1]}호{" "}
                                            </Text>
                                        </>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ContentBox>
    );
}
