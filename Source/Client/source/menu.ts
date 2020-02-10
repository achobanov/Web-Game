import EventsService from "./services/events-service";
import Rectangle from "./objects/shapes/rectangle";
import utils from "./utils/utils";
import AddEntityEvent from "./events/add-entity-event";
import TextObject from "./objects/shapes/text-object";
import IGameObject from "./objects/game-object";

export default class Menu {
    objects: IGameObject[];
    
    _events: EventsService;
    
    _background: Rectangle;
    _button: Rectangle;
    _text: TextObject;

    constructor(events: EventsService) {
        this._events = events;

        this._background = this._createBackground();
        this._button = this._createButton();
        this._text = this._createText();

        this.objects = [ this._background, this._button, this._text ];
    }

    _createBackground() {
        const background = new Rectangle(utils.uId(), 100, 200, 760, 560, 0, 'gray');
        this._events.publish(new AddEntityEvent(background));

        return background;
    }

    _createButton() {
        const button = new Rectangle(utils.uId(), 200, 300, 560, 360, 0, 'green');
        this._events.publish(new AddEntityEvent(button));

        return button;
    }

    _createText() {
        const text = new TextObject(utils.uId(), 'Start Game', 250, 320, 0, 'white');
        this._events.publish(new AddEntityEvent(text));

        return text;
    }

    
}