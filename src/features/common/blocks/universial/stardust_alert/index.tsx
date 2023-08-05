import { Modal, StyleSheet, Text, View } from "react-native";
import { StardustAlertProps } from "./types";
import useStyler from "../../../hooks/styler/hooks";
import useStardustAlertStyles from "./styles";
import StardustAlertHeader from "./blocks/header";
import StardustAlertBody from "./blocks/body";
import StardustAlertBottom from "./blocks/bottom";

export default function StardustAlert(props: StardustAlertProps) {
    const styles = useStardustAlertStyles(props.message !== undefined);

    return (
        <Modal
            style={styles.main.modal}
            visible={props.visible}
            animationType="fade"
            transparent
            onRequestClose={() => props.setVisible(!props.visible)}>
            <View style={styles.main.bgwrapper}></View>
            <View style={styles.main.container}>
                <View style={styles.main.alert}>
                    <View style={styles.main.header}>
                        <StardustAlertHeader title={props.title} styles={styles.header} />
                    </View>
                    {props.message ? (
                        <View style={styles.main.body}>
                            <StardustAlertBody message={props.message} styles={styles.body} />
                        </View>
                    ) : (
                        <></>
                    )}
                    <View style={styles.main.bottom}>
                        <StardustAlertBottom
                            setVisiable={props.setVisible}
                            buttons={props.buttons}
                            styles={styles.bottom}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
