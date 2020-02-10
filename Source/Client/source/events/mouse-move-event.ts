import { IEvent } from "../services/events-service";
import { ICursorData } from "../services/input-service";

export default class MouseMoveEvent implements IEvent {
    static Key = 'mouse-move';

    key = MouseMoveEvent.Key;
    cursor : ICursorData;

    constructor(cursor: ICursorData) {
        this.cursor = cursor;
    }
}