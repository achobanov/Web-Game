import Entity from "./base/entity";
import { IRenderable } from "../services/render-service";
import EventsService from "../services/events-service";

export default class Soldier extends Entity {
    _events: EventsService;

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

        this._events.subscribe()
    }

    update = (dT: number) : void => {

        this._changeFrame(dT);
    }
}