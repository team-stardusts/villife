import { RequestCotent3001 } from "../../../../../../../libs/rest_apis/villife/approval/content_type";
import { Approval } from "../../../../../../../libs/rest_apis/villife/approval/types";
import { insertCommaToNumber } from "../../../../../../common/global_function";
import useScreenMessage from "../../../../../../common/hooks/multilingual/hooks";

export class ApprovalDataConverter {
    private request: Approval;

    constructor(request: Approval) {
        this.request = request;
    }

    convert(): ConvertedApprovalData | null {
        const identifier = this.request.category * 1000 + this.request.detail_type;
        console.log("this.request : ", this.request);

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString().slice(0, 2).replace("/", "");

        switch (identifier) {
            case 3001:
                const approvalContent3001 = JSON.parse(this.request.content) as unknown as RequestCotent3001;
                console.log("approvalContent3001 : ", approvalContent3001);
                const detailArray3001: DetailContents = [];

                detailArray3001.push({
                    title: "보낸 분 표시",
                    content: `${approvalContent3001.depositor_name}`,
                });
                detailArray3001.push({
                    title: "금액",
                    content: `${insertCommaToNumber(approvalContent3001.amount_won)}원`,
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
                    title: `${approvalContent3001.room_number}호 관리비 납부 확인 요청`,
                    subTitle: "내용 확인 후 승인해주세요.", //상세내역 확인 후 승인해주세요.
                    detailContent: detailArray3001,
                };

                return convertedApprovalRequest3001;
            default:
                return null;
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
