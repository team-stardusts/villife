import { View } from "react-native";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import NavigationView from "../../../../common/blocks/navigation";
import ComplaintRegisterScreenProps from "./type";
import { useRef } from "react";
import ComplaintEditor from "../../blocks/editor";

export default function ComplaintRegisterScreen({ navigation, route }: ComplaintRegisterScreenProps) {
    const messages = useScreenMessage();
    const content = useRef("");
    const title = useRef("");

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.complaint.register,
            }}>
            <ComplaintEditor titleRef={title} contentRef={content} />
        </NavigationView>
    );
}
