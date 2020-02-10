import { IEvent } from "../services/events-service";
import { MouseButton } from "../enums/mouse-button";
import { ICursorData } from "../services/input-service";

export default class MouseClickEvent implements IEvent {
    static Key = 'mouse-click';

    key = MouseClickEvent.Key;
    button: MouseButton;
    cursor: ICursorData;

    constructor(button: MouseButton, cursor: ICursorData) {
        this.button = button;
        this.cursor = cursor;
    }
}