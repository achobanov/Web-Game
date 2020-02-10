import { IEntity } from "../objects/entities/entity";

export interface IEvent {
    key: string,
}

export interface IEventHandler {
    (event: any) : void;
}

export default class EventsService {
    _subscriptions: { [key: string]: IEventHandler[] } = {}

    publish = (event: IEvent) =>
        this._subscriptions[event.key]?.forEach(handle => handle(event));

    subscribe = (key: string, handler: IEventHandler) => {
        var subscriptions = this._subscriptions[key];
        if (subscriptions) {
            subscriptions.push(handler);
        } else {
            this._subscriptions[key] = [ handler ];
        }
    }
}