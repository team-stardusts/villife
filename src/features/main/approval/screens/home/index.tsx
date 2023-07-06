import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import NavigationView from "../../../../common/blocks/navigation";
import ApprovaleHomeScreenProps from "./type";
import FlatListOutlinedContentsBox from "../../blocks/outlined_box_list";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";
import useUserInfoService from "../../../../common/hooks/service/user_info";
import { VILLIFE_AUTHORITY } from "../../../../../libs/rest_apis/villife/absc";
import useApprovalService from "../../services";

export default function ApprovalHomeScreen(props: ApprovaleHomeScreenProps) {
    const messages = useScreenMessage();

    return (
        <NavigationView
            headerOptions={{
                title: messages.messages.main.approval.screen_title,
            }}
            bottomNavOptions={{ shown: false }}>
            <FlatListOutlinedContentsBox />
        </NavigationView>
    );
}
