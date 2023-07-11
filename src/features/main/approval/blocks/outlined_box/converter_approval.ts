import {
    RequestCotent1001,
    RequestCotent2001or2002,
} from "../../../../../libs/rest_apis/villife/approval/content_type";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";
import useScreenMessage from "../../../../common/hooks/multilingual/hooks";

export class ApprovalDataConverter {
    private request: Approval;

    constructor(request: Approval) {
        this.request = request;
    }

    convert(): ConvertedApprovalData {
        const message = useScreenMessage();
        const identifier = this.request.category * 1000 + this.request.detail_type;

        switch (identifier) {
            case 1001:
                const approvalContent1001 = JSON.parse(this.request.content) as unknown as RequestCotent1001;

                const detailArray1001: DetailContents = [];
                detailArray1001.push({
                    title: message.messages.main.approval.building_name,
                    content: approvalContent1001.building_name,
                });
                detailArray1001.push({
                    title: message.messages.main.approval.room_number,
                    content: approvalContent1001.room_number,
                });
                detailArray1001.push({
                    title: message.messages.main.approval.user_name,
                    content: approvalContent1001.user_name,
                });
                detailArray1001.push({
                    title: message.messages.main.approval.phone_number,
                    content: approvalContent1001.phone_number,
                });

                const convertedApprovalRequest1001: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: approvalContent1001.room_number,
                    buildingName: approvalContent1001.building_name,
                    title: message.messages.main.approval.title_1001,
                    subTitle: message.messages.main.approval.sub_title,
                    detailContent: detailArray1001,
                };

                console.log("보여줘", convertedApprovalRequest1001);

                return convertedApprovalRequest1001;

            case 2001:
                const approvalContent2001 = this.request.content as unknown as RequestCotent2001or2002;

                const detailArray2001: DetailContents = [];
                detailArray2001.push({
                    title: message.messages.main.approval.building_name,
                    content: approvalContent2001.building_name,
                });
                detailArray2001.push({
                    title: message.messages.main.approval.room_number,
                    content: approvalContent2001.room_number,
                });
                detailArray2001.push({
                    title: message.messages.main.approval.vehicle_number,
                    content: approvalContent2001.vehicle_number,
                });
                detailArray2001.push({
                    title: message.messages.main.approval.vehicle_model,
                    content: approvalContent2001.vehicle_model,
                });

                const convertedApprovalRequest2001: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: approvalContent2001.room_number,
                    buildingName: approvalContent2001.building_name,
                    title: message.messages.main.approval.title_2001,
                    subTitle: message.messages.main.approval.sub_title,
                    detailContent: detailArray2001,
                };
                return convertedApprovalRequest2001;

            case 2002:
                const approvalContent2002 = this.request.content as unknown as RequestCotent2001or2002;

                const detailArray2002: DetailContents = [];
                detailArray2002.push({
                    title: message.messages.main.approval.building_name,
                    content: approvalContent2002.building_name,
                });
                detailArray2002.push({
                    title: message.messages.main.approval.room_number,
                    content: approvalContent2002.room_number,
                });
                detailArray2002.push({
                    title: message.messages.main.approval.vehicle_number,
                    content: approvalContent2002.vehicle_number,
                });
                detailArray2002.push({
                    title: message.messages.main.approval.vehicle_model,
                    content: approvalContent2002.vehicle_model,
                });

                const convertedApprovalRequest2002: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: approvalContent2002.room_number,
                    buildingName: approvalContent2002.building_name,
                    title: message.messages.main.approval.title_2002,
                    subTitle: message.messages.main.approval.sub_title,
                    detailContent: detailArray2002,
                };
                return convertedApprovalRequest2002;

            default:
                return {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: 111,
                    buildingName: "아무개",
                    title: "default 값",
                    subTitle: "ㅎㅎㅎ",
                    detailContent: [],
                };
        }
    }
}

export type ConvertedApprovalData = {
    id: number;
    category: number;
    detailType: number;
    roomNumber: number;
    buildingName: string;
    title: string;
    subTitle: string;
    detailContent: DetailContents;
    createdAt: number;
    updatedAt: number;
};

type DetailContents = Array<DetailContent>;
type DetailContent = {
    title: string;
    content: string | number;
};
