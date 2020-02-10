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

        this._context.save();
        this._context.translate(sprite.x, sprite.y);
        this._context.rotate(sprite.angle);

        const xCenterOffset = -sprite.width / 2;
        const yCenterOffset = -sprite.width / 2;

        this._context.drawImage(
            asset.image,
            sprite.frame.x,
            sprite.frame.y,
            sprite.frame.width,
            sprite.frame.height,
            xCenterOffset,
            yCenterOffset,
            sprite.width,
            sprite.height,
        );

        if (sprite.effects) {
            for (const effect of sprite.effects) {
                this._context.fillStyle = effect.fill;
                this._context.beginPath();
                this._context.moveTo(xCenterOffset + effect.point1.x, yCenterOffset + effect.point1.y);
                this._context.lineTo(xCenterOffset + effect.point2.x, yCenterOffset + effect.point2.y);
                this._context.lineTo(xCenterOffset + effect.point3.x, yCenterOffset + effect.point3.y);
                this._context.closePath();
                this._context.fill();
            }
        }

        this._context.fillStyle = 'black';

        this._context.restore();
    }

    clear = () : void =>
        this._clear();
}