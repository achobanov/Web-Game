import ImagesService from "./services/images-service";
import { ILaunchSettings } from "./settings";
import InputService from "./services/input-service";
import EventsService from "./services/events-service";
import RenderService from "./services/render-service";
import { IEntity } from "./objects/base/entity";

export default class Game {
    _images: ImagesService;
    _input: InputService;
    _events: EventsService;
    _render: RenderService;

    _previousFrameTime: number = 0;
    _entities: IEntity[];

    constructor(container: Node, settings: ILaunchSettings) {
        this._images = new ImagesService(settings.imagePaths);
        this._events = new EventsService();
        this._input = new InputService(container, this._events);
        this._render = new RenderService(container as HTMLCanvasElement, this._images);

        this._entities = [];
    }

    start = async () : Promise<void> => {
        await this._images.haveLoaded;

        // Add initial entities;

        this._previousFrameTime = Date.now();

        this._loop();
    }

    _loop = () :void => {
        var now = Date.now();
        var dT = (now - this._previousFrameTime) / 1000.0;

        this._entities.forEach(x => x.update(dT));
        this._renderEntities();

        this._previousFrameTime = now;
        requestAnimationFrame(this.loop);
    }

    _renderEntities = () => {
        this._render.clear();
        this._entities.forEach(x => this._render.render(x));
    }
}
