import { useEffect, useState } from "react";
import HorizontalFilter from "./horizontal_filter";
import { FilterDefaultProps } from "../types";

export default function FloorFilter(props: FloorFilterProps) {
    const [floors, setFloors] = useState<string[]>([]);

    useEffect(() => {
        setFloors(props.floors.map((floor) => floor.toString() + props.messages.words.floor));
    }, [props.floors]);

    const handleChangeItems = (items: string[]) => {
        if (items.find((value) => value === props.messages.words.all)) {
            // 숫자만 추출: 1층 -> 1
            const _floors = floors.map((item) => {
                const numbers = item.match(/(\d+)/);
                return numbers?.[0].toString() as string;
            });

            props.onChangeFilterCondition("floor", _floors);
        } else {
            // 숫자만 추출: 1층 -> 1
            const _floors = items.map((item) => {
                const numbers = item.match(/(\d+)/);
                return numbers?.[0].toString() as string;
            });

            props.onChangeFilterCondition("floor", _floors);
        }
    };

    return <HorizontalFilter items={floors} onChangeSelectedItems={handleChangeItems} useSelectAll />;
}

type FloorFilterProps = FilterDefaultProps & {
    floors: number[];
};
