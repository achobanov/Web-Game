import AssetsService from "./services/assets-service";
import { ILaunchSettings } from "./settings";
import InputService from "./services/input-service";
import EventsService from "./services/events-service";
import SetupService from "./services/setup-service";
import AddObjectEvent from "./events/add-object-event";
import RemoveObjectEvent from "./events/remove-object-event";
import CanvasService from "./services/canvas-service";
import IGameObject from "./objects/game-object";
import Menu from "./menu";
import MouseClickEvent from "./events/mouse-click-event";
import MoveIndicator from "./objects/entities/move-indicator";
import utils from "./utils/utils";
import MouseMoveEvent from "./events/mouse-move-event";
import { MouseButton } from "./enums/mouse-button";

export default class Game {
    _cyclesPerSecond: number;
    _passedSeconds: number;
    
    _input: InputService;
    _events: EventsService;
    _canvas: CanvasService;
    _setup: SetupService

    _previousFrameTime: number = 0;
    _objects: IGameObject[];

    constructor(container: HTMLElement, settings: ILaunchSettings) {
        const images = new AssetsService(settings.assets);
        
        this._events = new EventsService();
        this._input = new InputService(container, this._events);
        this._canvas = new CanvasService(container as HTMLCanvasElement, images, settings.defaultFill);
        this._setup = new SetupService(images, this._events);

        this._objects = [];
        this._cyclesPerSecond = 0;
        this._passedSeconds = 0;

        this._events.subscribe(AddObjectEvent.Key, this._addEntity);
        this._events.subscribe(RemoveObjectEvent.Key, this._removeEntity);
        this._events.subscribe(MouseClickEvent.Key, this._indicateRightClick);
    }

    async menu() {
        const menu = new Menu(this._events, this._start);

        this._objects = this._objects.concat(menu, ...menu.objects);
        
        this._previousFrameTime = Date.now();
        this._loop();
    }

    _start = async () : Promise<void> => {
        this._objects = this._objects.concat(...await this._setup.proofOfConcept());
    }

    _loop = () : void => {
        var now = Date.now();
        var dT = (now - this._previousFrameTime) / 1000.0;

        this._update(dT);
        this._render();
        
        this._previousFrameTime = now;
        requestAnimationFrame(this._loop);
    }
    
    _update = (dT: number) =>
        this._objects.forEach(x => x.update && x.update(dT));

    _render = () => {
        this._canvas.clear();
        this._objects.forEach(x => this._canvas.render(x));
    }

    _addEntity = ({ object: entity }: AddObjectEvent) => {
        this._objects.push(entity);
    }

    _removeEntity = ({ id }: RemoveObjectEvent) => {
        this._objects = this._objects.filter(x => x.id !== id);
    }

    _indicateRightClick = ({ cursor, button }: MouseClickEvent) => {
        if (button !== MouseButton.Right)
            return;

        const { x, y } = cursor;
        const indicator = new MoveIndicator(this._events, utils.uId(), x, y, 1, 1, '', 'red');
        this._objects.push(indicator);
    }
}
