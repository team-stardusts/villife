import { FunctionComponent } from "react";

export type NavigationViewHeaderProps = {
    title: string;
    navComponent?: FunctionComponent<any>;
    navComponentProps?: {
        [key: string]: any;
    };
};
