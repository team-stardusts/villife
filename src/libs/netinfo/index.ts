import { IEventListenable } from "../../features/common/global_interface";
import NetInfo, { NetInfoState, NetInfoSubscription } from "@react-native-community/netinfo";
import { NetInfoEvents } from "./types";

class NetInfoEventHandler implements IEventListenable<NetInfoEvents, NetInfoState> {
    private _subscriptionInfos: NetInfoSubscription[] = [];

    public listen(
        eventName: NetInfoEvents,
        callback: (eventName: NetInfoEvents, eventData: NetInfoState) => void
    ): void {
        this._subscriptionInfos.push(NetInfo.addEventListener((state) => callback(eventName, state)));
    }

    public listenAllEvents(callback: (eventName: NetInfoEvents, eventData: NetInfoState) => void): void {
        this._subscriptionInfos.push(NetInfo.addEventListener((state) => callback("changed", state)));
    }

    public removeAllListeners(): void {
        for (let i = 0; i < this._subscriptionInfos.length; i++) {
            this._subscriptionInfos[i]();
        }
    }
}

export default NetInfoEventHandler;
