import ExplosionPathName from "../../assets/explosion.png";
import Entity from "./base/entity";
import EventsService from "../services/events-service";
import AssetsService from "../services/assets-service";
import ExplosionEndEvent from "../events/explosion-end-event";

export default class Rocket extends Entity {
    _events: EventsService;

    constructor(
        events: EventsService,
        assets: AssetsService,
        uid: string,
        z: number,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
    ) {
        super(assets, ExplosionPathName, uid, z, x, y, width, height, speed);

        this._events = events;
    }

    update(dT: number) : void {
        if (this._hasExploded())
            this._end();

        super.update(dT);
    }

    _hasExploded() { return this._frameIndex === this._frames.length - 1 }

    _end() {
        this._events.publish(new ExplosionEndEvent(this.uid));
    }
}