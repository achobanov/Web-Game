import RocketImagePath from "../../../assets/rocket.png";
import Entity from "./entity";
import EventsService from "../../services/events-service";
import AssetsService from "../../services/assets-service";
import Explosion from "./explosion";
import utils from "../../utils/utils";
import AddObjectEvent from "../../events/add-object-event";
import RemoveObjectEvent from "../../events/remove-object-event";

export default class Rocket extends Entity {
    _events: EventsService;

    constructor(
        events: EventsService,
        assets: AssetsService,
        x: number, 
        y: number, 
        angle: number,
        destinationX: number,
        destinationY: number,
    ) {
        super(assets, RocketImagePath, utils.uId(), 90, x, y, 20, 45, 550);

        this._events = events;

        this.angle = angle;
        this._isMoving = true;
        this._desination = { x: destinationX, y: destinationY };
    }

    update(dT: number) : void {
        if (this._shouldExplode())
            this._explode();

        super.update(dT);
    }

    _shouldExplode() { return this.x === this._desination.x && this.y === this._desination.y }

    _explode() {
        const explosion = new Explosion(this._events, this._assets, this.x, this.y, this.angle);
        
        this._events.publish(new AddObjectEvent(explosion));
        this._events.publish(new RemoveObjectEvent(this.id));
    }
}