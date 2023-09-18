import HorizontalFilter from "./horizontal_filter";
import { FilterDefaultProps } from "../types";
import { useState } from "react";

export default function ContractFilter(props: ContractFilterProps) {
    const [contracts] = useState<string[]>([
        props.messages.words.not_registed,
        props.messages.words.lump_sum_deposit,
        props.messages.words.monthly_rent,
    ]);

    const handleChangeItems = (items: string[]) => {
        if (items.find((value) => value === props.messages.words.all)) {
            props.onChangeFilterCondition("contract", changeWordToType(contracts));
        } else {
            props.onChangeFilterCondition("contract", changeWordToType(items));
        }
    };

    const changeWordToType = (words: string[]): (string | undefined)[] => {
        return words.map((word) => {
            switch (word) {
                case props.messages.words.lump_sum_deposit:
                    return "lump-sum-deposit";
                case props.messages.words.monthly_rent:
                    return "monthly-rent";
                default:
                    return "";
            }
        });
    };

    return <HorizontalFilter items={contracts} onChangeSelectedItems={handleChangeItems} useSelectAll />;
}

type ContractFilterProps = FilterDefaultProps;
