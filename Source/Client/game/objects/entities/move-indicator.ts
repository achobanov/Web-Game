import Circle from "../shapes/circle";
import EventsService from "../../services/events-service";
import RemoveObjectEvent from "../../events/remove-object-event";

export default class MoveIndicator extends Circle {
    _events: EventsService;
    _activeDuration: number;
    _passedTime: number;
    _frameRate: number;

    constructor(
        events: EventsService,
        id: string,
        x: number,
        y: number,
        radius: number,
        alpha?: number,
        fill?: string,
        stroke?: string,
    ) {
        super(id, x, y, radius, fill, stroke, alpha);

        this._events = events;
        this._activeDuration = 0.5;
        this._passedTime = 0;
        this._frameRate = 35;
    }

    update(dT: number) {
        this._passedTime += dT;
        if (this._passedTime >= this._activeDuration)
            this._events.publish(new RemoveObjectEvent(this.id));

        this.radius += this._frameRate * dT;
        if (this.alpha)
            this.alpha = this.alpha - dT;
    }
}