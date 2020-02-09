import Entity from "./base/entity";
import EventsService  from "../services/events-service";
import MouseClickEvent from "../events/mouse-click-event";
import SoldierImagePath from "../../assets/Soldier.png";
import { MouseButton } from "../enums/mouse-button";
import AssetsService from "../services/assets-service";
import MouseMoveEvent from "../events/mouse-move-event";

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
            // fire8
        } else {1
            this._startMoving(event.cursor);
        }
    }

    _rotate = (event: MouseMoveEvent) => {
        const dX = event.cursor.x - this.x;
        const dY = event.cursor.y - this.y;
        this.angle = Math.atan2(dY, dX) + 1.51; // fixes :D
    }

    _shouldChangeFrame = (dT: number) : boolean =>
        this._isMoving && super._shouldChangeFrame(dT);
}