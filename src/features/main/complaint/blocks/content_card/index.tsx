import React from "react";
import { ComplaintContentCardProps } from "./types";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useComplaintContentCardStyles from "./styles";
import ContentBox from "../../../../common/blocks/content_box";
import { ComplaintStatus } from "../../../../../libs/rest_apis/villife/complaint/types";

function ComplaintContentCard(props: ComplaintContentCardProps) {
    const messages = useScreenMessage();
    const styles = useComplaintContentCardStyles();

    const circleOpacity1 = React.useRef(new Animated.Value(0)).current;
    const circleOpacity2 = React.useRef(new Animated.Value(0)).current;
    //const progressLineWidth = React.useRef(new Animated.Value(0)).current;
    const [status, setStatus] = React.useState<ComplaintStatus>(props.info.status);

    const statusList: ComplaintStatus[] = ["received", "in_progress", "completed"];

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
                    toValue: 0.1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                /* Animated.timing(progressLineWidth, {
                    toValue: 0.1,
                    duration: 100,
                    useNativeDriver: false,
                }), */
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
            /* Animated.timing(progressLineWidth, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }), */
        ]).start();
    }, [status, props.info.status]);

    return (
        <View style={props.editMode ? styles.editModeContainer : styles.container}>
            <ContentBox backgroundColor={styles.contentBox.backgroundColor} enableShadow onPress={props.onPress}>
                <View style={styles.wrapper}>
                    <View style={styles.titleSection}>
                        {props.info.title.length <= 12 ? (
                            <Text style={styles.titleText}>{props.info.title}</Text>
                        ) : (
                            <Text style={styles.titleText}>{props.info.title.slice(0, 12) + "..."}</Text>
                        )}
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
                        <View style={styles.progressBarSection}>
                            {statusList.map((_status, index) => {
                                let opacityValue: Animated.Value | number;

                                if (status === "completed") {
                                    opacityValue = 1;
                                } else {
                                    switch (_status) {
                                        case "received":
                                            opacityValue = circleOpacity1;
                                            break;
                                        case "in_progress":
                                            opacityValue = circleOpacity2;
                                            break;

                                        case "completed":
                                            opacityValue = 0.1;
                                    }
                                }

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.6}
                                        disabled={!props.editMode || _status === status}
                                        onPress={() => {
                                            if (props.editMode) setStatus(_status);
                                            if (props.updatedStatus) props.updatedStatus.current = _status;
                                        }}
                                        style={styles.outerCircle}>
                                        <Animated.View
                                            style={[
                                                styles.outerCircleInnerBorder,
                                                status === "completed" && styles.outerCircleInnerBorderCompleted,
                                                {
                                                    opacity: opacityValue,
                                                },
                                            ]}>
                                            <View
                                                style={[
                                                    styles.innerCircle,
                                                    status === "completed" && styles.innerCircleCompleted,
                                                ]}></View>
                                        </Animated.View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </ContentBox>
        </View>
    );
}

export default ComplaintContentCard;
