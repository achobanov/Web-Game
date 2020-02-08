import GameObject from "./game-object";
import { ISprite, IRenderable } from "../../services/render-service";

export interface IEntity extends ISprite {
    framesCount: number;
    update: (dt : number) => void;
}

export default class Entity extends GameObject implements IEntity {
    _speed: number;
    _frames: Array<IRenderable>;
    _framesCount: number;
    _frameIndex: number;
    _frameRate: number;
    
    uid: string;
    frame: IRenderable;
    framesCount: number;
    
    constructor(
        uid: string,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
        imageKey: string,
        frames: Array<IRenderable>,
        frameRate: number,
        frameIndex?: number,
    ) {
        super(x, y, width, height, imageKey);
        
        this.uid = uid;
        this._speed = speed;
        this._frames = frames;
        this._framesCount = frames.length;
        this._frameIndex = frameIndex ?? 0;
        this._frameRate = frameRate;
        
        this.frame = this._frames[this._frameIndex];
        this.framesCount = frames.length;
    }
        
    update = (dt: number) : void => {
        throw new Error('"IEntity.update" must be overriden!');
    }

    _changeFrame = (index?: number) : void => {
        if (!index) {
            if (this._frameIndex === this._frames.length - 1)
                this._frameIndex = 0;
            else 
                this._frameIndex++;
            
            return this._setFrame();
        }

        if (!this._frames[index]) {
            throw new RangeError('Index outside of frames array.');
        }

        this._frameIndex = index;
        this._setFrame();
    }

    _setFrame = () : void => {
        this.frame = this._frames[this._frameIndex];
    }
}