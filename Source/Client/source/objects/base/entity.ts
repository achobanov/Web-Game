import GameObject from "./game-object";
import { ISprite, IRenderable } from "../../services/render-service";

export interface IUpdateable {
    update: (dt : number) => void;
}

export default class Entity extends GameObject implements ISprite {
    uid: string;
    speed: number;
    frames: Array<IRenderable>;
    frameIndex: number;
    frameRate: number;
    frame: IRenderable;

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
        this.speed = speed;
        this.frames = frames;
        this.frameIndex = frameIndex ?? 0;
        this.frameRate = frameRate;
        
        this.frame = this.frames[this.frameIndex];
    }

    changeFrame = (index: number) : void => {
        if (!this.frames[index]) {
            throw new RangeError('Index outside of frames array.');
        }

        this.frameIndex = index;
        this.frame = this.frames[index];
    }
}