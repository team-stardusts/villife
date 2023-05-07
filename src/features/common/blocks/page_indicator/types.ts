export type PageIndicatorsProps = {
    length: number;
    currentIndex: PageIndicatorsProps["length"];
    size: number;
};

export type IndicatorProps = {
    isOn: boolean;
    size: PageIndicatorsProps["size"];
};
