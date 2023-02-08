declare namespace ThemeTypes {
    interface ITheme {
        /*
        colors: {
            pallet: any;
    
        };
        css: {
    
        };
        */
    };

    interface IThemes {
        DarkTheme: ITheme;
        LightTheme: ITheme;
    }
}

export declare type UseAppThemeReturnType = ThemeTypes.ITheme;

export default ThemeTypes;