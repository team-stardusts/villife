import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import useBuildingAdditionGuideScreenStyles from "./styles";
import BuildingAdditionGuideScreenProps from "./types";
import Icon from "../../../../common/atoms/icon";
import { ANIMATION_DURATION_DEFAULT } from "../../../../common/constants";
import useUserInformation from "../../../../common/hooks/service/user_info";

export default function BuildingAdditionGuideScreen({ navigation, route }: BuildingAdditionGuideScreenProps) {
    const styles = useBuildingAdditionGuideScreenStyles();
    const user = useUserInformation();
    const iconLocationY = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textLocationY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        const handle = Animated.parallel([
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
            Animated.timing(textLocationY, {
                toValue: 0,
                duration: ANIMATION_DURATION_DEFAULT,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(iconLocationY, {
                        toValue: -styles.animationBox.marginTop,
                        duration: ANIMATION_DURATION_DEFAULT,
                        useNativeDriver: true,
                    }),
                    Animated.timing(iconLocationY, {
                        toValue: 0,
                        duration: ANIMATION_DURATION_DEFAULT,
                        useNativeDriver: true,
                    }),
                ]),
                {
                    iterations: 30,
                }
            ),
        ]);

        handle.start();

        return () => {
            handle.reset();
            handle.stop();
        };
    }, [iconLocationY, textOpacity, textLocationY]);

    useEffect(() => {
        if (user?.isAdmin && (user.adminInfomation?.managedBuildings?.length as any) > 0) {
            navigation.reset({
                index: 0,
                routes: [{ name: "home" }],
            });
        }
    }, [user?.adminInfomation?.managedBuildings]);

    return (
        <NavigationView
            headerOptions={{
                title: "첫 빌라 등록",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
                backgroundColor: styles.nav.backgroundColor,
            }}
            bottomNavOptions={{
                shown: true,
            }}>
            <View style={styles.container}>
                <Animated.View style={[styles.animationBox, { transform: [{ translateY: iconLocationY }] }]}>
                    <View style={[styles.arrowBox, { transform: [{ rotateZ: "-90deg" }] }]}>
                        <Icon
                            name="arrow-right-with-midline"
                            size={styles.iconArrow.width}
                            color={styles.iconArrow.color}
                        />
                    </View>
                    <Text style={[styles.txtLineSmall, styles.txtHighlight]}>여기를 눌러주세요!</Text>
                </Animated.View>
                <Animated.View
                    style={[styles.txtBox, { opacity: textOpacity, transform: [{ translateY: textLocationY }] }]}>
                    <Text style={styles.txtLine}>
                        스마트한 <Text style={styles.txtHighlight}>빌라이프</Text>와 함께 할
                    </Text>
                    <Text style={styles.txtLine}>
                        <Text style={styles.txtHighlight}>첫 빌라</Text>를 <Text style={styles.txtHighlight}>등록</Text>
                        해주세요!
                    </Text>
                    <View style={styles.iconVillifeBox}>
                        <Icon name="villife" size={styles.iconVillife.width} color={styles.iconVillife.color} />
                        <Text style={styles.txtLineSmall}>
                            VIL<Text style={styles.txtHighlight}>LIFE</Text>
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </NavigationView>
    );
}

/* 
스마트한 빌라이프와 함께 하게 될
첫 빌라를 등록해주세요!
 */
