import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ParkingScreenProps, { VehicleInfoProps } from "./types";
import useParkService from "../../services/park";
import { useEffect, useState } from "react";
import VehicleCardView from "./card";
import useStyler from "../../../../common/hooks/styler/hooks";
import { SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE } from "../../../../common/constants";
import useParkingHomeScreenStyles from "./styles";
import Badge from "../../../../common/atoms/badge";
import ContentBox from "../../../../common/blocks/content_box";
import Icon from "../../../../common/atoms/icon";
import SimpleFuncButton from "../../../../common/blocks/button/simple_func_button";
import VillifeToastMessage from "../../../../common/atoms/toast";
import MessageSelectionModal from "../../blocks/message_selection_modal";
import { Vehicle } from "../../services/states/types";
import { useRecoilValue } from "recoil";
import { vehiclesState } from "../../services/states";
import IconThreeDotsVertical from "../../../../common/atoms/icon/three_dots_vertical";
import VehicleDetailAlert from "../../blocks/vehicle_detail_alert";
import useUserInformation from "../../../../common/hooks/service/user_info";
import VehicleListView from "./list";

export default function ParkingScreen({ navigation, route }: ParkingScreenProps) {
    const messages = useScreenMessage();
    const { deviceUI } = useStyler();
    const user = useUserInformation();
    const styles = useParkingHomeScreenStyles().screen;
    const { updateVehicles } = useParkService();
    const vehicles = useRecoilValue<Vehicle[]>(vehiclesState);
    const [isVehicleEditmode, setIsVehicleEditmode] = useState<boolean>(false);
    const [vehiclesForRender, setVehiclesForRender] = useState<Vehicle[]>([]);

    const screenPadding: number = deviceUI.moderateScale(SCREEN_PADDING_HORIZONTAL_STANDARD_VALUE);

    // Card에서 ScrollView를 사용하므로, 가변적인 카드를 만들기 위해서 Width 지정이 필요함
    const cardWidth: number = deviceUI.getScreenSize().width - (screenPadding + deviceUI.moderateScale(20));
    console.log("[ParkHomeScreen] onCreate");

    useEffect(() => {
        updateVehicles();
    }, []);

    useEffect(() => {
        sortAndSetVehiclesForRender();
    }, [vehicles]);

    const sortAndSetVehiclesForRender = (): void => {
        const newVehiclesForRender: Vehicle[] = [];

        if (user?.isAdmin) {
            newVehiclesForRender.push(...vehicles);
        } else {
            newVehiclesForRender.push(...vehicles.filter((vehicle) => vehicle.ownerType !== "user"));
        }

        newVehiclesForRender
            /* // 방문자 -> 거주자
            .sort((vehicleA, vehicleB) => {
                if ("visiting_purpose" in vehicleA && "visiting_purpose" in vehicleB) {
                    return 0;
                } else if ("visiting_purpose" in vehicleA) {
                    return -1;
                }

                return 1;
            }) */
            // 차량번호 1 -> 2
            .sort((vehicleA, vehicleB) => {
                try {
                    return parseInt(vehicleA.plate_number.slice(0, 2)) - parseInt(vehicleB.plate_number.slice(0, 2));
                } catch {
                    return 0;
                }
            });

        setVehiclesForRender(newVehiclesForRender);
    };

    /* // Vehicles 목록을 딜레이를 줘서 렌더링하기 위함.
    const [vehiclesForRendering, setVehiclesForRendering] = useState<Vehicle[]>([]);

    // Vehicles 목록을 딜레이를 줘서 렌더링하기 위함.
    const renderVehicleInfos = useCallback(async () => {
        const delay: number = 50;
        // 차량 리스트에서 User vehicles를 제외하기 위함.
        const allVehiclesExceptUser: Vehicle[] = [...guestVehicles, ...tenantVehicles];

        if (allVehiclesExceptUser.length === 0) {
            return [];
        }

        for (let i = 0; i < allVehiclesExceptUser.length; i++) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve("");
                }, delay)
            );

            setVehiclesForRendering((prevData) => {
                const newData = [...prevData];
                newData[i] = allVehiclesExceptUser[i];
                return newData;
            });
        }
    }, [tenantVehicles, guestVehicles]); */

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.parking.home.screen_title,
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {!user?.isAdmin && (
                    <VehicleCardView
                        vehicles={vehicles.filter((vehicle) => vehicle.ownerType === "user")}
                        onIntoEditmode={setIsVehicleEditmode}
                    />
                )}
                <VehicleListView vehicles={vehicles} />
                {/* <View style={styles.buildingVehiclesViewBox}>
                    <View style={styles.contentTitleBox}>
                        <Text style={styles.contentTitle}>
                            {messages.messages.main.parking.home.villa_vehicle_info}
                        </Text>
                        <View style={styles.contentFuncButtonBox}>
                            <SimpleFuncButton
                                icon={{ name: "plus", size: styles.contentFuncButtonIcon.width }}
                                title={messages.messages.main.parking.home.register_guest}
                                onPress={() => {
                                    navigation.push("register_guest_vehicle", {});
                                }}
                            />
                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {vehiclesForRender.map((vehicle, index) => {
                            return (
                                <VehicleInfo
                                    key={index}
                                    vehicle={vehicle}
                                />
                            );
                        })}
                    </ScrollView>
                </View> */}
            </ScrollView>
        </NavigationView>
    );
}

function VehicleInfo({ vehicle }: VehicleInfoProps) {
    const styles = useParkingHomeScreenStyles().vehicleInfo;
    const message = useScreenMessage();
    const badgeTitle = vehicle.ownerType !== "guest" ? message.messages.words.tenant : message.messages.words.guest;
    const badgeStyle = vehicle.ownerType !== "guest" ? styles.tenantBadge : styles.guestBadge;
    const [detailAlertVisible, setDetailAlertVisible] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <ContentBox>
                <View style={styles.contentBox}>
                    <View style={styles.vehicleInfoBox}>
                        <Badge
                            title={badgeTitle}
                            size={badgeStyle.width}
                            color={badgeStyle.color}
                            bgColor={badgeStyle.backgroundColor}
                        />
                        <Text style={styles.plateNumber}>{vehicle.plate_number}</Text>
                    </View>
                    <View style={styles.communicationFuncBox}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.communicationIconBox}
                            onPress={() =>
                                VillifeToastMessage.showBottomToast(
                                    "info",
                                    message.messages.boilerplate.preparing_service
                                )
                            }>
                            <Icon name="phone" size={styles.phoneIcon.width} color={styles.phoneIcon.color} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.communicationIconBox}
                            onPress={() =>
                                VillifeToastMessage.showBottomToast(
                                    "info",
                                    message.messages.boilerplate.preparing_service
                                )
                            }>
                            <Icon name="letter" size={styles.letterIcon.width} color={styles.letterIcon.color} />
                        </TouchableOpacity> */}
                        <MessageSelectionModal vehicleID={vehicle.id} />
                    </View>
                    <View style={styles.infoBox}>
                        <TouchableOpacity
                            style={styles.moreIconBox}
                            activeOpacity={0.6}
                            // [TO-DO] 방문자 수정 Function 추가 필요
                            onPress={() => setDetailAlertVisible(true)}>
                            <IconThreeDotsVertical size={styles.moreIcon.width} color={styles.moreIcon.color} />
                        </TouchableOpacity>
                        <VehicleDetailAlert
                            visible={detailAlertVisible}
                            setVisible={setDetailAlertVisible}
                            vehicle={vehicle}
                        />
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
