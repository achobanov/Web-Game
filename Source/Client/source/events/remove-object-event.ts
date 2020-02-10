import { IEvent } from "../services/events-service";

export default class RemoveObjectEvent implements IEvent {
    static Key = 'remove-object';
    
    key = RemoveObjectEvent.Key;
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}