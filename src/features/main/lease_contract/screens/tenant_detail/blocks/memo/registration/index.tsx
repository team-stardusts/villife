import { Animated, Text, TouchableOpacity, View } from "react-native";
import ContentBox from "../../../../../../../common/blocks/content_box";
import useMemoRegistrationBoxStyles from "./styles";
import { useEffect, useRef, useState } from "react";
import useInterval from "../../../../../../../common/hooks/utility/interval";
import { useNavigation } from "@react-navigation/native";
import { VillifeNavigation } from "../../../../../../../common/router/types";
import { ContractMemoRegistrationBoxProps } from "./types";

export default function ContractMemoRegistrationBox(props: ContractMemoRegistrationBoxProps) {
    const navigation = useNavigation<VillifeNavigation>();
    const styles = useMemoRegistrationBoxStyles();
    const [cnt, setCnt] = useState<number>(0);
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.timing(opacityValue, {
            toValue: cnt % 2 === 0 ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        });
        animation.start();

        return () => {
            animation.reset();
        };
    }, [opacityValue, cnt]);

    useInterval(() => {
        setCnt((prev) => {
            if (prev === null) return 0;
            if (prev > 1000) return 0;
            return prev + 1;
        });
    }, 550);

    return (
        <View style={styles.container}>
            <ContentBox backgroundColor={styles.contentBox.backgroundColor}>
                <View style={styles.wrapper}>
                    <Animated.View style={[styles.cursor, { opacity: opacityValue }]} />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            navigation.navigate("contract_memo_edit", {
                                contractId: props.contractId,
                            });
                        }}>
                        <Text style={styles.text}>메모를 입력해주세요.</Text>
                    </TouchableOpacity>
                </View>
            </ContentBox>
        </View>
    );
}
