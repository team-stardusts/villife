import MiniContent from "../../../../common/blocks/mini_content";
import useHomeScreenContentStyles from "../../../../common/blocks/mini_content/styles";

export default function HomeContentApproval() {
    const contentStyles = useHomeScreenContentStyles();

    contentStyles.container.height = contentStyles.container.height * 0.3;
    contentStyles.navigationBox.paddingBottom = 0;

    return (
        <MiniContent
            title="승인함"
            styles={contentStyles}
            navigation={{ to: "approval_home", params: {} }}
            eanbleShadow={false}
        />
    );
}
