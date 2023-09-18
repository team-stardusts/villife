import HorizontalFilter from "./horizontal_filter";
import { FilterDefaultProps } from "../types";
import { useState } from "react";

export default function StatusFilter(props: StatusFilterProps) {
    const [status] = useState<string[]>([
        props.messages.words.app_signed_state,
        props.messages.words.app_unsigned_state,
        props.messages.words.empty_room,
    ]);

    const handleChangeItems = (items: string[]) => {
        if (items.find((value) => value === props.messages.words.all)) {
            props.onChangeFilterCondition("status", changeWordToType(status));
        } else {
            props.onChangeFilterCondition("status", changeWordToType(items));
        }
    };

    const changeWordToType = (words: string[]): string[] => {
        return words.map((word) => {
            switch (word) {
                case props.messages.words.app_signed_state:
                    return "signed";
                case props.messages.words.app_unsigned_state:
                    return "unsigned";
                case props.messages.words.empty_room:
                    return "empty";
                default:
                    return "";
            }
        });
    };

    return <HorizontalFilter items={status} onChangeSelectedItems={handleChangeItems} useSelectAll />;
}

type StatusFilterProps = FilterDefaultProps;
