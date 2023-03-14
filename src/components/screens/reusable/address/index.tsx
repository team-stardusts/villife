import { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useBuildingManager } from "../../../../hooks/services/hooks";
import KakaoLocal from "../../../../libs/rest_apis/kakao/types.local";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";

export default function AddressSearchScreen() {
    const BuildingManager = useBuildingManager();
    const [searched, setSearched] = useState<KakaoLocal.Document[] | null>(null);

    const search = async (address: string) => {
        const result = await BuildingManager.searchByAddress(address)
        if (result !== null) {
            setSearched(result.documents);
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <AuthScreenCommonInput 
                    title="Search Test"
                    onChangeText={(text) => search(text)}
                    />
            </View>
            <View style={{flex: 9}}>
                {
                    Array.isArray(searched)
                    ? searched.map((document, index) => (
                        <View key={index}>
                            <Text>{document.address_name}</Text>
                        </View>
                    ))
                    : <></>
                }
            </View>
        </SafeAreaView>
    )
}