import AssetsService from "./services/assets-service";
import { ILaunchSettings } from "./settings";
import InputService from "./services/input-service";
import EventsService from "./services/events-service";
import CanvasService from "./services/canvas-service";
import { IEntity } from "./objects/sprites/entity";
import SetupService from "./services/setup-service";
import AddEntityEvent from "./events/add-entity-event";
import RemoveEntityEvent from "./events/remove-entity-event";

export default class Game {
    _cyclesPerSecond: number;
    _passedSeconds: number;
    
    _input: InputService;
    _events: EventsService;
    _canvas: CanvasService;
    _setup: SetupService

    _previousFrameTime: number = 0;
    _entities: IEntity[];

    constructor(container: Node, settings: ILaunchSettings) {
        const images = new AssetsService(settings.assets);
        
        this._events = new EventsService();
        this._input = new InputService(container, this._events);
        this._canvas = new CanvasService(container as HTMLCanvasElement, images);
        this._setup = new SetupService(images, this._events);

        this._entities = [];
        this._cyclesPerSecond = 0;
        this._passedSeconds = 0;

        this._events.subscribe(AddEntityEvent.Key, this._addEntity);
        this._events.subscribe(RemoveEntityEvent.Key, this._removeEntity); 
    }

    start = async () : Promise<void> => {
        this._entities = await this._setup.proofOfConcept();

        this._previousFrameTime = Date.now();

        this._loop();
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
        this._entities.forEach(x => x.update(dT));

    _render = () => {
        this._canvas.clear();
        this._entities.forEach(x => this._canvas.render(x));
    }

    _addEntity = ({ entity }: AddEntityEvent) => {
        this._entities.push(entity);
    }

    _removeEntity = ({ id }: RemoveEntityEvent) => {
        this._entities = this._entities.filter(x => x.uid !== id);
    }
}
