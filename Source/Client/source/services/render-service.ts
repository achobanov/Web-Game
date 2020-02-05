import ResourcesService from "./resources-service";

export interface ISprite {
    x: number,
    y: number,
    width: number,
    height: number,
    imageKey: number,
    frameIndex: number,
    frames: Array<Array<number>>
}

export default class RenderService {
    _context : CanvasRenderingContext2D;
    _resourcesService : ResourcesService;

    constructor(canvas: HTMLCanvasElement, resourcesService: ResourcesService) {
        const context = canvas.getContext('2d');
        
        if (!context) throw new Error('Context not found!');

        this._context = context;
        this._resourcesService = resourcesService;
    }

    render = (sprite: ISprite) : void => {

    }
}