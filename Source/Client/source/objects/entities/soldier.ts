import Entity from "./entity";
import EventsService  from "../../services/events-service";
import MouseClickEvent from "../../events/mouse-click-event";
import SoldierImagePath from "../../../assets/soldier.png";
import { MouseButton } from "../../enums/mouse-button";
import AssetsService from "../../services/assets-service";
import MouseMoveEvent from "../../events/mouse-move-event";
import Rocket from "./rocket";
import utils from "../../utils/utils";
import { ICoordinates } from "../../services/canvas-service";
import AddEntityEvent from "../../events/add-entity-event";
import { ITriangle } from "../shapes/triangle";

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

        // this.effects.push({
        //     fill: '#c96c6c',
        //     x: 13, 
        //     y: 5,
        //     point2: { x: 13.7, y: 5 },
        //     point3: { x: 13.35, y: -505 },
        // } as ITriangle);

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

    _fire({ x: destinationX, y: destinationY }: ICoordinates) {
        const z = 0;
        const width = 20;
        const height = 45;
        const speed = 450;

        const rocket = new Rocket(
            this._events, 
            this._assets, 
            utils.uId(), 
            z, 
            this.x, 
            this.y, 
            width, 
            height, 
            this.angle, 
            speed, 
            destinationX, 
            destinationY);

        this._events.publish(new AddEntityEvent(rocket));
    }

    _rotate = (event: MouseMoveEvent) => {
        const dX = event.cursor.x - this.x;
        const dY = event.cursor.y - this.y;
        this.angle = Math.atan2(dY, dX) + 1.595; // fixes :D
    }

    _shouldChangeFrame = (dT: number) : boolean =>
        this._isMoving && super._shouldChangeFrame(dT);
}