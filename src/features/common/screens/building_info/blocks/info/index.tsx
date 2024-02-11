import { Alert, Text, TouchableOpacity, View } from "react-native";
import { BuildingInfoViewProps } from "./tyles";
import useBuildingInfoViewStyles from "./styles";
import BankInfoBox from "./blocks/account";
import { makeChunk } from "../../../../global_function";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../router/types";
import TitleCard from "../../../../blocks/title_card";

export default function BuildingInfoView(props: BuildingInfoViewProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useBuildingInfoViewStyles();

    // 삭제하기 기능 나올 시 사용
    /*  const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [alert, setAlert] = useState<StardustAlertContent>({
        visible: false,
        type: "warning",
        title: "정말로 삭제하시겠습니까?",
        message: "삭제된 정보는 복구 할 수 없습니다.",
    });
     const features = useMemo<ModalFeature[]>(
        () => [
            {
                icon: "pencil",
                text: "수정하기",
                onPress: () => {
                    navigation.navigate("register_building", {});
                    setModalVisible(false);
                },
            },
            {
                icon: "trash-can",
                text: "삭제하기",
                onPress: () => {
                    setModalVisible(false);
                    setAlert({
                        ...alert,
                        visible: true,
                        buttons: [
                            {
                                text: "취소",
                                onPress: () => cancleAlert(),
                            },
                            {
                                text: "확인",
                                onPress: () => 삭제하기 아직 없음,
                            },
                        ],
                    });
                },
            },
        ],
        []
    );    
    const cancleAlert = () => {
        setAlert({
            ...alert,
            visible: false,
        });
    }; */

    return (
        <View style={styles.container}>
            {/* <ListBottomSlidableModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                features={features}
            /> */}
            <TitleCard
                title="건물 정보"
                headerButton={
                    props.isAdmin
                        ? {
                              title: "수정하기",
                              onPress: () => {
                                  navigation.navigate("building_setting", props.buildingInfo);
                              },
                          }
                        : undefined
                }>
                <View style={styles.section}>
                    <View style={styles.sectionRow}>
                        <View>
                            <Text style={styles.sectionRowKey}>주소</Text>
                        </View>
                        <Text
                            style={[styles.sectionRowValue, { width: "80%", textAlign: "right" }]}
                            adjustsFontSizeToFit
                            numberOfLines={1}>
                            {props.buildingInfo.roadAddr}
                        </Text>
                    </View>
                    <View style={styles.sectionRow}>
                        <Text style={styles.sectionRowKey}>이름</Text>
                        <Text style={styles.sectionRowValue} adjustsFontSizeToFit numberOfLines={1}>
                            {props.buildingInfo.buildingName}
                        </Text>
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
                {props.isAdmin && (
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
                        {makeChunk(props.rooms, 2).map((chunk, index) => (
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
            </TitleCard>
            <View style={styles.paddingBox} />
            <TitleCard
                title="계좌 정보"
                headerButton={
                    props.isAdmin && props.buildingInfo.bankAccounts.length !== 0
                        ? {
                              title: "수정하기",
                              onPress: () => {
                                  Alert.alert("아직 준비되지 않았어요!");
                                  //navigation.navigate("building_setting", props.buildingInfo);
                              },
                          }
                        : undefined
                }>
                <View
                    style={[
                        styles.section,
                        !props.isAdmin && {
                            borderBottomWidth: 0,
                            marginBottom: 0,
                        },
                    ]}>
                    <View style={[styles.sectionTitleBox, { marginBottom: styles.sectionTitleBox.marginBottom * 1.5 }]}>
                        <Text style={styles.sectionTitle}>관리비 계좌</Text>
                    </View>
                    {props.buildingInfo.bankAccounts.length === 0 ? (
                        <View style={styles.emptySection}>
                            <Text style={styles.sectionRowValue}>등록된 계좌가 없어요.</Text>
                        </View>
                    ) : (
                        props.buildingInfo.bankAccounts.map((account, index) => (
                            <View key={index} style={[styles.sectionRow]}>
                                <BankInfoBox
                                    bankName={account.bankName}
                                    accountNumber={account.accountNumber}
                                    accountHolder={account.ownerName}
                                />
                            </View>
                        ))
                    )}
                </View>
            </TitleCard>
        </View>
    );
}
