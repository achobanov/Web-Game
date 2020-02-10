import { IEvent } from "../services/events-service";

export default class RemoveEntityEvent implements IEvent {
    static Key = 'remove-entity';
    
    key = RemoveEntityEvent.Key;
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}