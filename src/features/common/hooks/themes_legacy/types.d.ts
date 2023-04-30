declare namespace ThemeTypes {
    type test = "normal" | "italic" | undefined;
    interface ITheme {
        colors: {
            pallet: any;
            colorFamily: {
                black: string;
                blue: string;
                darkgrey: string;
                green: string;
                grey: string;
                lightblue: string;
                lightgrey: string;
                red: string;
                white: string;
            };
        };
        fonts: {
            title1: {
                fortFamily: string;
                fontSize: Number;
            };
            title2: {
                fortFamily: string;
                fontSize: Number;
            };
            body1: {
                fortFamily: string;
                fontSize: Number;
            };
            body2: {
                fortFamily: string;
                fontSize: Number;
            };
            subTitle1: {
                fortFamily: string;
                fontSize: Number;
            };
            caption1: {
                fortFamily: string;
                fontSize: Number;
            };
            caption2: {
                fortFamily: string;
                fontSize: Number;
            };
            caption3: {
                fortFamily: string;
                fontSize: Number;
            };
        };
    }
    interface IThemes {
        DarkTheme: ITheme;
        LightTheme: ITheme;
    }
}

export declare type UseAppThemeReturnType = ThemeTypes.ITheme;

export default ThemeTypes;
