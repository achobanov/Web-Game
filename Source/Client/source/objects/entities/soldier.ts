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
import AddObjectEvent from "../../events/add-object-event";
import Triangle from "../shapes/triangle";

export default class Soldier extends Entity {
    _events: EventsService;

    constructor(
        events: EventsService,
        assets: AssetsService,
        x: number, 
        y: number
    ) {
        super(assets, SoldierImagePath, utils.uId(), 100, x, y, 55, 55, 150);

        this._events = events;

        this.effects.push(this._createLaserPointer());
            
        this._events.subscribe(MouseClickEvent.Key, this._handleMouseClick);
        this._events.subscribe(MouseMoveEvent.Key, this._rotate);
    }

    update = (dT: number) : void => {
        if (this._shouldMove())
            this._move(dT);

        if (this._shouldChangeFrame(dT))
            this._changeFrame();
    }

    _move(dT: number) {
        super._move(dT);
    }

    _handleMouseClick = (event: MouseClickEvent) : void => {
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
        const speed = 550;

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

        this._events.publish(new AddObjectEvent(rocket));
    }

    _rotate = (event: MouseMoveEvent) => {
        const dX = event.cursor.x - this.x;
        const dY = event.cursor.y - this.y;
        this.angle = Math.atan2(dY, dX) + 1.595; // fixes :D
    }

    _shouldChangeFrame = (dT: number) : boolean =>
        this._isMoving && super._shouldChangeFrame(dT);

    _createLaserPointer() : Triangle {
        return new Triangle(
            utils .uId(),
            { x: 13, y: 5 },
            { x: 13.7, y: 5 },
            { x: 13.35, y: -505 },
            this.angle,
            '#c96c6c');
    }
}