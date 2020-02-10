import EventsService from "./services/events-service";
import Rectangle, { IRectangle } from "./objects/shapes/rectangle";
import utils from "./utils/utils";
import AddEntityEvent from "./events/add-entity-event";
import TextObject from "./objects/shapes/text-object";
import IGameObject from "./objects/game-object";
import RemoveEntityEvent from "./events/remove-entity-event";
import MouseMoveEvent from "./events/mouse-move-event";
import MouseClickEvent from "./events/mouse-click-event";
import { MouseButton } from "./enums/mouse-button";
import Circle from "./objects/shapes/circle";
import { ICoordinates } from "./services/canvas-service";
import HoverIndicator from "./objects/entities/hover-indicator";

export default class Menu implements IGameObject {
    id: string;
    angle?: number | undefined;
    x: number;
    y: number;

    objects: IGameObject[];
    
    _events: EventsService;
    _isClosing: boolean;
    _isButtonHovered: boolean;
    _hasBounced: boolean;
    _bounceTime: number;
    _closingTime: number;
    _background: Rectangle;
    _button: Rectangle;
    _speed: number;
    _hoverIndicatorId: string;
    _startGame: () => void;
    
    constructor(events: EventsService, startGame: () => void) {
        this._events = events;
        this._isClosing = false;
        this._hasBounced = false;
        this._bounceTime = 0.17;
        this._speed = 100;
        this._closingTime = 0;
        this._startGame = startGame;
        this._isButtonHovered = false;
        this._hoverIndicatorId = utils.uId();
        
        this.id = utils.uId();
        this.x = 0;
        this.y = 0;

        const [ background, innerBackground ] = this._createBackground();
        this._background = background;
        this._button = this._createButton();

        this.objects = [
            background,
            innerBackground,
            this._button,
            this._createText(),
        ];

        this._events.subscribe(MouseMoveEvent.Key, this._onMouseMove);
        this._events.subscribe(MouseClickEvent.Key, this._onMouseClick);
    }

    update(dT: number) {
        if (!this._isClosing)
            return;

        this._closingTime += dT;
        if (this._closingTime > this._bounceTime) {
            this._hasBounced = true;
        }

        const distance = (this._speed += 150) * dT;

        this.objects.map(object => {
            object.y = this._hasBounced
                ? object.y -= distance
                : object.y += distance;

            return object;
        })

        if (this._background.y + this._background.height < 0) {
            this._close();
        }
    }
    
    _onMouseMove = (event: MouseMoveEvent) => {
        const wasButtonHovered = this._isButtonHovered;
        
        this._isButtonHovered = 
            this._button.x < event.cursor.x
            && this._button.x + this._button.width > event.cursor.x
            && this._button.y < event.cursor.y
            && this._button.y + this._button.height > event.cursor.y;
        
        if (this._isButtonHovered && !wasButtonHovered)
            this._createIndicator(event.cursor);
        else if (!this._isButtonHovered && wasButtonHovered)
            this._events.publish(new RemoveEntityEvent(this._hoverIndicatorId));        
    }

    _createIndicator({ x, y }: ICoordinates) {
        const indicator = new HoverIndicator(this._events, this._hoverIndicatorId, x, y, 10);
        this._events.publish(new AddEntityEvent(indicator));
    }

    _onMouseClick = (event: MouseClickEvent) =>
        this._isButtonHovered && event.button === MouseButton.Left && this._startClosing();

    _startClosing() { this._isClosing = true; }
    
    _close() {
        this._events.publish(new RemoveEntityEvent(this.id));
        this.objects.forEach(object => this._events.publish(new RemoveEntityEvent(object.id)));
        this._startGame();
    }

    _createBackground() : Rectangle[] {
        const background = new Rectangle(utils.uId(), 50, 200, 860, 560, 0, '#333638');
        const innerBackground = new Rectangle(utils.uId(), 60, 210, 840, 540, 0, '#3e4144');
        
        this._events.publish(new AddEntityEvent(background));
        this._events.publish(new AddEntityEvent(innerBackground));
        
        return [ background, innerBackground ];
    }

    _createButton() : Rectangle {
        const button = new Rectangle(utils.uId(), 300, 450, 360, 60, 0, '#8bc558');
        this._events.publish(new AddEntityEvent(button));

        return button;
    }

    _createText() {
        const text = new TextObject(utils.uId(), 'Start Game', '30px serif', 410, 490, 0, 'white');
        this._events.publish(new AddEntityEvent(text));

        return text;
    }
}