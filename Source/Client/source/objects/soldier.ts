import Entity from "./base/entity";
import EventsService  from "../services/events-service";
import MouseClickEvent from "../events/mouse-click-event";
import SoldierImagePath from "../../assets/Soldier.png";
import { MouseButton } from "../enums/mouse-button";
import AssetsService from "../services/assets-service";
import MouseMoveEvent from "../events/mouse-move-event";
import Rocket from "./rocket";
import utils from "../utils/utils";
import { ICoordinates } from "../services/canvas-service";
import RocketFireEvent from "../events/rocket-fire-event";

export default class Soldier extends Entity {
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
        speed: number
    ) {
        super(assets, SoldierImagePath, uid, z, x, y, width, height, speed);

        this._events = events;

        this.effects.push({
            fill: '#c96c6c',
            point1: { x: x + 13, y: y + 5 },
            point2: { x: x + 13.7, y: y + 5 },
            point3: { x: x + 13.35, y: y - 505 },
        });

        this._events.subscribe(MouseClickEvent.Key, this._onMouseClick);
        this._events.subscribe(MouseMoveEvent.Key, this._rotate);
    }

    update = (dT: number) : void => {
        if (this._shouldMove())
            this._move(dT);

        if (this._shouldChangeFrame(dT))
            this._changeFrame();
    }

    _onMouseClick = (event: MouseClickEvent) : void => {
        if (event.button === MouseButton.Left) {
            this._fire(event.cursor);
        } else {1
            this._startMoving(event.cursor);
        }
    }

    _fire({ x, y }: ICoordinates) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const rocket = new Rocket(this._events, this._assets, utils.uId(), 0, centerX, centerY, 30, 15, 150, x, y);

        this._events.publish(new RocketFireEvent(rocket));
    }

    _rotate = (event: MouseMoveEvent) => {
        const dX = event.cursor.x - this.x;
        const dY = event.cursor.y - this.y;
        this.angle = Math.atan2(dY, dX) + 1.51; // fixes :D
    }

    _shouldChangeFrame = (dT: number) : boolean =>
        this._isMoving && super._shouldChangeFrame(dT);
}