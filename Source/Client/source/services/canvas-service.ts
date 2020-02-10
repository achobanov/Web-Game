import AssetsService from "./assets-service";
import utils from "../utils/utils";
import Sprite, { ISprite } from "../objects/sprites/sprite";
import Rectangle from "../objects/shapes/rectangle";
import Triangle from "../objects/shapes/triangle";
import Circle from "../objects/shapes/circle";
import IGameObject from "../objects/game-object";

export interface ICoordinates {
    x: number;
    y: number
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

    render = (object: IGameObject) : void =>
    {
        if (utils.isOfType(object, Sprite))
            this._renderSprite(object);
        else if (utils.isOfType(object, Rectangle))
            this._renderRectangle(object);
        else if (utils.isOfType(object, Triangle))
            this._renderTriangle(object);
        else if (utils.isOfType(object, Circle))
            this._renderCircle(object);
        else
            throw new Error('Unsupported shape.');

        this._context.fillStyle = 'black';
    }


    _renderSprite = (sprite: ISprite) => {
        const asset = this._assetsService.get(sprite.assetKey);
        if (!asset) throw new Error(`Image with key "${sprite.assetKey}" is not found.`);

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

        this._context.restore();
    }

    _renderTriangle = (triangle: Triangle) => {
        if (triangle.fill) {
            this._context.fillStyle = triangle.fill;
        }
        
        this._context.beginPath();
        this._context.moveTo(triangle.x, triangle.y);
        this._context.lineTo(triangle.point2.x, triangle.point2.y);
        this._context.lineTo(triangle.point3.x, triangle.point3.y);
        this._context.closePath();
        this._context.fill();
    }

    _renderCircle = (circle: Circle) => {
        this._context.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle);
    }

    _renderRectangle = (rectangle: Rectangle) => {
        if (rectangle.fill) {
            this._context.fillStyle = rectangle.fill;
            this._context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
        } else {
            this._context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        }
    }

    clear = () : void =>
        this._clear();
}