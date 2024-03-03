import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import RegisterBuildingScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useRegisterBuildingScreenStyles from "./styles";
import ScreenTitleView from "../../../../common/blocks/title_view";
import RoomCountSetter from "./blocks/room";
import AddressSetter from "./blocks/address";
import { BuildingFloors } from "./blocks/room/types";
import { useRef, useState } from "react";
import { BuildingInfo } from "./blocks/address/types";
import VillifeToastMessage from "../../../../common/atoms/toast";
import useAdminInfoService from "../../../../common/hooks/service/user_info/service";
import MFDataSetter from "./blocks/mf";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MFData } from "./blocks/mf/types";
import useRoomViewModel from "../../viewmodel/room";

export default function BuildingSettingScreen({ navigation, route }: RegisterBuildingScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useRegisterBuildingScreenStyles();
    const adminInfoService = useAdminInfoService();
    const viewModel = useRoomViewModel();
    const scrollVewRef = useRef<KeyboardAwareScrollView | null>(null);
    const [floors, setFloors] = useState<BuildingFloors>([]);
    const [buildingInfo, setBuildingInfo] = useState<BuildingInfo | null>(null);
    const [mfdata, setMFData] = useState<MFData>({
        dueDay: null,
        notiDay: null,
        bankAccounts: [],
    });

    const isProperlyPrepared = (): boolean => {
        const isValidFloorValue = floors.filter((floor) => floor !== 0 && floor !== null).length !== 0;

        return buildingInfo !== null && mfdata.dueDay !== null && mfdata.notiDay !== null && route.params
            ? true
            : mfdata.bankAccounts.length > 0 && route.params
            ? true
            : isValidFloorValue;
    };

    const modifyBuilding = async () => {
        if (viewModel?.user?.name === undefined) {
            console.error("[RegisterBuildingScreen]", "User 이름이 undifined라니...이럴리가 없는데?!");
            return;
        }

        // 확인 버튼 활성 조건에 "buildingInfo가 null이 아닐 것"이 있기 때문에
        // 그냥 Type narrowing임.
        if (!route.params) return;
        if (buildingInfo === null) return;
        if (mfdata.dueDay === null || mfdata.notiDay === null) return;
        if (viewModel === null) {
            VillifeToastMessage.showBottomToast("error", "예기치 않은 오류가 발생했습니다.");
            return;
        }

        const result = await viewModel.modifyBuilding({
            buildingId: route.params.buildingId,
            buildingName: buildingInfo.name,
            mfDueDate: mfdata.dueDay,
            mfNotiDate: mfdata.notiDay,
            ownerName: viewModel.user.name,
        });

        if (result === null) {
            VillifeToastMessage.showBottomToast("error", "수정하지 못했습니다. 잠시 후 다시 시도해주세요.");
        } else {
            await adminInfoService.initializeAdminInformation();

            VillifeToastMessage.showBottomToast("success", `\"${buildingInfo.name}\" 빌라의 정보를 변경했어요!`);
        }

        navigation.canGoBack() && navigation.goBack();
    };

    const registerBuilding = async () => {
        if (viewModel?.user?.name === undefined) {
            console.error("[RegisterBuildingScreen]", "User 이름이 undifined라니...이럴리가 없는데?!");
            return;
        }

        // 확인 버튼 활성 조건에 "buildingInfo가 null이 아닐 것"이 있기 때문에
        // 그냥 Type narrowing임.
        if (buildingInfo === null) return;
        if (mfdata.dueDay === null || mfdata.notiDay === null) return;
        if (viewModel === null) {
            VillifeToastMessage.showBottomToast("error", "예기치 않은 오류가 발생했습니다.");
            return;
        }

        const _floors = floors;

        const result = await viewModel.registerBuilding({
            basementInfo: _floors.shift() as number | 0,
            buildingName: buildingInfo.name,
            accountRegiReqForms: mfdata.bankAccounts,
            mfDueDate: mfdata.dueDay,
            mfNotiDate: mfdata.notiDay,
            ownerName: viewModel.user.name,
            roadAddr: buildingInfo.roadAddress,
            roomInfo: floors as number[],
        });

        if (result === null) {
            VillifeToastMessage.showBottomToast("error", "등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
        } else {
            await adminInfoService.initializeAdminInformation();

            VillifeToastMessage.showBottomToast("success", `\"${buildingInfo.name}\" 빌라를 등록했습니다.`);
        }

        navigation.canGoBack() && navigation.goBack();
    };

    return (
        <NavigationView
            headerOptions={{
                title: route.params ? "건물 수정하기" : "건물 추가하기",
                style: {
                    backgroundColor: styles.main.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.main.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{
                shown: false,
            }}>
            <ScreenTitleView
                titles={[route.params ? "건물 정보 수정하기" : "건물 정보 추가하기"]}
                //subtitles={["설정을 마치고 빌라이프 운영진의 승인을 기다려주세요."]}
                bottomButton={{
                    title: messages.words.okay,
                    disabled: !isProperlyPrepared(),
                    onPress: () => (route.params ? modifyBuilding() : registerBuilding()),
                }}
                disablePaddingTop>
                <KeyboardAwareScrollView
                    style={styles.main.container}
                    showsVerticalScrollIndicator={false}
                    ref={scrollVewRef}
                    onContentSizeChange={() => scrollVewRef.current?.scrollToEnd()}>
                    <View style={styles.main.searchingContainer}>
                        <AddressSetter
                            styles={styles.search}
                            initialValue={
                                route.params
                                    ? {
                                          roadAddress: route.params.roadAddr,
                                          name: route.params.buildingName,
                                      }
                                    : undefined
                            }
                            onChangeBuildingInfo={setBuildingInfo}
                        />
                    </View>
                    <View style={styles.main.dateSettingContainer}>
                        <MFDataSetter
                            initialValue={
                                route.params
                                    ? {
                                          bankAccounts: route.params.bankAccounts,
                                          dueDay: route.params.mfDueDate,
                                          notiDay: route.params.mfNotiDate,
                                      }
                                    : undefined
                            }
                            onChangeMFData={setMFData}
                        />
                    </View>
                    {!route.params && (
                        <View style={styles.main.roomSettingContainer}>
                            <RoomCountSetter styles={styles.room} onChangeRoomCount={setFloors} />
                        </View>
                    )}
                </KeyboardAwareScrollView>
            </ScreenTitleView>
        </NavigationView>
    );
}
