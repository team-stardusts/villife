import { Text, TouchableOpacity, View } from "react-native";
import { BuildingSelectorType } from "./types";
import Icon from "../../../../atoms/icon";
import useBuildingSelectorStyles from "./styles";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import { useState } from "react";
import BottomSlidableModal from "../../../universial/slidemodal_bottom";
import BuildingSelectModal from "./bulidng_select_modal";

export default function BuildingSelector({ adminInfo }: BuildingSelectorType) {
    const message = useScreenMessage();
    const styles = useBuildingSelectorStyles();

    const [isModalUnfold, setIsModalUnfold] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <BuildingSelectModal visible={isModalUnfold} setVisible={setIsModalUnfold} />
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
                        ellipsizeMode="tail"
                        minimumFontScale={0.2}
                        maxFontSizeMultiplier={1}
                        adjustsFontSizeToFit={true}>
                        {adminInfo === null
                            ? message.messages.navigation.building_not_selected
                            : adminInfo.selectedBuilding.name}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
