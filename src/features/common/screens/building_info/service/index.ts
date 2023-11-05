import useUserInformation from "../../../hooks/service/user_info";

export default function useBuildingInfoProvider() {
    const user = useUserInformation();

    if (user === null) return null;

    class BuildingInfoProvider {}
}

interface Building {
    address: string;
    name: string;
}
