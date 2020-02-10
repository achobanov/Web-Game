import AssetsService from "../../services/assets-service";
import { IRectangle } from "../shapes/rectangle";
import { IShape } from "../shapes/shape";

export interface ISprite extends IRectangle { 
    assetKey: string;
    frame: IRectangle;
    angle: number;
    effects?: IShape[];
}

export default class Sprite implements ISprite {
    _assets: AssetsService

    _frames: IRectangle[];
    _frameIndex: number;
    _frameRate: number;
    _timeOnFrame: number;
    
    x: number;
    y: number;
    width: number;
    height: number;
    id: string;    
    assetKey: string;
    frame: IRectangle;
    angle: number;
    effects?: IShape[];

    constructor(
        assets: AssetsService,
        assetKey: string,
        id: string,
        x: number, 
        y: number, 
        width: number,
        height: number,
        angle: number,
    ) {
        this._assets = assets;
        const asset = this._assets.get(assetKey);
        if (!asset) throw new Error(`Asset with key ${assetKey} not found.`);

        this._frames = asset.frames;
        this._frameRate = asset.frameRate;
        this._frameIndex = 0;
        this._timeOnFrame = 0;
        this.frame = this._frames[this._frameIndex];

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.assetKey = assetKey;
        this.id = id;
        this.angle = angle;
    }

    update(dT: number) {
        if (this._shouldChangeFrame(dT)) 
            this._changeFrame();
    }

    _shouldChangeFrame(dT: number) {
        if (this._timeOnFrame + dT >= 1 / this._frameRate)
            return true;
        else {
            this._timeOnFrame += dT;
            return false;
        }
    }
    
    _changeFrame(index?: number) : void {
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

    _setFrame() : void {
        this._timeOnFrame = 0;
        this.frame = this._frames[this._frameIndex];
    }
}