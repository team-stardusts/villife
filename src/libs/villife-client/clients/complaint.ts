import VillifeClientCommon from "../absc";
import Villife from "../types";

class VillifeComplaint extends VillifeClientCommon implements Villife.Complaint.Client {
    public async createComplaint(content: string, title: string): Promise<string> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.complaint.createComplaint,
            data: {
                content,
                title,
            },
        });
    }

    public async createReply(params: Villife.Complaint.ReplyCreationForm): Promise<string> {
        let stringUris = "";

        params.imageUris.map((uri) => {
            stringUris += `${uri},`;
        });

        const convertedParams = {
            complaintId: params.complaintId,
            content: params.content,
            imageUris: stringUris,
        };

        return this.requestWithCredential({
            method: "post",
            url: this._routes.complaint.reply,
            data: convertedParams,
        });
    }

    public async deleteComplaint(complaintId: number): Promise<string> {
        //const query = `?reply_id=${replyID}`;
        return this.requestWithCredential({
            method: "post",
            url: this._routes.complaint.deleteComplaint,
            data: {
                complaintId,
            },
        });
    }

    public async deleteReply(replyId: number): Promise<string> {
        //const query = `?reply_id=${replyID}`;
        return this.requestWithCredential({
            method: "delete",
            url: this._routes.complaint.reply,
            params: {
                replyId,
            },
        });
    }

    public async getBuildingComplaints(
        buildingId: number,
        status: Villife.Complaint.ComplaintStatus
    ): Promise<Villife.Complaint.Complaint[]> {
        //const qurey = `?status=${params.status}&building_id=${params.building_id}`;
        return this.requestWithCredential({
            method: "get",
            url: this._routes.complaint.getBuildingComplaints,
            params: {
                buildingId,
                status,
            },
        });
    }

    public async getOneComplaint(complaintId: number): Promise<Villife.Complaint.Complaint> {
        //const route: string = this._routes.complaint.getOneComplaint + `?complaint_id=${complaintId}`;
        return this.requestWithCredential({
            method: "get",
            url: this._routes.complaint.getOneComplaint,
            params: {
                complaintId,
            },
        });
    }

    public async getReplies(complaintId: number): Promise<Villife.Complaint.Reply[]> {
        //const query = `?complaint_id=${complaintID}`;
        return this.requestWithCredential({
            method: "get",
            url: this._routes.complaint.reply,
            params: {
                complaintId,
            },
        });
    }

    public async getUserComplaints(status: Villife.Complaint.ComplaintStatus): Promise<Villife.Complaint.Complaint[]> {
        //const qurey = `?status=${params.status}`;
        return this.requestWithCredential({
            method: "get",
            url: this._routes.complaint.getUserComplaints,
            params: {
                status,
            },
        });
    }

    public async updateComplaint(params: Villife.Complaint.ComplaintUpdateForm): Promise<string> {
        return this.requestWithCredential({
            method: "post",
            url: this._routes.complaint.updateComplaint,
            data: params,
        });
    }

    public async updateReply(params: Villife.Complaint.ReplyUpdateForm): Promise<string> {
        let stringUris = "";

        params.imageUris.map((uri) => {
            stringUris += `${uri},`;
        });

        const convertedParams = {
            replyId: params.replyId,
            content: params.content,
            imageUris: stringUris,
        };

        return this.requestWithCredential({
            method: "patch",
            url: this._routes.complaint.reply,
            data: convertedParams,
        });
    }
}

export default VillifeComplaint;
