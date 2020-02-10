import { IEvent } from "../services/events-service";
import IGameObject from "../objects/game-object";

export default class AddEntityEvent implements IEvent {
    static Key = 'add-entity';
    
    key = AddEntityEvent.Key;
    entity: IGameObject;

    constructor(entity: IGameObject) {
        this.entity = entity;
    }
}