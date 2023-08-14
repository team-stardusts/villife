import { View } from "react-native";
import useFilterStyles from "./styles";
import { TenantFilterProps } from "./types";
import useBuildngManagementFilterViewModel from "./view_model";
import { useEffect, useState } from "react";
import { BuildingTenant } from "../../../../services/types";
import HorizontalFilter from "./blocks/horizontal_filter";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { MenuType } from "../../types";

export default function TenantFilter(props: TenantFilterProps) {
    const messages = useScreenMessage().messages;
    const styles = useFilterStyles();
    const tenants = useBuildngManagementFilterViewModel();
    const [filteredTenants, setFilteredTenants] = useState<BuildingTenant[]>([]);
    const [floors, setFloors] = useState<number[]>([]);
    const [conditions, setConditions] = useState<Conditions>({
        floor: null,
    });

    useEffect(() => {
        props.onFilterChange(filteredTenants);
    }, [filteredTenants]);

    useEffect(() => {
        if (tenants.length === 0) return;

        let _floors: number[] = [];

        for (let i = 0; i < tenants.length; i++) {
            if (_floors.find((floor) => floor === tenants[i].floor) === undefined) {
                _floors.push(tenants[i].floor);
            }
        }

        setFloors(_floors.sort());

        setFilteredTenants(tenants);
    }, [tenants]);

    useEffect(() => {
        let _tenants = tenants;

        if (conditions.floor !== null) {
            _tenants = _tenants.filter((tenant) => conditions.floor?.find((cndt) => cndt === tenant.floor.toString()));
        }

        setFilteredTenants(_tenants);
    }, [conditions]);

    const handleChangeFilter = (menu: MenuType, changedConditions: string[]) => {
        switch (menu) {
            case "floor":
                setConditions({
                    ...conditions,
                    floor: changedConditions,
                });
        }
        /* switch (menu) {
            case "floor":
                setFilteredTenants(
                    filteredTenants.filter((tenant) => conditions.find((cndt) => cndt === tenant.floor.toString()))
                );
        } */
    };

    return (
        <View style={styles.main.container}>
            <FloorFilter messages={messages} floors={floors} onChangeFilterCondition={handleChangeFilter} />
        </View>
    );
}

function FloorFilter(props: FloorFilterProps) {
    const [floors, setFloors] = useState<string[]>([]);

    useEffect(() => {
        setFloors(props.floors.map((floor) => floor.toString() + "층"));
    }, [props.floors]);

    const handleChangeItems = (items: string[]) => {
        if (items.find((value) => value === "전체")) {
            const _floors = floors.map((item) => {
                const numbers = item.match(/(\d+)/);
                return numbers?.[0].toString() as string;
            });

            props.onChangeFilterCondition("floor", _floors);
        } else {
            const _floors = items.map((item) => {
                const numbers = item.match(/(\d+)/);
                return numbers?.[0].toString() as string;
            });

            props.onChangeFilterCondition("floor", _floors);
        }
    };

    return <HorizontalFilter items={floors} onChangeSelectedItems={handleChangeItems} useSelectAll />;
}

type FilterDefaultProps = {
    messages: ReturnType<typeof useScreenMessage>["messages"];
    onChangeFilterCondition(menu: MenuType, conditions: string[]): void;
};

type FloorFilterProps = FilterDefaultProps & {
    floors: number[];
};

type Conditions = {
    floor: string[] | null;
};
