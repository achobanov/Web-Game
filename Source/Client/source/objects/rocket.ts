import RocketImagePath from "../../assets/rocket.png";
import Entity from "./base/entity";
import EventsService from "../services/events-service";
import AssetsService from "../services/assets-service";

export default class Rocket extends Entity {
    _destinationX: number;
    _destinationY: number;
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
        destinationX: number,
        destinationY: number,
    ) {
        super(assets, RocketImagePath, uid, z, x, y, width, height, speed);

        this._events = events;

        this._isMoving = true;
        this._destinationX = destinationX;
        this._destinationY = destinationY;
    }

    update(dT: number) : void {
        if (this._hasReachedDestination())
            this._explode();

        super.update(dT);
    }

    _hasReachedDestination() { return this.x === this._destinationX && this.y === this._destinationY }

    _explode() {

    }
}