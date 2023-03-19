import Postcode from "@actbase/react-daum-postcode";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import SearchAddressScreenProps from "./types";



export default function SearchAddressScreen({navigation, route}: SearchAddressScreenProps) {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Postcode
                style={{flex: 1, width:"100%"}}
                jsOptions={{ animation: true }}
                onSelected={data => {
                    route.params.onGoBack(data); navigation.goBack();
                }}
                onError={function (error: unknown): void {
                    throw new Error('Function not implemented.');
                    }}
                />
        </SafeAreaView>
    )
}