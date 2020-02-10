import ExplosionPathName from "../../../assets/explosion.png";
import Entity from "./entity";
import EventsService from "../../services/events-service";
import AssetsService from "../../services/assets-service";
import RemoveEntityEvent from "../../events/remove-object-event";

export default class Explosion extends Entity {
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
        angle: number,
        speed: number,
    ) {
        super(assets, ExplosionPathName, uid, z, x, y, width, height, speed);

        this._events = events;
        this.angle = angle;        
    }

    update(dT: number) : void {
        if (this._hasExploded())
            this._end();

        super.update(dT);
    }

    _hasExploded() { return this._frameIndex === this._frames.length - 1 }

    _end() {
        this._events.publish(new RemoveEntityEvent(this.id));
    }
}