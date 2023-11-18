import { View } from "react-native";
import TitleCard from "../../../../../common/blocks/title_card";
import CardRow from "./card_row";
import { TenantContractInfoProps } from "../types";
import useUserInformation from "../../../../../common/hooks/service/user_info";
import { insertCommaToNumber } from "../../../../../common/global_function";
import StardustDateParser from "../../../../../../libs/date_parser";

export default function TenantContractInfo({ styles, contract, messages }: TenantContractInfoProps) {
    const user = useUserInformation();

    const switchContractType = () => {
        switch (contract?.rentType) {
            case "lump-sum-deposit":
                return messages.words.lump_sum_deposit;
            case "monthly-rent":
                return messages.words.monthly_rent;
            default: // undefined
                return messages.words.not_registed;
        }
    };

    const convertDateToString = (date: Date | undefined) => {
        if (date === undefined) return "";

        date = StardustDateParser.changeGMT(new Date(date), "kr");

        const convertOneDigitToTwoDigits = (number: number): string => {
            const numString = number.toString();

            if (number < 10) {
                return "0" + numString;
            }

            return numString;
        };
        return `${date.getFullYear().toString()}-${convertOneDigitToTwoDigits(
            date.getMonth() + 1
        )}-${convertOneDigitToTwoDigits(date.getDate())}`;
    };

    const getDateDiff = (d1: Date, d2: Date) => {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diffDate = date1.getTime() - date2.getTime();

        return Math.floor(diffDate / (1000 * 60 * 60 * 24)) + 1; // 밀리세컨 * 초 * 분 * 시 = 일
    };
    console.log("[Tenant]", contract);
    return (
        <View style={styles.tenantInfoContainer}>
            <TitleCard title="계약 정보" minHeight={styles.tenantInfo.minHeight}>
                <View style={styles.tenantInfo}>
                    <CardRow styles={styles} rowKey={"호수"} rowValue={`${user?.roomNumber}호`} />
                    <CardRow styles={styles} rowKey={"이름"} rowValue={user?.name} />
                    <CardRow styles={styles} rowKey={"전화번호"} rowValue={contract.phoneNumber} />
                    <CardRow styles={styles} rowKey={"계약"} rowValue={switchContractType()} />
                    <CardRow styles={styles} rowKey={"자동고지"} rowValue={"사용"} />
                    <CardRow
                        styles={styles}
                        rowKey={"관리비"}
                        rowValue={insertCommaToNumber(contract.managementFee) + " 원"}
                    />
                    <CardRow
                        styles={styles}
                        rowKey={"월세"}
                        rowValue={insertCommaToNumber(contract.monthlyRent) + " 원"}
                    />
                    <CardRow
                        styles={styles}
                        rowKey={"보증금"}
                        rowValue={insertCommaToNumber(contract.deposit) + " 원"}
                    />
                    <CardRow styles={styles} rowKey={"입주일"} rowValue={convertDateToString(contract.startDate)} />
                    <CardRow
                        styles={styles}
                        rowKey={"만기일"}
                        rowValue={convertDateToString(contract.expirationDate)}
                    />
                    <CardRow
                        styles={styles}
                        rowKey={"남은기간"}
                        rowValue={
                            getDateDiff(
                                contract.expirationDate,
                                StardustDateParser.changeGMT(new Date(), "kr")
                            ).toString() + " 일"
                        }
                    />
                </View>
            </TitleCard>
        </View>
    );
}
