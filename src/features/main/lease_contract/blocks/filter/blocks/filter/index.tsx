import { FilterConditions, TenantFilterProps } from "./types";
import useBuildngManagementFilterViewModel from "./view_model";
import { useEffect, useState } from "react";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";
import { MenuType } from "../../types";
import FloorFilter from "./blocks/floor";
import ContractFilter from "./blocks/contract";
import StatusFilter from "./blocks/status";
import { BuildingRoomInfo } from "../../../../services/building_rooms/provider/types";
import useUserInformation from "../../../../../../common/hooks/service/user_info";

export default function TenantFilter(props: TenantFilterProps) {
    const messages = useScreenMessage().messages;
    const user = useUserInformation();
    const tenants = useBuildngManagementFilterViewModel();
    const expirations = ["expired", "imminent-expiration"];
    const [filteredTenants, setFilteredTenants] = useState<BuildingRoomInfo[]>([]);
    const [floors, setFloors] = useState<number[]>([]);
    const [conditions, setConditions] = useState<FilterConditions>({
        floor: null,
        contract: null,
        status: null,
        expiration: null,
    });

    useEffect(() => {
        setConditions({
            ...conditions,
            floor: null,
            contract: null,
            status: null,
            expiration: null,
        });
    }, [user?.adminInfomation?.selectedBuilding]);

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
        if (conditions.contract !== null) {
            _tenants = _tenants.filter((tenant) => {
                const findResult = conditions.contract?.find((cdnt) => cdnt === tenant.contractInfo.rentType);

                // Find result에 빈문자열이 있기 때문에 boolean 값으로 대체
                if (findResult === undefined) return false;

                return true;
            });
        }
        if (conditions.status !== null) {
            _tenants = _tenants.filter((tenant) => conditions.status?.find((cdnt) => cdnt === tenant.roomState));
        }
        if (conditions.expiration !== null) {
            _tenants = _tenants.filter((tenant) =>
                conditions.expiration?.find((cdnt) => cdnt === tenant.contractState)
            );
        }

        setFilteredTenants(_tenants);
    }, [conditions]);

    useEffect(() => {
        // 만료 필터는 별도의 스크롤 필터를 가지지 않으므로
        // 만료 선택 시 작동하도록 함
        if (props.type === "expiration") {
            setConditions({
                ...conditions,
                expiration: expirations,
            });
        } else {
            setConditions({
                ...conditions,
                expiration: null,
            });
        }
    }, [props.type]);

    const handleChangeFilter = (menu: MenuType, changedConditions: string[]) => {
        switch (menu) {
            case "floor":
                setConditions({
                    ...conditions,
                    floor: changedConditions,
                });
                break;
            case "contract":
                setConditions({
                    ...conditions,
                    contract: changedConditions,
                });
                break;
            case "status":
                setConditions({
                    ...conditions,
                    status: changedConditions,
                });
                break;
        }
    };

    switch (props.type) {
        case "floor":
            return <FloorFilter messages={messages} floors={floors} onChangeFilterCondition={handleChangeFilter} />;
        case "contract":
            return <ContractFilter messages={messages} onChangeFilterCondition={handleChangeFilter} />;
        case "status":
            return <StatusFilter messages={messages} onChangeFilterCondition={handleChangeFilter} />;
        /* case "expiration":
            return <></>; */
        default:
            return <></>;
    }
}
