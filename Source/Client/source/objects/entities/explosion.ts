import ExplosionPathName from "../../../assets/explosion.png";
import Entity from "./entity";
import EventsService from "../../services/events-service";
import AssetsService from "../../services/assets-service";
import RemoveObjectEvent from "../../events/remove-object-event";
import utils from "../../utils/utils";

export default class Explosion extends Entity {
    _events: EventsService;

    constructor(events: EventsService, assets: AssetsService, x: number, y: number, angle: number) {
        super(assets, ExplosionPathName, utils.uId(), 80, x, y, 120, 120, 0);

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
        this._events.publish(new RemoveObjectEvent(this.id));
    }
}