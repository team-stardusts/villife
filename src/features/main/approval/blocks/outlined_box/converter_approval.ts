import { RequestCotent1001, RequestCotent2001 } from "../../../../../libs/rest_apis/villife/approval/content_type";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

export class ApprovalDataConverter {
    private request: Approval;

    constructor(request: Approval) {
        this.request = request;
    }

    convert(): ConvertedApprovalData {
        const identifier = this.request.category * 1000 + this.request.detail_type;

        switch (identifier) {
            case 1001:
                const approvalContent1001 = this.request.content as RequestCotent1001;

                const detailArray1001: DetailContents = [];
                detailArray1001.push({ title: "ID", content: approvalContent1001.user_id });
                detailArray1001.push({ title: "빌라 이름", content: approvalContent1001.building_name });
                detailArray1001.push({ title: "호수", content: approvalContent1001.room_number });
                detailArray1001.push({ title: "이름", content: approvalContent1001.user_name });
                detailArray1001.push({ title: "전화번호", content: approvalContent1001.user_phone_number });

                const convertedApprovalRequest1001: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    roomNumber: approvalContent1001.room_number,
                    buildingName: approvalContent1001.building_name,
                    title: approvalContent1001.title,
                    subTitle: approvalContent1001.sub_title,
                    detailContent: detailArray1001,
                };
                return convertedApprovalRequest1001;

            case 2001:
                const approvalContent2001 = this.request.content as RequestCotent2001;

                const detailArray2001: DetailContents = [];
                detailArray2001.push({ title: "빌라이름", content: approvalContent2001.building_name });
                detailArray2001.push({ title: "호수", content: approvalContent2001.room_number });
                detailArray2001.push({ title: "차량 번호", content: approvalContent2001.vehicle_number });
                detailArray2001.push({ title: "차량 모델", content: approvalContent2001.vehicle_model });

                const convertedApprovalRequest2001: ConvertedApprovalData = {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
                    roomNumber: approvalContent2001.room_number,
                    buildingName: approvalContent2001.building_name,
                    title: approvalContent2001.title,
                    subTitle: approvalContent2001.sub_title,
                    detailContent: detailArray2001,
                };
                return convertedApprovalRequest2001;

            default:
                return {
                    id: this.request.id,
                    category: this.request.category,
                    detailType: this.request.detail_type,
                    createdAt: this.request.create_at,
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
    createdAt: string;
};

type DetailContents = Array<DetailContent>;
type DetailContent = {
    title: string;
    content: string | number;
};
