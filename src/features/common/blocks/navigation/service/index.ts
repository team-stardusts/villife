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
        // 총 합이 10인 flex를 총 합이 1이 되도록 10을 나눔
        private readonly _headerRatio: number = navViewStyles.HeaderConatiner.flex / 10;
        private readonly _bodyRatio: number = navViewStyles.bodyContainer.flex / 10;
        private readonly _bottomRatio: number = navViewStyles.bottomContainer.flex / 10;
        private readonly _options: UseNavigationViewSpaceProps = props;

        get width(): number {
            // Horizontal Padding이기 때문에 2를 곱함
            return this._safetySpace.width - navViewStyles.bodyContainer.paddingHorizontal * 2;
        }

        get height(): number {
            let _height = this._safetySpace.height;

            if (this._options.isHeaderShown) _height -= this._safetySpace.height * this.getHeaderRatio();
            if (this._options.isBottomNavShown) _height -= this._safetySpace.height * this.getBottomRatio();

            // Vertical Padding이기 때문에 2를 곱함
            return _height - navViewStyles.bodyContainer.paddingVertical * 2;
        }

        private getHeaderRatio(): number {
            if (this._options.isHeaderShown && this._options.isBottomNavShown) {
                return this._headerRatio;
            } else if (this._options.isHeaderShown) {
                return this._headerRatio / (this._headerRatio + this._bodyRatio);
            } else {
                return 0;
            }
        }

        private getBottomRatio(): number {
            if (this._options.isHeaderShown && this._options.isBottomNavShown) {
                return this._bottomRatio;
            } else if (this._options.isBottomNavShown) {
                return this._bottomRatio / (this._bottomRatio + this._bodyRatio);
            } else {
                return 0;
            }
        }
    }

    return new NavigationViewSpace();
}
