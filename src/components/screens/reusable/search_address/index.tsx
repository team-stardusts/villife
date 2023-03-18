import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import useScreenMessage from "../../../../hooks/multilingual/hooks";
import { useBuildingManager } from "../../../../hooks/services/hooks";
import KakaoLocal from "../../../../libs/rest_apis/kakao/types.local";
import TextInput from "../../../atoms/textinput";
import AuthScreenCommonInput from "../../../blocks/auth_screens/input";
import useSearchAddressScreenStyles from "./styles";


interface AddressBoxProps {
    address?: string,
    roadAddress?: string,
    zone_no?: string,
}


export default function SearchAddressScreen() {
    const BuildingManager = useBuildingManager();
    const Messages = useScreenMessage();
    const styles = useSearchAddressScreenStyles();
    const [searched, setSearched] = useState<KakaoLocal.Document[] | null>(null);

    const search = async (address: string) => {
        const result = await BuildingManager.searchByAddress(address)
        if (result !== null) {
            setSearched(result.documents);
        }
    }

    function AddressBox({address, roadAddress, zone_no}: AddressBoxProps) {
        return (
            <View style={styles.AddressListSection.contentsWrapper}>
                <View style={styles.AddressListSection.zoneNumberBox}>
                    <Text style={styles.AddressListSection.zoneNumber}>
                        {zone_no}
                    </Text>
                </View>
                <View style={styles.AddressListSection.addressBox}>
                    <View style={styles.AddressListSection.addressWrapper}>
                        <View style={styles.AddressListSection.addressTypeBadge}>
                            <Text style={styles.AddressListSection.addressType}>
                                도로명
                            </Text>
                        </View>
                        <View>
                            <Text>{roadAddress}</Text>
                        </View>
                    </View>
                    <View style={styles.AddressListSection.addressWrapper}>
                        <View style={styles.AddressListSection.addressTypeBadge}>
                            <Text style={styles.AddressListSection.addressType}>
                                지번
                            </Text>
                        </View>
                        <Text>{address}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.Screen.topLevelBox}>
            {
                /*
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
                */
            }
            <View style={styles.TitleSection.topLevelBox}>
                <View style={styles.TitleSection.textWrapper}>
                    <Text style={styles.TitleSection.title}>
                        {Messages.messages.reusable.search_address.title}
                    </Text>
                </View>
            </View>
            <View style={styles.InputsSection.topLevelBox}>
                <View style={styles.InputsSection.inputWrapper}>
                    <TextInput 
                        style={[
                            styles.InputsSection.input,
                        ]}
                        placeholder={Messages.messages.reusable.search_address.input_placeholder}
                        placeholderTextColor={"grey"}
                        onChangeText={(text) => search(text)}
                        />
                </View>
            </View>
            <View style={styles.AddressListSection.topLevelBox}>
                <ScrollView style={styles.AddressListSection.listWrapper}>
                    {
                        Array.isArray(searched)
                        ? searched.map((document, index) => (
                            <AddressBox 
                                key={index}
                                address={document.address?.address_name}
                                roadAddress={document.road_address?.address_name}
                                zone_no={document.road_address?.zone_no} />
                        ))
                        : <></>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}