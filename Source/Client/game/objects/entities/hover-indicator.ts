import Circle from "../shapes/circle";
import EventsService from "../../services/events-service";
import MouseMoveEvent from "../../events/mouse-move-event";
import RemoveObjectEvent from "../../events/remove-object-event";
import MouseClickEvent from "../../events/mouse-click-event";
import { MouseButton } from "../../enums/mouse-button";

export default class HoverIndicator extends Circle {
    _events: EventsService;

    constructor(events: EventsService, id: string, x: number, y: number) {
        super(id, x, y, 10, '', 'white');

        this._events = events;
        this.alpha = 0.5;

        this._events.subscribe(MouseMoveEvent.Key, this._handleMouseMove);
        this._events.subscribe(MouseClickEvent.Key, this._handleMouseClick);
    }

    _handleMouseMove = ({ cursor }: MouseMoveEvent) => {
        const { x, y } = cursor;
        this._offsetCenter(x, y);
    }

    _handleMouseClick = ({ button }: MouseClickEvent) => {
        if (button === MouseButton.Left)
            this._events.publish(new RemoveObjectEvent(this.id));
    }
}