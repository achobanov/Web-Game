import EventsService from "./services/events-service";
import Rectangle, { IRectangle } from "./objects/shapes/rectangle";
import utils from "./utils/utils";
import AddEntityEvent from "./events/add-entity-event";
import TextObject from "./objects/shapes/text-object";
import IGameObject from "./objects/game-object";
import RemoveEntityEvent from "./events/remove-entity-event";

export default class Menu implements IGameObject {
    id: string;
    angle?: number | undefined;
    x: number;
    y: number;

    objects: IGameObject[];
    
    _events: EventsService;
    _isClosing: boolean;
    _hasBounced: boolean;
    _bounceTime: number;
    _closingTime: number;
    _background: IRectangle;
    _startGame: () => void;
    
    constructor(events: EventsService, startGame: () => void) {
        this._events = events;
        this._isClosing = false;
        this._hasBounced = false;
        this._bounceTime = 1;
        this._closingTime = 0;
        this._startGame = startGame;

        this.id = utils.uId();
        this.x = 0;
        this.y = 0;

        const [ background, innerBackground ] = this._createBackground();
        this._background = background;

        this.objects = [
            background,
            innerBackground,
            this._createButton(),
            this._createText(),
        ];
    }

    update(dT: number) {
        this._closingTime += dT;
        if (this._closingTime === this._bounceTime) {
            this._hasBounced = true;
        }

        const distance = 300 * dT;
        if (this._isClosing) {
            this.objects.map(object => {
                object.y = this._hasBounced
                    ? object.y -= distance
                    : object.y += distance;

                return object;
            })
        }

        if (this._background.y + this._background.height < 0) {
            this._close();
        }
    }

    _close() {
        this.objects.forEach(object => this._events.publish(new RemoveEntityEvent(object.id)));
        this._startGame();
    }

    _createBackground() : Rectangle[] {
        const background = new Rectangle(utils.uId(), 50, 200, 860, 560, 0, 'darkgray');
        const innerBackground = new Rectangle(utils.uId(), 60, 210, 840, 540, 0, 'gray');
        
        this._events.publish(new AddEntityEvent(background));
        this._events.publish(new AddEntityEvent(innerBackground));
        
        return [ background, innerBackground ];
    }

    _createButton() {
        const button = new Rectangle(utils.uId(), 300, 450, 360, 60, 0, 'green');
        this._events.publish(new AddEntityEvent(button));

        return button;
    }

    _createText() {
        const text = new TextObject(utils.uId(), 'Start Game', '30px serif', 410, 490, 0, 'white');
        this._events.publish(new AddEntityEvent(text));

        return text;
    }
}