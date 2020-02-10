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
        if (this._hasReachedDestination())
            this._explode();

        super.update(dT);
    }

    _hasReachedDestination() { return this.x === this._desination.x && this.y === this._desination.y }

    _explode() {
        const id = utils.uId();
        const z = 200;
        const width = 120;
        const height = 120;
        const speed = 0;

        const explosion = new Explosion(
            this._events, 
            this._assets, 
            id, 
            z, 
            this.x, 
            this.y, 
            width, 
            height, 
            this.angle,
            speed);

        this._events.publish(new AddObjectEvent(explosion));
        this._events.publish(new RemoveObjectEvent(this.id));
    }
}