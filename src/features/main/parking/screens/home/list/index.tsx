import { Text, View } from "react-native";
import ContentBox from "../../../../../common/blocks/content_box";
import useVehicleListStyles from "./styles";
import VehicleListHeaderView from "./blocks/header";
import { Vehicle } from "../../../services/states/types";
import VehicleListBodyView from "./blocks/body";

type VehicleListViewProps = {
    vehicles: Vehicle[];
};

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
