import React from "react";
import NavigationView from "../../../../common/blocks/navigation";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import ExpenseApprovalScreenProps from "./type";

export default function ExpenseApprovalScreen(props: ExpenseApprovalScreenProps) {
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: "관리비 요청함",
            }}
            bodyOptions={{
                applyDefaultHorizontalPadding: false,
                applyDefaultVerticalPadding: false,
            }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
