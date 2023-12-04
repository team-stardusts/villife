import { TextInput, View, Text } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useMemoEditScreenStyles from "./styles";
import ContractMemoEditScreenProps from "./types";
import { Shadow } from "react-native-shadow-2";

export default function ContractMemoEditScreen({ navigation, route }: ContractMemoEditScreenProps) {
    const styles = useMemoEditScreenStyles();

    return (
        <NavigationView
            headerOptions={{
                title: route.params.type === "edit" ? "메모 수정" : "메모 등록",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        multiline
                        value="asdfasdfdsdffdfffdfsedwefdsfdsfdsfdsfdsfdsfdsfsgjerbdglk,erbjdkgbrlkgblkdbgkjldfnvklfdnadfkjgbkdsfaklbsdkjfbklsdbfdkjgnkadfjgkndf"
                    />
                </View>
            </View>
        </NavigationView>
    );
}
