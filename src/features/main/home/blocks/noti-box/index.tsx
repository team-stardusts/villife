import { Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import Icon from "../../../../common/atoms/icon";
import useNotiBoxShortcutStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../common/router/types";
import useNotificationBoxViewModel from "../../screens/notification-box/viewmodel";
import { IEventListenable } from "../../../../common/global_interface";
import { MessagingEvent, MessagingEventData } from "../../../../common/hooks/firebase/messaging/types";
import FirebaseMessagingEventHandler from "../../../../common/hooks/firebase/messaging/event";

export default function NotiBoxShortcut() {
    const styles = useNotiBoxShortcutStyles();
    const navigation = useNavigation<VillifeNavigation>();
    const viewModel = useNotificationBoxViewModel();
    /* const listener: IEventListenable<MessagingEvent, MessagingEventData> = new FirebaseMessagingEventHandler();

    useEffect(() => {
        listener.listenAllEvents((name, data) => {
            console.log(name);
            viewModel.update();
        });

        return () => {
            console.log("???");
            listener.removeAllListeners();
        };
    }, []); */

    useEffect(() => {
        if (viewModel.user?.isRenter) {
            viewModel.update();
            return;
        } else if (viewModel.user?.isAdmin && viewModel.user.adminInfomation?.selectedBuilding) {
            viewModel.update();
        }
    }, [viewModel.user?.adminInfomation?.selectedBuilding]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    navigation.navigate("notification_box", { updateViewData: false });
                }}
                style={styles.iconBox}>
                <View>
                    {viewModel.notReadNotiIds.length > 0 && (
                        <View style={styles.newer}>
                            <Text style={styles.newerTxt} adjustsFontSizeToFit numberOfLines={1}>
                                {viewModel.notReadNotiIds.length}
                            </Text>
                        </View>
                    )}
                    <Icon name="bell" size={styles.icon.width} color={styles.icon.color} />
                </View>
            </TouchableOpacity>
        </View>
    );
}
