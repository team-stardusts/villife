import useScreenMessage from "../../hooks/multilingual/hooks";
import { RootLink } from "./types";

export default function useRootLinks(): RootLink[] {
    const message = useScreenMessage();
    return [
        {
            icon: "home",
            caption: message.messages.main.home.screen_title,
            screen: {
                name: "home",
                params: {},
            },
        },
        {
            icon: "building",
            caption: message.messages.main.lease_contract.home.screen_title,
            screen: {
                name: "lease_contract",
                params: {},
            },
        },
        {
            icon: "car",
            caption: message.messages.main.parking.home.screen_title,
            screen: {
                name: "parking",
                params: {},
            },
        },
        {
            icon: "wallet",
            caption: message.messages.main.payment.screen_title,
            screen: {
                name: "management_fee",
                params: {},
            },
        },
        {
            icon: "messenger",
            caption: message.messages.main.complaint.screen_title,
            screen: {
                name: "complaint",
                params: {},
            },
        },
        {
            icon: "person",
            caption: message.messages.main.mypage.screen_title,
            screen: {
                name: "my_page",
                params: {},
            },
        },
    ];
}
