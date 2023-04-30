import { Pressable, Text } from "react-native";
import ButtonProps from "./types";


export default function Button(props: ButtonProps): JSX.Element {
    const { title, titleStyle } = props;
    
    return (
        <Pressable 
            {...props}
            >
            <Text style={titleStyle}>
                {title}
            </Text>
        </Pressable>
    )
}