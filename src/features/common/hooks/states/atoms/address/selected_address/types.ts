export type SelectedAddressStateType = SelectedAddressType | null;

export type SelectedAddressType = {
    roadAddress: string;
    jibunAddress: string;
    buildingCode: number;
    buildingName: string;
    zonecode: number;
};

export default SelectedAddressStateType;
