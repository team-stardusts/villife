import { Text, TouchableOpacity, View } from "react-native";
import ContentBox from "../content_box";
import useTitleCardViewStyles from "./styles";
import React from "react";
import { TitleCardHeaderProps, TitleCardProps } from "./types";

export default function TitleCard(props: TitleCardProps) {
    const styles = useTitleCardViewStyles();

    return (
        <View style={styles.main.container}>
            <ContentBox backgroundColor={styles.main.contentBox.backgroundColor}>
                <View style={styles.main.wrapper}>
                    <Header styles={styles.header} title={props.title} button={props.headerButton} />
                    <View style={styles.main.body} children={props.children} />
                </View>
            </ContentBox>
        </View>
    );
}

function Header(props: TitleCardHeaderProps) {
    return (
        <View style={props.styles.container}>
            <Text style={props.styles.title} numberOfLines={1} adjustsFontSizeToFit>
                {props.title}
            </Text>
            {props.button && (
                <TouchableOpacity
                    style={props.styles.button}
                    activeOpacity={0.6}
                    onPress={() => props.button?.onPress()}>
                    <Text style={props.styles.buttonTitle} numberOfLines={1} adjustsFontSizeToFit>
                        {props.button.title}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
