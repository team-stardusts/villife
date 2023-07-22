import { useState } from "react";
import StardustAlert from "../../../../common/blocks/universial/stardust_alert";
import { Text, View } from "react-native";
import { Vehicle } from "../../services/states/types";

type VehicleDetailAlertProps = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    vehicle: Vehicle;
};

export default function VehicleDetailAlert(props: VehicleDetailAlertProps) {
    return (
        <StardustAlert
            modalVisible={props.visible}
            setModalVisible={props.setVisible}
            title={props.vehicle.ownerType === "guest" ? "방문자 정보" : "거주자 정보"}
            //subtitle="Developing vehicle detail modal"
            leftButtonText={"Cancle"}
            rightButtonText={"Okay"}
            onPressVoidSpace={() => props.setVisible(false)}
            onPressLeftBtn={() => props.setVisible(false)}
            onPressRightBtn={() => console.log("right")}>
            <View>
                <Text>{props.vehicle.model}</Text>
                <Text>{props.vehicle.plate_number}</Text>
            </View>
        </StardustAlert>
    );
}
