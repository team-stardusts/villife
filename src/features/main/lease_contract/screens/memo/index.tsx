import { TextInput, View, Text, ColorValue } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useMemoEditScreenStyles from "./styles";
import ContractMemoEditScreenProps from "./types";
import { useState } from "react";
import Pallet from "./blocks/pallet";
import { ColorAvailable } from "./blocks/pallet/types";
import { hexToRGB } from "../../../../common/global_function";

export default function ContractMemoEditScreen({ navigation, route }: ContractMemoEditScreenProps) {
    const styles = useMemoEditScreenStyles();
    const [memo, setMemo] = useState<string | null>(null);
    const [memoColor, setMemoColor] = useState<ColorValue>("#000000");
    console.log(hexToRGB(memoColor as string, 30));

    return (
        <NavigationView
            headerOptions={{
                title: route.params ? "메모 수정" : "메모 등록",
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
            bottomNavOptions={{
                shown: false,
            }}>
            <View style={styles.container}>
                <Pallet onSelection={setMemoColor} />
                <View style={[styles.inputBox, { backgroundColor: memoColor }]}>
                    <TextInput
                        style={styles.input}
                        //cursorColor={hexToRGB(memoColor as string, 30)}
                        multiline
                        value={memo ?? ""}
                        onChangeText={(text) => {
                            setMemo(text.length === 0 ? null : text);
                        }}
                        autoFocus
                    />
                </View>
            </View>
        </NavigationView>
    );
}
