import useStyler from "../../../hooks/styler/hooks";
import useNavigationViewStyles from "../styles";
import { ISpaceSize, SafetyScreenSize, UseNavigationViewSpaceProps } from "./types";

export default function useNavigationViewSpace(props: UseNavigationViewSpaceProps): ISpaceSize {
    const { deviceUI, safetyEdgeSize } = useStyler();

    const navViewStyles = useNavigationViewStyles({
        applyDefaultHorizontalPadding: props.applyDefaultHorizontalPadding,
        applyDefaultVerticalPadding: props.applyDefaultVerticalPadding,
    });

    class NavigationViewSpace implements ISpaceSize {
        private readonly _safetySpace: SafetyScreenSize = {
            width: deviceUI.getScreenSize().width - (safetyEdgeSize.left + safetyEdgeSize.right),
            height: deviceUI.getScreenSize().height - (safetyEdgeSize.top + safetyEdgeSize.bottom),
        };
        private readonly _headerRatio: number = navViewStyles.HeaderConatiner.flex;
        //private readonly _bodyRatio: number = navViewStyles.bodyContainer.flex;
        private readonly _bottomRatio: number = navViewStyles.bottomContainer.flex;
        private readonly _options: UseNavigationViewSpaceProps = props;

        get width(): number {
            // Horizontal Padding이기 때문에 2를 곱함
            return this._safetySpace.width - navViewStyles.bodyContainer.paddingHorizontal * 2;
        }

        get height(): number {
            let _height = this._safetySpace.height;

            if (this._options.isHeaderShown) _height -= this._safetySpace.height * this._headerRatio;
            if (this._options.isBottomNavShown) _height -= this._safetySpace.height * this._bottomRatio;

            // Vertical Padding이기 때문에 2를 곱함
            return _height - navViewStyles.bodyContainer.paddingVertical * 2;
        }
    }

    return new NavigationViewSpace();
}
