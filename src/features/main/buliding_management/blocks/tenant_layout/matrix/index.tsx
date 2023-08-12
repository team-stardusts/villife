import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BuildingTenantFloorViewProps, BuildingTenantMatrixViewProps, BuildingTenantProps } from "./types";
import useBuildingTenantMatrixViewStyles from "./styles";
import { useEffect, useState } from "react";
import useScreenMessage from "../../../../../common/hooks/multilingual/hooks";
import Icon from "../../../../../common/atoms/icon";

export default function BuildingTenantMatrixView(props: BuildingTenantMatrixViewProps) {
    const messages = useScreenMessage()["messages"];
    const styles = useBuildingTenantMatrixViewStyles();
    const [floors, setFloors] = useState<number[]>([]);

    useEffect(() => {
        let _floors: number[] = [];

        for (let i = 0; i < props.tenants.length; i++) {
            if (_floors.find((floor) => floor === props.tenants[i].floor) === undefined) {
                _floors.push(props.tenants[i].floor);
            }
        }
        setFloors(_floors.sort());
    }, [props.tenants]);

    return (
        <ScrollView style={styles.main.container} showsVerticalScrollIndicator={false}>
            {floors.map((_, index) => (
                <BuildingTenantFloorView
                    key={index}
                    styles={styles.floor}
                    messages={messages}
                    tenants={props.tenants}
                    targetCheckMode={props.checkmode}
                    selectAllStatus={props.selectAllStatus}
                />
            ))}
        </ScrollView>
    );
}

function BuildingTenantFloorView(props: BuildingTenantFloorViewProps) {
    return (
        <ScrollView style={props.styles.container} showsHorizontalScrollIndicator={false} horizontal>
            {props.tenants.map((tenant, index) => (
                <BuildingTenant
                    key={index}
                    index={index}
                    styles={props.styles}
                    messages={props.messages}
                    tenant={tenant}
                    targetCheckMode={props.targetCheckMode}
                    selectAllStatus={props.selectAllStatus}
                    onCheck={console.log}
                />
            ))}
        </ScrollView>
    );
}

function BuildingTenant(props: BuildingTenantProps) {
    const [isCheck, setIsCheck] = useState<boolean>(false);

    const setContainerShadow = () => {
        switch (props.tenant.roomState) {
            case "empty":
                return props.styles.emptyStatus;
            case "signed":
                return props.styles.signedStatus;
            case "unsigned":
                return props.styles.unsignedStatus;
        }
    };
    return (
        <TouchableOpacity
            style={[props.styles.tenantBox, setContainerShadow()]}
            activeOpacity={0.5}
            onPress={() => setIsCheck(!isCheck)}
            disabled={!props.targetCheckMode}>
            <Text>
                {props.tenant.roomNumber}
                {props.messages.words.room_postfix}
            </Text>
            {props.targetCheckMode && (
                <View style={props.styles.checkIconWrapper}>
                    <Icon
                        name="check"
                        size={isCheck ? props.styles.checkedCheckIcon.width : props.styles.checkIcon.width}
                        color={isCheck ? props.styles.checkedCheckIcon.color : props.styles.checkIcon.color}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
}
