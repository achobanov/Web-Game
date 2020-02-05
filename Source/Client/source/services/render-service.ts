import ResourcesService from "./images-service";

export interface IRenderable {
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface ISprite {
    uid: string,
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

    render = (sprite: ISprite) : void => 
        this._context.drawImage(
            this._resourcesService.images
        )
}