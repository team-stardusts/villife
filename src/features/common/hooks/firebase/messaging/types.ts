import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export type MessagingEvent =
    | "new-noti-registration"
    | "new-complaint-registration"
    | "new-vehicle-registration"
    | "management-fee-deposit-confirmation"
    | "management-fee-deposit-confirmation-refused"
    | "vehicle-parking-notification"
    | "vehicle-registration-approval-notification"
    | "residence-approved";
/* | "double-parking"
| "change-request" */

export type MessagingEventData = FirebaseMessagingTypes.NotificationPayload;
