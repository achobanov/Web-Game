import { IEvent } from "../services/events-service";
import { MouseButton } from "../enums/mouse-button";

export default class MouseClickEvent implements IEvent {
    key: string = 'mouse-click';
    button: MouseButton;

    constructor(button: MouseButton) {
        this.button = button;
    }
}