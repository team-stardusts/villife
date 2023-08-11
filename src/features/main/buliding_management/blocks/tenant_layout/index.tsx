import { Text, TouchableOpacity, View } from "react-native";
import { TentantLayoutProps } from "./types";
import useTentantLayoutStyles from "./styles";
import BuildingTenantListView from "./list";
import { useEffect, useState } from "react";
import Icon from "../../../../common/atoms/icon";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function TentantLayout(props: TentantLayoutProps) {
    const styles = useTentantLayoutStyles();
    const messages = useScreenMessage().messages;
    const [targets, setTargets] = useState<number[]>([]);
    const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);

    useEffect(() => {
        //if (targets.length !== props.tenants.length) setIsSelectedAll(false);

        props.onCheckTarget &&
            props.onCheckTarget(props.tenants.filter((_, index) => targets.find((i) => i === index)));
    }, [targets]);

    return (
        <View style={styles.container}>
            {props.checkmode ? (
                <TouchableOpacity
                    style={styles.selectAllBtnWrapper}
                    activeOpacity={0.9}
                    onPress={() => setIsSelectedAll(!isSelectedAll)}>
                    <Icon
                        name={"check"}
                        size={styles.selectAllIcon.width}
                        color={isSelectedAll ? styles.selectedSelectAll.color : styles.selectAllIcon.color}
                    />
                    <Text style={[styles.selectedAllText, isSelectedAll ? styles.selectedSelectAll : {}]}>
                        {messages.words.select_all}
                    </Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}
            {props.layout === "list" ? (
                <BuildingTenantListView {...props} onCheckTarget={setTargets} isSelectAll={isSelectedAll} />
            ) : (
                <></>
            )}
        </View>
    );
}
