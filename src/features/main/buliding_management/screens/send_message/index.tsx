import { View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import BuildingSendMessageScreenProps from "./types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useBuildingSendMessageScreenStyles from "./styles";

import TentantLayout from "../../blocks/tenant_layout";
import VillifeToastMessage from "../../../../common/atoms/toast";
import NextButton from "./blocks/next";

export default function BuildingSendMessageScreen({ route }: BuildingSendMessageScreenProps) {
    const messages = useScreenMessage().messages;
    const styles = useBuildingSendMessageScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: messages.main.building_management.send_message_to_building_tenant.screen_title,
                hideBuidingSelector: true,
                backgroundColor: styles.nav.backgroundColor,
                navComponent: NextButton,
                navComponentProps: {
                    onPress: () => console.log("Not implemented."),
                },
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                <View style={styles.listView}>
                    <TentantLayout
                        layout={route.params.layout}
                        tenants={JSON.parse(route.params.tenants)}
                        checkmode={true}
                        onCheckTarget={(tenants) => {
                            /* tenants.map((element) => {
                                console.log(element.roomNumber);
                            }); */
                        }}
                    />
                </View>
            </View>
        </NavigationView>
    );
}
