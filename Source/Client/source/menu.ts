import EventsService from "./services/events-service";
import Rectangle from "./objects/shapes/rectangle";
import utils from "./utils/utils";
import AddEntityEvent from "./events/add-entity-event";
import TextObject from "./objects/shapes/text-object";
import IGameObject from "./objects/game-object";

export default class Menu {
    objects: IGameObject[];
    
    _events: EventsService;
    
    constructor(events: EventsService) {
        this._events = events;

        this.objects = [
            ...this._createBackground(),
            this._createButton(),
            this._createText(),
        ]
    }

    _createBackground() {
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