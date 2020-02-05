import GameObject from "./game-object";

export interface IEntity {
    update: (dt : number) => boolean;
}

export default class Entity extends GameObject implements IEntity {
    speed: number;
    frames: Array<Array<number>>;
    frameIndex: number;
    frameRate: number;
    hasMoved : boolean;
    hasChangedFrame: boolean;

    constructor(
        x: number, 
        y: number, 
        width: number,
        height: number,
        speed: number,
        image: string,
        frames: Array<Array<number>>,
        frameRate: number,
        frameIndex?: number,
    ) {
        super(x, y, width, height, image);

        this.speed = speed;
        this.frames = frames;
        this.frameIndex = frameIndex ?? 0;
        this.frameRate = frameRate;
        this.hasMoved = false;
        this.hasChangedFrame = false;
    }

    update = (dt : number) : boolean => {
        const hasUpdated = this.hasMoved || this.hasChangedFrame;

        this.hasMoved = false;
        this.hasChangedFrame = false;

        return hasUpdated;
    }
        

    changeFrame = (index: number) : void => {
        if (!this.frames[index]) {
            throw new RangeError('Index outside of frames array.');
        }

        this.frameIndex = index;
        this.hasChangedFrame = true;
    }
}