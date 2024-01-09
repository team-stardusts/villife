import { FlatList, ScrollView, Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useNotificationBoxScreenStyles from "./styles";
import NotificationBoxScreenProps from "./types";
import { useEffect, useMemo, useState } from "react";
import useNotificationBoxViewModel from "./viewmodel";
import Notification from "./blocks/noti";
import StardustDateParser from "../../../../../libs/date_parser";

export function NotificationBoxScreen({ navigation, route }: NotificationBoxScreenProps) {
    const styles = useNotificationBoxScreenStyles();
    const viewModel = useNotificationBoxViewModel();
    const today = useMemo<Date>(() => StardustDateParser.changeGMT(new Date(), "kr"), []);
    const [newNotiIds, setNewNotiIds] = useState<number[]>([]);

    const isSameDate = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    useEffect(() => {
        setNewNotiIds(viewModel.notReadNotiIds);
        viewModel.processByReading();
    }, [viewModel.data]);

    return (
        <NavigationView
            headerOptions={{
                title: "알림",
                hideBuidingSelector: true,
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.period}>오늘</Text>
                    {viewModel.data
                        .filter((noti) => isSameDate(today, noti.createdAt))
                        .sort((a, b) => b.id - a.id)
                        .map((noti, i) => (
                            <Notification
                                key={i}
                                {...noti}
                                isNewer={newNotiIds.find((v) => v === noti.id) ? true : false}
                            />
                        ))}
                    <Text style={styles.period}>이전</Text>
                    {viewModel.data
                        .filter((noti) => !isSameDate(today, noti.createdAt))
                        .sort((a, b) => b.id - a.id)
                        .map((noti, i) => (
                            <Notification
                                key={i}
                                {...noti}
                                isNewer={newNotiIds.find((v) => v === noti.id) ? true : false}
                            />
                        ))}
                </ScrollView>
            </View>
        </NavigationView>
    );
}
