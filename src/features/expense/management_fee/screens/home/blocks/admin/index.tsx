import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AdminMFViewProps } from "./types";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../common/router/types";
import useAdminMFStyles from "./styles";
import ContentBox from "../../../../../../common/blocks/content_box";
import Icon from "../../../../../../common/atoms/icon";
import { useEffect, useMemo, useState } from "react";
import StardustDateParser from "../../../../../../../libs/date_parser";
import useAdminMFViewModel from "../../../../viewmodel/admin";
import Villife from "../../../../../../../libs/villife-client/types";

export default function AdminMFView(props: AdminMFViewProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useAdminMFStyles();
    const viewModel = useAdminMFViewModel();

    const [buidingInfo, setBuildingInfo] = useState<Villife.Contract.Building | null>(null);

    const notFulfilledItemsCnt = useMemo<NotFulfilledItemCnt>(() => {
        const today = StardustDateParser.changeGMT(new Date(), "kr");
        const cnt: NotFulfilledItemCnt = {
            unnoticed: 0,
            unpaied: 0,
        };

        for (let i = 0; i < viewModel.data.length; i++) {
            if (
                viewModel.data[i].lastestNotiYear !== today.getFullYear() ||
                viewModel.data[i].lastestNotiMonth !== today.getMonth() + 1
            ) {
                cnt.unnoticed++;
            }

            /* if (
                !(
                    manager.history[i].LastestPaidYear === today.getFullYear() &&
                    manager.history[i].LastestPaidMonth === today.getMonth() + 1
                )
            ) {
                _nonPaymentCnt++;
            } */

            if (viewModel.data[i].totalUnpaidFee > 0) {
                cnt.unpaied++;
            }
        }

        return cnt;
    }, [viewModel.data]);

    const status = useMemo<string>(() => {
        if (notFulfilledItemsCnt.unnoticed === 0 && notFulfilledItemsCnt.unpaied === 0) {
            return "이상 없음";
        }

        return "점검 필요";
    }, [notFulfilledItemsCnt]);

    useEffect(() => {
        viewModel.update();
    }, [viewModel.user.adminInfomation?.selectedBuilding]);

    useEffect(() => {
        viewModel.getBuildingInfo().then(setBuildingInfo);
    }, [viewModel.data]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.approvalWrapper}>
                <ContentBox backgroundColor={styles.approvalBox.backgroundColor} enableShadow={false}>
                    <View style={styles.approvalCotent}>
                        <TouchableOpacity
                            style={styles.approvalTitleBox}
                            activeOpacity={0.6}
                            onPress={() => navigation.navigate("expense_approval")}>
                            <Text style={styles.approvalTitle}>관리비 요청함</Text>
                            <Icon name="letter" size={styles.linkIcon.width} color={styles.linkIcon.color} />
                        </TouchableOpacity>
                    </View>
                </ContentBox>
            </View>
            <ContentBox backgroundColor={styles.siturationBox.backgroundColor} enableShadow={false}>
                <View style={styles.siturationWrapper}>
                    <TouchableOpacity
                        style={styles.siturationTitleBox}
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate("building_mf_history")}>
                        <Text style={styles.siturationTitle}>관리비 현황</Text>
                        <View style={styles.linkPressiable}>
                            <Icon name="arrow-right" size={styles.linkIcon.width} color={styles.linkIcon.color} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.rowKey}>상태</Text>
                            <Text style={styles.rowValue}>{status}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowKey}>고지일</Text>
                            <Text style={styles.rowValue}>매달 {buidingInfo?.mfNotiDate}일</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowKey}>마감일</Text>
                            <Text style={styles.rowValue}>고지 이후 {buidingInfo?.mfDueDate}일</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowKey}>미고지 건수</Text>
                            <Text style={styles.rowValue}>{notFulfilledItemsCnt.unnoticed}건</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.rowKey}>미납 건수</Text>
                            <Text style={styles.rowValue}>{notFulfilledItemsCnt.unpaied}건</Text>
                        </View>
                    </View>
                </View>
            </ContentBox>
        </ScrollView>
    );
}

type NotFulfilledItemCnt = {
    unnoticed: number;
    unpaied: number;
};
