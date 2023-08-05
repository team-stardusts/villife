import { Modal, View } from "react-native";
import { StardustAlertProps } from "./types";
import useStardustAlertStyles from "./styles";
import StardustAlertHeader from "./blocks/header";
import StardustAlertBody from "./blocks/body";
import StardustAlertBottom from "./blocks/bottom";
import { useEffect } from "react";

export default function StardustAlert(props: StardustAlertProps) {
    const styles = useStardustAlertStyles(props.message !== undefined);

    useEffect(() => {
        return () => {
            props.setAlert({
                ...props,
                visible: false,
            });
        };
    }, []);

    return (
        <Modal
            style={styles.main.modal}
            visible={props.visible}
            animationType="fade"
            transparent
            onRequestClose={() =>
                props.setAlert({
                    ...props,
                    visible: false,
                })
            }>
            <View style={styles.main.bgwrapper} />
            <View style={styles.main.container}>
                <View style={styles.main.alert}>
                    <View style={styles.main.header}>
                        <StardustAlertHeader
                            type={props.type}
                            title={props.title}
                            enterMessage={props.message !== undefined}
                            styles={styles.header}
                        />
                    </View>
                    <View style={styles.main.body}>
                        <StardustAlertBody message={props.message ?? props.title} styles={styles.body} />
                    </View>
                    <View style={styles.main.bottom}>
                        <StardustAlertBottom setAlert={props.setAlert} buttons={props.buttons} styles={styles.bottom} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
