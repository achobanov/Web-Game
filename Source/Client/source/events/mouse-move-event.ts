import { IEvent } from "../services/events-service";
import { ICursorData } from "../services/input-service";

export default class MouseMoveEvent implements IEvent {
    key: string = 'mouse-move';
    cursor : ICursorData;

    constructor(cursor: ICursorData) {
        this.cursor = cursor;
    }
}