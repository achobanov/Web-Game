import GameObject from "./game-object";
import { ISprite, IRenderable } from "../../services/canvas-service";

export interface IEntity extends ISprite {
    z: number,
    update: (dt : number) => void;
}

export default class Entity extends GameObject implements IEntity {
    _speed: number;
    _frames: IRenderable[];
    _frameIndex: number;
    _frameRate: number;
    _timeOnFrame: number;
    
    uid: string;
    z: number;
    frame: IRenderable;
    
    constructor(
        uid: string,
        z: number,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
        imageKey: string,
        frames: IRenderable[],
        frameRate: number,
        frameIndex?: number,
    ) {
        super(x, y, width, height, imageKey);
        
        this._speed = speed;
        this._frames = frames;
        this._frameIndex = frameIndex ?? 0;
        this._frameRate = frameRate;
        this._timeOnFrame = 0;
        
        this.uid = uid;
        this.z = z;
        this.frame = this._frames[this._frameIndex];
    }
        
    update = (dT: number) : void => {
        throw new Error('"IEntity.update" must be overriden!');
    }

    _changeFrame = (dT: number, index?: number) : void => {
        var isTimeToUpdate = this._timeOnFrame + dT >= 1 / this._frameRate;
        if (!isTimeToUpdate) {
            this._timeOnFrame += dT;
            return;
        }

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
        this._timeOnFrame = 0;
        this.frame = this._frames[this._frameIndex];
    }
}