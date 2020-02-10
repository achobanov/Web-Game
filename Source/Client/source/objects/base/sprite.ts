import Rectangle from "../shapes/rectangle";
import { ISprite, IRectangle, IShape } from "../../services/canvas-service";

export default class Sprite extends Rectangle implements ISprite {
    uid: string;    
    assetKey: string;
    frame: IRectangle;
    angle: number;
    effects?: IShape[];

    constructor(
        assetKey: string,
        uid: string,
        x: number, 
        y: number, 
        width: number,
        height: number,
        angle: number,
        frame: IRectangle,
    ) {
        super(x, y, width, height);

        this.assetKey = assetKey;
        this.uid = uid;
        this.angle = angle;
        this.frame = frame;
    }
}