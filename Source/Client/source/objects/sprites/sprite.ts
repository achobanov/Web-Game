import Rectangle from "../shapes/rectangle";
import { ISprite, IRectangle, IShape } from "../../services/canvas-service";
import AssetsService from "../../services/assets-service";

export default class Sprite extends Rectangle implements ISprite {
    _assets: AssetsService

    _frames: IRectangle[];
    _frameIndex: number;
    _frameRate: number;
    _timeOnFrame: number;
        
    uid: string;    
    assetKey: string;
    frame: IRectangle;
    angle: number;
    effects?: IShape[];

    constructor(
        assets: AssetsService,
        assetKey: string,
        uid: string,1
        x: number, 
        y: number, 
        width: number,
        height: number,
        angle: number,
    ) {
        super(x, y, width, height);

        this._assets = assets;
        const asset = this._assets.get(assetKey);
        if (!asset) throw new Error(`Asset with key ${assetKey} not found.`);

        this._frames = asset.frames;
        this._frameRate = asset.frameRate;
        this._frameIndex = 0;
        this._timeOnFrame = 0;
        this.frame = this._frames[this._frameIndex];

        this.assetKey = assetKey;
        this.uid = uid;
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