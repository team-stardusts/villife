import {
    RequestCotent1001,
    RequestCotent1003or1004,
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

            case 1003:
                const approvalContent1003 = this.request.content as unknown as RequestCotent1003or1004;

                const detailArray1003: DetailContents = [];
                detailArray1003.push({
                    title: message.messages.main.approval.building_name,
                    content: approvalContent1003.building_name,
                });
                detailArray1003.push({
                    title: message.messages.main.approval.room_number,
                    content: approvalContent1003.room_number,
                });
                detailArray1003.push({
                    title: message.messages.main.approval.vehicle_number,
                    content: approvalContent1003.vehicle_number,
                });
                detailArray1003.push({
                    title: message.messages.main.approval.vehicle_model,
                    content: approvalContent1003.vehicle_model,
                });

                const convertedApprovalRequest1003: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: approvalContent1003.room_number,
                    buildingName: approvalContent1003.building_name,
                    title: message.messages.main.approval.title_1003,
                    subTitle: message.messages.main.approval.sub_title,
                    detailContent: detailArray1003,
                };
                return convertedApprovalRequest1003;

            case 1004:
                const approvalContent1004 = this.request.content as unknown as RequestCotent1003or1004;

                const detailArray1004: DetailContents = [];
                detailArray1004.push({
                    title: message.messages.main.approval.building_name,
                    content: approvalContent1004.building_name,
                });
                detailArray1004.push({
                    title: message.messages.main.approval.room_number,
                    content: approvalContent1004.room_number,
                });
                detailArray1004.push({
                    title: message.messages.main.approval.vehicle_number,
                    content: approvalContent1004.vehicle_number,
                });
                detailArray1004.push({
                    title: message.messages.main.approval.vehicle_model,
                    content: approvalContent1004.vehicle_model,
                });

                const convertedApprovalRequest1004: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: approvalContent1004.room_number,
                    buildingName: approvalContent1004.building_name,
                    title: message.messages.main.approval.title_1004,
                    subTitle: message.messages.main.approval.sub_title,
                    detailContent: detailArray1004,
                };
                return convertedApprovalRequest1004;

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
