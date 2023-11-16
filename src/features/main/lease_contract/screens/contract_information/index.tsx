import { ScrollView } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ContractInformationScreenProps from "./types";
import useContractInformationScreenStyles from "./styles";

export default function ContractInformationScreen({ route }: ContractInformationScreenProps) {
    const styles = useContractInformationScreenStyles();
    return (
        <NavigationView
            headerOptions={{
                title: "계약 정보",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}></ScrollView>
        </NavigationView>
    );
}
