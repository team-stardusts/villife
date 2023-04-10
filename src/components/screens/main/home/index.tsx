import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Alert, BackHandler, Button, Text, TouchableOpacity, View } from "react-native";
import HomeScreenProps from "./type";

export default function HomeScreen(props: HomeScreenProps) {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
                    {
                        text: "취소",
                        onPress: () => null,
                    },
                    { text: "확인", onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            };

            const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => subscription.remove();
        }, [])
    );

    return (
        <View>
            <Button title="Increment" aria-label="Increment value" />
            <Button aria-label="Decrement value" title="Decrement" />
            <Button aria-label="Decrement value" title="incrementByAmount" />
            <Button
                onPress={() => {
                    props.navigation.navigate("noti_home", {});
                }}
                aria-label="Decrement value"
                title="Link to Notice Home"
            />
        </View>
    );
}
