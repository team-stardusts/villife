import { View } from "react-native";
import ContentBox from "../../../../../common/blocks/content_box";
import useVehicleListStyles from "./styles";
import VehicleListHeaderView from "./blocks/header";
import VehicleListBodyView from "./blocks/body";
import { VehicleListViewProps } from "./types";

export default function VehicleListView(props: VehicleListViewProps) {
    const styles = useVehicleListStyles();

    return (
        <View style={styles.main.container}>
            <ContentBox backgroundColor={styles.main.contentBox.backgroundColor}>
                <View style={styles.main.wrapper}>
                    <View style={styles.main.headerContainer}>
                        <VehicleListHeaderView styles={styles.header} />
                    </View>
                    <View style={styles.main.bodyContainer}>
                        <VehicleListBodyView styles={styles.body} vehicles={props.vehicles} />
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}
