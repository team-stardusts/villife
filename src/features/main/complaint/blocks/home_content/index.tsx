import { Text } from "react-native";
import MiniContent from "../../../../common/blocks/mini_content";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export default function HomeContentFromComplaint({ backgroundColor }: { backgroundColor: string }) {
    const messages = useScreenMessage();

    return (
        <MiniContent
            title={messages.messages.main.complaint.renter_home_content_title}
            navigation={{ to: "complaint" }}
            backgroundColor={backgroundColor}>
            <Text>Hello, world!</Text>
        </MiniContent>
    );
}
