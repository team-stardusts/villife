import { Text } from "react-native";
import HomeScreenContent from "../../../home/blocks/content";
import { ImplementedContentProps } from "../../../home/blocks/content/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

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
