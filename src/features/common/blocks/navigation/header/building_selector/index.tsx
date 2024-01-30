import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BuildingSelectorType } from "./types";
import Icon from "../../../../atoms/icon";
import useBuildingSelectorStyles from "./styles";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import BuildingSelectModal from "./bulidng_select_modal";
import useUserInformation from "../../../../hooks/service/user_info";
import { Villife } from "@team-stardusts/villife-client";

export default function BuildingSelector({}: BuildingSelectorType) {
    const message = useScreenMessage();
    const styles = useBuildingSelectorStyles();
    const userinfo = useUserInformation();

    const [isModalUnfold, setIsModalUnfold] = useState<boolean>(false);

    const changeSelectedBulding = (buildingInfo: Villife.User.SimpleBuildingInfo) => {
        //const isSuccess = user.changeSelectedBuildingOfAdmin(buildingInfo);
        //if (admininfo !== null) admininfo.selectedBuilding = buildingInfo;
        userinfo?.changeAdminSelectedBuilding(buildingInfo.id);

        console.log("Change to:", buildingInfo.name);
        //console.log(isSuccess ? "Success" : "Fail", "to change.");
    };

    return (
        <View style={styles.container}>
            <BuildingSelectModal
                visible={isModalUnfold}
                setVisible={setIsModalUnfold}
                managedBuildings={userinfo?.adminInfomation?.managedBuildings}
                onBuildingPress={changeSelectedBulding}
            />
            {userinfo?.isAdmin && (
                <TouchableOpacity
                    style={styles.wrapper}
                    activeOpacity={0.4}
                    onPress={() => setIsModalUnfold(!isModalUnfold)}>
                    <View style={styles.iconBox}>
                        <Icon name="building" size={styles.icon.width} color={styles.icon.color} />
                    </View>
                    <View style={styles.textBox}>
                        <Text
                            style={styles.buildingName}
                            numberOfLines={1}
                            //ellipsizeMode="tail"
                            //minimumFontScale={0.2}
                            //maxFontSizeMultiplier={1}
                            adjustsFontSizeToFit>
                            {userinfo === null
                                ? message.messages.navigation.building_not_selected
                                : userinfo.adminInfomation?.selectedBuilding?.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}
