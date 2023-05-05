import React from "react";
import { ComplaintContentCardProps } from "./type";
import { View, Text, Animated } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useComplaintContentCardStyles from "./style";

function ComplaintContentCard(props: ComplaintContentCardProps) {
    const messages = useScreenMessage();
    const styles = useComplaintContentCardStyles();

    const circleOpacity1 = React.useRef(new Animated.Value(0)).current;
    const circleOpacity2 = React.useRef(new Animated.Value(0)).current;
    const progressLineWidth = React.useRef(new Animated.Value(0)).current;

    const interpolatedWidth = progressLineWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "45%"],
    });

    React.useEffect(() => {
        console.log("render");
        Animated.sequence([
            Animated.timing(circleOpacity1, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(circleOpacity2, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(progressLineWidth, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    return (
        <View style={props.info.status == "completed" ? styles.topLevelBoxCompleted : styles.topLevelBoxInProgress}>
            <View style={styles.titleSection}>
                <Text style={styles.titleText}>{props.info.title}</Text>
                <Text style={styles.dateTimeText}>{props.info.created_at}</Text>
            </View>
            <View style={styles.statusSection}>
                <View style={styles.statusTextSection}>
                    <View style={styles.textBox}>
                        <Text style={styles.statusText}>{messages.messages.main.complaint.received}</Text>
                    </View>
                    <View style={[styles.textBox, { width: "30%" }]}>
                        <Text style={styles.statusText}>{messages.messages.main.complaint.inprogress}</Text>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.statusText}>{messages.messages.main.complaint.done}</Text>
                    </View>
                </View>
                {props.info.status == "completed" ? (
                    <View style={styles.progressBarSection}>
                        <View style={styles.outerCircle}>
                            <Animated.View style={[styles.outerCircleInnerBorderCompleted]}>
                                <View style={styles.innerCircleCompleted}></View>
                            </Animated.View>
                        </View>
                        <View style={styles.outerCircle}>
                            <Animated.View style={[styles.outerCircleInnerBorderCompleted]}>
                                <View style={styles.innerCircleCompleted}></View>
                            </Animated.View>
                        </View>
                        <View style={styles.outerCircle}>
                            <Animated.View style={[styles.outerCircleInnerBorderCompleted]}>
                                <View style={styles.innerCircleCompleted}></View>
                            </Animated.View>
                        </View>
                        <View style={styles.absoluteWrapper}>
                            <Animated.View style={[styles.middleLineCompleted]}></Animated.View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.progressBarSection}>
                        <View style={styles.outerCircle}>
                            <Animated.View style={[styles.outerCircleInnerBorder, { opacity: circleOpacity1 }]}>
                                <View style={styles.innerCircle}></View>
                            </Animated.View>
                        </View>
                        <View style={styles.outerCircle}>
                            <Animated.View style={[styles.outerCircleInnerBorder, { opacity: circleOpacity2 }]}>
                                <View style={styles.innerCircle}></View>
                            </Animated.View>
                        </View>
                        <View style={styles.outerCircle}></View>
                        <View style={styles.absoluteWrapper}>
                            <Animated.View style={[styles.middleLine, { width: interpolatedWidth }]}></Animated.View>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

export default ComplaintContentCard;
