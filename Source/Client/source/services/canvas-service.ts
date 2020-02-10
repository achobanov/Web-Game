import AssetsService from "./assets-service";
import utils from "../utils/utils";
import Sprite, { ISprite } from "../objects/entities/sprite";
import Rectangle from "../objects/shapes/rectangle";
import Triangle from "../objects/shapes/triangle";
import Circle from "../objects/shapes/circle";
import IGameObject from "../objects/game-object";
import TextObject from "../objects/shapes/text-object";

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

    render = (object: IGameObject) : void => {
        this._context.save();
        this._context.translate(object.x, object.y);
        this._context.rotate(object.angle ?? 0);

        if (utils.isOfType(object, Sprite))
            this._renderSprite(object);
        else if (utils.isOfType(object, Rectangle))
            this._renderRectangle(object);
        else if (utils.isOfType(object, Triangle))
            this._renderTriangle(object);
        else if (utils.isOfType(object, Circle))
            this._renderCircle(object);
        else if (utils.isOfType(object, TextObject))
            this._renderText(object);
        else
            return;

        this._context.restore();
    }


    _renderSprite = (sprite: ISprite) => {
        const asset = this._assetsService.get(sprite.assetKey);
        if (!asset) throw new Error(`Image with key "${sprite.assetKey}" is not found.`);

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
                this._context.fillStyle = effect.fill ?? 'black';
                this._context.beginPath();
                this._context.moveTo(xCenterOffset + effect.x, yCenterOffset + effect.y);
                this._context.lineTo(xCenterOffset + effect.point2.x, yCenterOffset + effect.point2.y);
                this._context.lineTo(xCenterOffset + effect.point3.x, yCenterOffset + effect.point3.y);
                this._context.closePath();
                this._context.fill();
            }
        }
    }

    _renderTriangle = (triangle: Triangle) => {
        if (triangle.fill) {
            this._context.fillStyle = triangle.fill;
        }
        
        this._context.beginPath();
        this._context.moveTo(0, 0);
        this._context.lineTo(triangle.point2.x, triangle.point2.y);
        this._context.lineTo(triangle.point3.x, triangle.point3.y);
        this._context.closePath();
        this._context.fill();
    }

    _renderCircle = (circle: Circle) => {
        this._context.arc(0, 0, circle.radius, circle.startAngle, circle.endAngle);
    }

    _renderRectangle = (rectangle: Rectangle) => {
        if (rectangle.fill) {
            this._context.fillStyle = rectangle.fill;
            this._context.fillRect(0, 0, rectangle.width, rectangle.height)
        } else {
            this._context.rect(0, 0, rectangle.width, rectangle.height);
        }
    }

    _renderText = (text: TextObject) => {
        this._context.fillStyle = text.fill;
        this._context.font = text.font;
        this._context.fillText(text.text, 0, 0);
    }

    clear = () : void =>
        this._clear();
}