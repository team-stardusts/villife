import { Text } from "react-native";
import HomeScreenContent from "../../home/content";
import { ImplementedContentProps } from "../../home/content/types";
import useScreenMessage from "../../../../../hooks/multilingual/hooks";

export default function HomeContentFromComplaint({ backgroundColor }: ImplementedContentProps) {
    const messages = useScreenMessage();

    return (
        <HomeScreenContent
            navigation={{ to: "complaint", title: messages.messages.main.complaint.renter_home_content_title }}
            backgroundColor={backgroundColor}>
            <Text>Hello, world!</Text>
        </HomeScreenContent>
    );
}
