namespace VillifeComplaint {
    export interface Client {
        createComplaint(content: string, title: string): Promise<string>;
        createReply(params: ReplyCreationForm): Promise<string>;
        deleteComplaint(complaintId: number): Promise<string>;
        getOneComplaint(complaintId: number): Promise<Complaint>;
        getUserComplaints(status: ComplaintStatus): Promise<Complaint[]>;
        getBuildingComplaints(buildingId: number, status: ComplaintStatus): Promise<Complaint[]>;
        updateComplaint(params: ComplaintUpdateForm): Promise<string>;
        getReplies(complaintId: number): Promise<Reply[]>;
        updateReply(params: ReplyUpdateForm): Promise<string>;
        deleteReply(replyId: number): Promise<string>;
    }

    export type Complaint = {
        id: number;
        content: string;
        status: ComplaintStatus;
        title: string;
        buildingName: string;
        complainantName: string;
        createdAt: string;
        updatedAt: string;
        phoneNumber: string;
        roomNumber: number;
    };

    export type ComplaintStatus = "received" | "in_progress" | "completed";

    export type ComplaintUpdateForm = {
        complaintId: number;
        content: string;
        status: ComplaintStatus;
        title: string;
    };

    export type Reply = {
        id: number;
        writerName: string;
        content: string;
        imageUris: string;
        writtedAt: string;
    };

    export type ReplyCreationForm = {
        complaintId: number;
        content: string;
        imageUris: string[];
    };

    export type ReplyUpdateForm = {
        replyId: number;
        content: string;
        imageUris: string[];
    };
}

export default VillifeComplaint;
