import { IEvent } from "../services/events-service";
import { IEntity } from "../objects/sprites/entity";

export default class AddEntityEvent implements IEvent {
    static Key = 'add-entity';
    
    key = AddEntityEvent.Key;
    entity: IEntity;

    constructor(entity: IEntity) {
        this.entity = entity;
    }
}