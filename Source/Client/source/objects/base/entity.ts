import GameObject from "./game-object";
import { ISprite, IRenderable } from "../../services/canvas-service";
import AssetsService from "../../services/assets-service";

export interface IEntity extends ISprite {
    z: number,
    update: (dt : number) => void;
}

export default class Entity extends GameObject implements IEntity {
    _assets: AssetsService;

    _speed: number;
    _frames: IRenderable[];
    _frameIndex: number;
    _frameRate: number;
    _timeOnFrame: number;
    _desination: { x: number, y: number };
    _isMoving: boolean;
    
    uid: string;
    z: number;
    frame: IRenderable;
    
    constructor(
        assets: AssetsService,
        assetKey: string,
        uid: string,
        z: number,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
    ) {
        super(x, y, width, height, assetKey);
        
        this._assets = assets;

        const asset = this._assets.get(assetKey);
        if (!asset) throw new Error(`Asset with key ${assetKey} not found.`);

        this._speed = speed;
        this._frames = asset.frames;
        this._frameRate = asset.frameRate;
        this._frameIndex = 0;
        this._timeOnFrame = 0;
        this._desination = { x ,y };
        this._isMoving = false;

        this.uid = uid;
        this.z = z;
        this.frame = this._frames[this._frameIndex];
    }
        
    update = (dT: number) : void => {
        if (this._shouldMove())
            this._move(dT);

        if (this._shouldChangeFrame(dT))
            this._changeFrame(dT);
    }

    _shouldMove = () => this._isMoving;

    _shouldChangeFrame = (dT: number) => {
        if (this._timeOnFrame + dT >= 1 / this._frameRate)
            return true;
        else {
            this._timeOnFrame += dT;
            return false;
        }
    }
    
    _move = (dT: number) => {
        const distance = this._speed * dT;

        this.x = this._updateLinear(this.x, distance, this._desination.x);
        this.y = this._updateLinear(this.y, distance, this._desination.y);
        
        if (this._desination.x === this.x && this._desination.y === this.y) {
            this._stopMoving();
        }
    }

    _updateLinear = (current: number, distance: number, destination?: number) : number => {
        if (!destination) return current + distance;

        return destination > current
            ? Math.min(current + distance, destination)
            : Math.max(current - distance, destination);
    }

    _startMoving = ({ x, y }: { x: number, y: number}) => {
        this._desination = { x, y };
        this._isMoving = true;
    }

    _stopMoving = () => {
        this._isMoving = false;
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