import ImagesService from "./images-service";

export interface IRenderable {
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface ISprite extends IRenderable { 
    uid: string,
    imageKey: string,
    frame: IRenderable,
}

export default class RenderService {
    _context : CanvasRenderingContext2D;
    _imagesService : ImagesService;
    _clear : () => void;
    
    constructor(canvas: HTMLCanvasElement, ImagesService: ImagesService) {
        const context = canvas.getContext('2d');
        
        if (!context) throw new Error('Context not found!');

        this._context = context;
        this._imagesService = ImagesService;

        this._clear = () => this._context.fillRect(0, 0, canvas.width, canvas.height);
    }

    render = (sprite: ISprite) : void => 
        this._context.drawImage(
            this._imagesService.get(sprite.imageKey),
            sprite.frame.x,
            sprite.frame.y,
            sprite.frame.width,
            sprite.frame.height,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
        );

    clear = () : void =>
        this._clear();
}