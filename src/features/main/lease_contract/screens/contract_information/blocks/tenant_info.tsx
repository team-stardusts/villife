import { View } from "react-native";
import TitleCard from "../../../../../common/blocks/title_card";
import { TenantInfoProps } from "../types";
import CardRow from "./card_row";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VillifeRouterParams } from "../../../../../common/router/types";
import useBuildingRoomContractor from "../../../services/building_rooms";

export default function TenantInfo(props: TenantInfoProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation<VillifeRouterParams["navigation"]>();
    const contractor = useBuildingRoomContractor();

    return (
        <View style={props.styles.tenantInfoContainer}>
            <TitleCard
                title="세입자 정보"
                headerButton={{
                    title: "수정",
                    onPress: () => setModalVisible(true),
                }}
                minHeight={props.styles.tenantInfo.minHeight}>
                <View style={props.styles.tenantInfo}>
                    <CardRow styles={props.styles} rowKey={"호수"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"이름"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"전화번호"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"계약"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"자동고지"} rowValue={"사용"} />
                    <CardRow styles={props.styles} rowKey={"관리비"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"월세"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"보증금"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"입주일"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"만기일"} rowValue={"d"} />
                    <CardRow styles={props.styles} rowKey={"남은기간"} rowValue={"d"} />
                </View>
            </TitleCard>
        </View>
    );
}
