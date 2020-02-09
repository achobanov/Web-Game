import RocketImagePath from "../../assets/rocket.png";
import Entity from "./base/entity";
import EventsService from "../services/events-service";
import AssetsService from "../services/assets-service";
import Explosion from "./explosion";
import utils from "../utils/utils";
import AddEntityEvent from "../events/add-entity-event";
import RemoveEntityEvent from "../events/remove-entity-event";

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
        angle: number,
        speed: number,
        destinationX: number,
        destinationY: number,
    ) {
        super(assets, RocketImagePath, uid, z, x, y, width, height, speed);

        this._events = events;

        this.angle = angle;
        this._isMoving = true;
        this._desination = { x: destinationX, y: destinationY };
    }

    update(dT: number) : void {
        if (this._hasReachedDestination())
            this._explode();

        super.update(dT);
    }

    _hasReachedDestination() { return this.x === this._desination.x && this.y === this._desination.y }

    _explode() {
        const explosion = new Explosion(this._events, this._assets, utils.uId(), 200, this.x, this.y, 20, 20, 0);

        this._events.publish(new AddEntityEvent(explosion));
        this._events.publish(new RemoveEntityEvent(this.uid));
    }
}