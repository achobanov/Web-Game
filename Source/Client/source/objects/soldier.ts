import Entity from "./base/entity";
import EventsService  from "../services/events-service";
import MouseClickEvent from "../events/mouse-click-event";
import SoldierImagePath from "../../assets/Soldier.png";
import { MouseButton } from "../enums/mouse-button";
import AssetsService from "../services/assets-service";

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
    }

    update = (dT: number) : void => {
        if (this._shouldMove())
            this._move(dT);

        if (this._shouldChangeFrame(dT))
            this._changeFrame(dT);
    }

    _onMouseClick = (event: MouseClickEvent) : void => {
        if (event.button === MouseButton.Left) {
            // fire
        } else {
            this._startMoving(event.cursor);
        }
    }
}