import Entity from "./base/entity";
import { IRenderable } from "../services/render-service";
import EventsService, { IEvent } from "../services/events-service";
import MouseClickEvent from "../events/mouse-click-event";
import MouseMoveEvent from "../events/mouse-move-event";

export default class Soldier extends Entity {
    _events: EventsService;
    _isMoving: boolean;

    constructor(
        events: EventsService,
        uid: string,
        z: number,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
        imageKey: string,
        frames: IRenderable[],
        frameRate: number,
        frameIndex?: number,
    ) {
        super(uid, z, x, y, width, height, speed, imageKey, frames, frameRate, frameIndex);

        this._events = events;
        this._isMoving = false;

        this._events.subscribe(MouseMoveEvent.Key, this._move);
        this._events.subscribe(MouseClickEvent.Key, this._stop);
    }

    update = (dT: number) : void => {
        if (this._isMoving) {
            this.x += this._speed * dT;
        }

        this._changeFrame(dT);
    }

    _move = (event: IEvent) => {
        this._isMoving = true;
    }

    _stop = (event: IEvent) => {
        this._isMoving = false;
    }
}