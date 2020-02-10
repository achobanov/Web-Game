import Circle from "../shapes/circle";
import EventsService from "../../services/events-service";
import RemoveEntityEvent from "../../events/remove-entity-event";

export default class MoveIndicator extends Circle {
    _events: EventsService;
    _activeDuration: number;
    _passedTime: number;
    _frameRate: number;

    constructor(events: EventsService, id: string, x: number, y: number, radius: number, fill: string) {
        super(id, x, y, radius, fill);

        this._events = events;
        this._activeDuration = 0.5;
        this._passedTime = 0;
        this._frameRate = 30;
    }

    update(dT: number) {
        this._passedTime += dT;
        if (this._passedTime >= this._activeDuration)
            this._events.publish(new RemoveEntityEvent(this.id));

        this.radius += this._frameRate * dT;
    }
}