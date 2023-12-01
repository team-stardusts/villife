import { ScrollView } from "react-native";
import NavigationView from "../../../../common/blocks/navigation";
import ContractInformationScreenProps from "./types";
import useBuildingRoomContractor from "../../services/building_rooms";
import { useEffect, useState } from "react";
import { BuildingRoomContract } from "../../services/building_rooms/provider/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useContractInformationScreenStyles from "./styles";
import TenantContractInfo from "./blocks/tenant_info";

export default function TenantContractInfoScreen({ route }: ContractInformationScreenProps) {
    const styles = useContractInformationScreenStyles();
    const messages = useScreenMessage().messages;
    const contractor = useBuildingRoomContractor();
    const [contractInfo, setContractInfo] = useState<BuildingRoomContract | undefined>();

    useEffect(() => {
        const fetchRenterContract = async () => {
            const result = await contractor.getRenterContract();
            const data = result.data?.data;
            console.log("[Tenant22]", result.data);

            if (data) {
                setContractInfo({
                    contractID: data.contract_id,
                    contractorName: data.contractor_name,
                    delinquencyRate: data.delinquency_rate,
                    deposit: data.deposit,
                    expirationDate: new Date(data.expiration_date * 1000),
                    managementFee: data.management_fee,
                    monthlyRent: data.monthly_rent,
                    rentType: data.rent_type,
                    startDate: new Date(data.start_date * 1000),
                    phoneNumber: data.phone_number,
                });
            }
        };

        fetchRenterContract();
    }, []);
    return (
        <NavigationView
            headerOptions={{
                title: "계약 정보",
                style: {
                    backgroundColor: styles.nav.backgroundColor,
                },
                hideBuidingSelector: true,
            }}
            bodyOptions={{
                backgroundColor: styles.nav.backgroundColor,
                applyDefaultHorizontalPadding: true,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {contractInfo && <TenantContractInfo contract={contractInfo} messages={messages} styles={styles} />}
            </ScrollView>
        </NavigationView>
    );
}
