import React, { useEffect } from "react";
import NavigationView from "../../../../../../common/blocks/navigation";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import ExpenseApprovalScreenProps from "./type";
import useUserInformation from "../../../../../../common/hooks/service/user_info";

export default function ExpenseApprovalScreen(props: ExpenseApprovalScreenProps) {
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
