import Circle from "../shapes/circle";
import EventsService from "../../services/events-service";
import MouseMoveEvent from "../../events/mouse-move-event";
import RemoveEntityEvent from "../../events/remove-entity-event";
import MouseClickEvent from "../../events/mouse-click-event";
import { MouseButton } from "../../enums/mouse-button";

export default class HoverIndicator extends Circle {
    _events: EventsService;

    constructor(events: EventsService, id: string, x: number, y: number, radius: number, fill: string) {
        super(id, x, y, radius, fill);

        this._events = events;

        this._events.subscribe(MouseMoveEvent.Key, this._handleMove);
        this._events.subscribe(MouseClickEvent.Key, this._handleClick);
    }

    _handleMove = ({ cursor }: MouseMoveEvent) => {
        const { x, y } = cursor;
        this._offsetCenter(x, y);
    }

    _handleClick = ({ button }: MouseClickEvent) => {
        if (button === MouseButton.Left)
            this._events.publish(new RemoveEntityEvent(this.id));
    }
}