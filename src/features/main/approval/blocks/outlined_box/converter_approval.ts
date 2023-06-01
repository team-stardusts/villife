import { RequestCotent1001, RequestCotent2001 } from "../../../../../libs/rest_apis/villife/approval/content_type";
import { Approval } from "../../../../../libs/rest_apis/villife/approval/types";

export class ApprovalDataConverter {
    private requset: Approval;

    constructor(requst: Approval) {
        this.requset = requst;
    }

    convert(): ConvertedApprovalData {
        const identifier = this.requset.category * 1000 + this.requset.detail_type;
        console.log(identifier);
        switch (identifier) {
            case 1001:
                const approvalContent1001 = this.requset.content as RequestCotent1001;

                const detailArray1001: DetailContents = [];
                detailArray1001.push({ title: "ID", content: approvalContent1001.user_id });
                detailArray1001.push({ title: "빌라 이름", content: approvalContent1001.building_name });
                detailArray1001.push({ title: "호수", content: approvalContent1001.room_number });
                detailArray1001.push({ title: "이름", content: approvalContent1001.user_name });
                detailArray1001.push({ title: "전화번호", content: approvalContent1001.user_phone_number });

                const convertedApprovalRequest1001: ConvertedApprovalData = {
                    id: this.requset.id,
                    category: this.requset.category,
                    detailType: this.requset.detail_type,
                    createdAt: this.requset.createAt,
                    roomNumber: approvalContent1001.room_number,
                    buildingName: approvalContent1001.building_name,
                    title: approvalContent1001.title,
                    subTitle: approvalContent1001.sub_title,
                    detailContent: detailArray1001,
                };
                return convertedApprovalRequest1001;

            case 2001:
                const approvalContent2001 = this.requset.content as RequestCotent2001;

                const detailArray2001: DetailContents = [];
                detailArray2001.push({ title: "빌라이름", content: approvalContent2001.building_name });
                detailArray2001.push({ title: "호수", content: approvalContent2001.room_number });
                detailArray2001.push({ title: "차량 번호", content: approvalContent2001.vehicle_number });
                detailArray2001.push({ title: "차량 모델", content: approvalContent2001.vehicle_model });

                const convertedApprovalRequest2001: ConvertedApprovalData = {
                    id: this.requset.id,
                    category: this.requset.category,
                    detailType: this.requset.detail_type,
                    createdAt: this.requset.createAt,
                    roomNumber: approvalContent2001.room_number,
                    buildingName: approvalContent2001.building_name,
                    title: approvalContent2001.title,
                    subTitle: approvalContent2001.sub_title,
                    detailContent: detailArray2001,
                };
                return convertedApprovalRequest2001;

            default:
                return {
                    id: this.requset.id,
                    category: this.requset.category,
                    detailType: this.requset.detail_type,
                    createdAt: this.requset.createAt,
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
