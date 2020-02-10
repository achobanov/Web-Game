import { IEvent } from "../services/events-service";
import IGameObject from "../objects/game-object";

export default class AddObjectEvent implements IEvent {
    static Key = 'add-object';
    
    key = AddObjectEvent.Key;
    object: IGameObject;

    constructor(object: IGameObject) {
        this.object = object;
    }
}