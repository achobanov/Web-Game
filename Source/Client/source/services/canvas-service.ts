import AssetsService from "./assets-service";

export interface ICoordinates {
    x: number;
    y: number;
}

export interface IRenderable extends ICoordinates {
    width: number;
    height: number;
}

export interface IShape {
    fill: string;
}

export interface ITriangle extends IShape {
    point1: ICoordinates;
    point2: ICoordinates;
    point3: ICoordinates;
}

export interface ISprite extends IRenderable { 
    uid: string;
    imageKey: string;
    frame: IRenderable;
    angle: number;
    effects?: ITriangle[];
}

export default class CanvasService {
    _context : CanvasRenderingContext2D;
    _assetsService : AssetsService;
    _clear : () => void;
    
    constructor(canvas: HTMLCanvasElement, ImagesService: AssetsService) {
        const context = canvas.getContext('2d');
        
        if (!context) throw new Error('Context not found!');

        this._context = context;
        this._assetsService = ImagesService;

        this._clear = () => this._context.fillRect(0, 0, canvas.width, canvas.height);
    }

    render = (sprite: ISprite) : void =>
    {
        const asset = this._assetsService.get(sprite.imageKey);
        if (!asset) throw new Error(`Image with key "${sprite.imageKey}" is not found.`);

        let x = sprite.x;
        let y = sprite.y;

        if (sprite.angle) {
            this._context.save();
            this._context.translate(sprite.x, sprite.y);
            this._context.rotate(sprite.angle);
            x = 0;
            y = 0;
        }

        this._context.drawImage(
            asset.image,
            sprite.frame.x,
            sprite.frame.y,
            sprite.frame.width,
            sprite.frame.height,
            x,
            y,
            sprite.width,
            sprite.height,
        );

        if (sprite.effects) {
            for (const effect of sprite.effects) {
                this._context.fillStyle = effect.fill;
                this._context.beginPath();
                this._context.moveTo(x + 13, y + 5);
                this._context.lineTo(x + 13.7, y + 5);
                this._context.lineTo(x + 13.35, y - 505);
                this._context.closePath();
                this._context.fill();
            }
        }

        this._context.fillStyle = 'black';

        if (sprite.angle) {
            this._context.restore();
        }
    }

    clear = () : void =>
        this._clear();
}