import { IEvent } from "../services/events-service";

export default class ExplosionEndEvent implements IEvent{
    static Key = 'exposion-end';
    
    key = ExplosionEndEvent.Key;
    explosionId: string;

    constructor(explosionId: string) {
        this.explosionId = explosionId;
    }
}