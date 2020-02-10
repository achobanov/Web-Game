import AssetsService from "./services/assets-service";
import { ILaunchSettings } from "./settings";
import InputService from "./services/input-service";
import EventsService from "./services/events-service";
import SetupService from "./services/setup-service";
import AddEntityEvent from "./events/add-entity-event";
import RemoveEntityEvent from "./events/remove-entity-event";
import CanvasService from "./services/canvas-service";
import IGameObject from "./objects/game-object";
import Rectangle from "./objects/shapes/rectangle";
import utils from "./utils/utils";
import Menu from "./menu";

export default class Game {
    _cyclesPerSecond: number;
    _passedSeconds: number;
    
    _input: InputService;
    _events: EventsService;
    _canvas: CanvasService;
    _setup: SetupService

    _previousFrameTime: number = 0;
    _objects: IGameObject[];

    constructor(container: Node, settings: ILaunchSettings) {
        const images = new AssetsService(settings.assets);
        
        this._events = new EventsService();
        this._input = new InputService(container, this._events);
        this._canvas = new CanvasService(container as HTMLCanvasElement, images);
        this._setup = new SetupService(images, this._events);

        this._objects = [];
        this._cyclesPerSecond = 0;
        this._passedSeconds = 0;

        this._events.subscribe(AddEntityEvent.Key, this._addEntity);
        this._events.subscribe(RemoveEntityEvent.Key, this._removeEntity); 
    }

    async menu() {
        const menu = new Menu(this._events, this._start);
0
        this._objects = this._objects.concat(menu.objects);
        
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

    _addEntity = ({ entity }: AddEntityEvent) => {
        this._objects.push(entity);
    }

    _removeEntity = ({ id }: RemoveEntityEvent) => {
        this._objects = this._objects.filter(x => x.id !== id);
    }
}
