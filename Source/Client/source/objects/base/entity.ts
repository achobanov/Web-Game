import GameObject from "./game-object";

export interface IUpdateable {
    update: (dt : number) => void;
}

export default class Entity extends GameObject {
    uid: string;
    speed: number;
    frames: Array<Array<number>>;
    frameIndex: number;
    frameRate: number;

    constructor(
        uid: string,
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
        imageKey: string,
        frames: Array<Array<number>>,
        frameRate: number,
        frameIndex?: number,
    ) {
        super(x, y, width, height, imageKey);

        this.uid = uid;
        this.speed = speed;
        this.frames = frames;
        this.frameIndex = frameIndex ?? 0;
        this.frameRate = frameRate;
    }

    changeFrame = (index: number) : void => {
        if (!this.frames[index]) {
            throw new RangeError('Index outside of frames array.');
        }

        this.frameIndex = index;
    }
}