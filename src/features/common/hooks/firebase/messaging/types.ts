import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type MessagingEvent =
    | "new-noti-registration"
    | "new-complaint-registration"
    | "new-vehicle-registration"
    | "management-fee-deposit-confirmation"
    | "vehicle-parking-notification"
    | "vehicle-registration-approval-notification"
    | "residence-approved";
/* | "double-parking"
| "change-request" */

export type MessagingEventData = FirebaseMessagingTypes.NotificationPayload;
