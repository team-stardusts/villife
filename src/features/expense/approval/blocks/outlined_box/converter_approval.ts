import { RequestCotent3001 } from "../../../../../libs/rest_apis/villife/approval/content_type";
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
        console.log("this.request : ", this.request);
        switch (identifier) {
            case 3001:
                const approvalContent3001 = JSON.parse(this.request.content) as unknown as RequestCotent3001;
                console.log("approvalContent3001 : ", approvalContent3001);
                const detailArray3001: DetailContents = [];
                detailArray3001.push({
                    title: message.messages.main.approval.building_name,
                    content: approvalContent3001.building_name,
                });
                detailArray3001.push({
                    title: message.messages.main.approval.room_number,
                    content: approvalContent3001.room_number,
                });
                detailArray3001.push({
                    title: message.messages.main.approval.user_name,
                    content: approvalContent3001.room_id,
                });
                console.log("detailArray3001 : ", detailArray3001);

                const convertedApprovalRequest3001: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    updatedAt: this.request.updated_at,
                    roomNumber: approvalContent3001.room_number,
                    buildingName: approvalContent3001.building_name,
                    title: message.messages.main.approval.title_1001,
                    subTitle: message.messages.main.approval.sub_title,
                    detailContent: detailArray3001,
                };

                return convertedApprovalRequest3001;
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
