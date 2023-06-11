import React from "react";
import { ComplaintContentCardProps } from "./types";
import { View, Text, Animated, Pressable, TouchableOpacity } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useComplaintContentCardStyles from "./styles";
import ContentBox from "../../../../common/blocks/content_box";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";

function ComplaintContentCard(props: ComplaintContentCardProps) {
    const messages = useScreenMessage();
    const styles = useComplaintContentCardStyles();

    const circleOpacity1 = React.useRef(new Animated.Value(0)).current;
    const circleOpacity2 = React.useRef(new Animated.Value(0)).current;
    const progressLineWidth = React.useRef(new Animated.Value(0)).current;
    const [status, setStatus] = React.useState<ComplaintStatus>(props.info.status);

    const interpolatedWidth = progressLineWidth.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "45%"],
    });

    React.useEffect(() => {
        if (status == "received") {
            Animated.sequence([
                Animated.timing(circleOpacity1, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
            Animated.sequence([
                Animated.timing(circleOpacity2, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(progressLineWidth, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false,
                }),
            ]).start();
            return;
        }
        Animated.sequence([
            Animated.timing(circleOpacity1, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(circleOpacity2, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(progressLineWidth, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }),
        ]).start();
    }, [status]);

    return (
        <View style={props.editMode ? styles.editModeTopLevelBox : styles.topLevelBox}>
            <ContentBox
                backgroundColor={
                    status == "completed"
                        ? styles.contentBoxCompleted.backgroundColor
                        : styles.contentBoxInProgress.backgroundColor
                }>
                <View style={styles.titleSection}>
                    <Text style={styles.titleText}>{props.info.title}</Text>
                    <Text style={styles.dateTimeText}>
                        {props.info.created_at.substring(0, 4) == "0001"
                            ? props.info.updated_at.substring(0, 10)
                            : props.info.created_at.substring(0, 10)}
                    </Text>
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
                    {status == "completed" ? (
                        <View style={styles.progressBarSection}>
                            <Pressable
                                onPress={() => {
                                    if (props.editMode) setStatus("received");
                                    if (props.updatedStatus) props.updatedStatus.current = "received";
                                }}
                                style={styles.outerCircle}>
                                <Animated.View style={[styles.outerCircleInnerBorderCompleted]}>
                                    <View style={styles.innerCircleCompleted}></View>
                                </Animated.View>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    if (props.editMode) setStatus("in_progress");
                                    if (props.updatedStatus) props.updatedStatus.current = "in_progress";
                                }}
                                style={styles.outerCircle}>
                                <Animated.View style={[styles.outerCircleInnerBorderCompleted]}>
                                    <View style={styles.innerCircleCompleted}></View>
                                </Animated.View>
                            </Pressable>
                            <Pressable style={styles.outerCircle}>
                                <Animated.View style={[styles.outerCircleInnerBorderCompleted]}>
                                    <View style={styles.innerCircleCompleted}></View>
                                </Animated.View>
                            </Pressable>
                            <Pressable style={styles.absoluteWrapper}>
                                <Animated.View
                                    style={[
                                        props.editMode
                                            ? styles.middleLineCompletedWhenEdit
                                            : styles.middleLineCompleted,
                                    ]}></Animated.View>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.progressBarSection}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (props.editMode) setStatus("received");
                                    if (props.updatedStatus) props.updatedStatus.current = "received";
                                }}
                                style={styles.outerCircle}>
                                <Animated.View style={[styles.outerCircleInnerBorder, { opacity: circleOpacity1 }]}>
                                    <View style={styles.innerCircle}></View>
                                </Animated.View>
                            </TouchableOpacity>
                            <Pressable
                                onPress={() => {
                                    if (props.editMode) setStatus("in_progress");
                                    if (props.updatedStatus) props.updatedStatus.current = "in_progress";
                                }}
                                style={styles.outerCircle}>
                                <Animated.View style={[styles.outerCircleInnerBorder, { opacity: circleOpacity2 }]}>
                                    <View style={styles.innerCircle}></View>
                                </Animated.View>
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    if (props.editMode) setStatus("completed");
                                    if (props.updatedStatus) props.updatedStatus.current = "completed";
                                }}
                                style={styles.outerCircle}></Pressable>
                            <View style={styles.absoluteWrapper}>
                                <Animated.View
                                    style={[styles.middleLine, { width: interpolatedWidth }]}></Animated.View>
                            </View>
                        </View>
                    )}
                </View>
            </ContentBox>
        </View>
    );
}

export default ComplaintContentCard;
