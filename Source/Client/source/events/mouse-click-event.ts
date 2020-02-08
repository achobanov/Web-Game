import { IEvent } from "../services/events-service";
import { MouseButton } from "../enums/mouse-button";

export default class MouseClickEvent implements IEvent {
    static Key = 'mouse-click';

    key = MouseClickEvent.Key;
    button: MouseButton;

    constructor(button: MouseButton) {
        this.button = button;
    }
}