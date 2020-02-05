import GameObject from "./game-object";

export interface IEntity {
    update: (dt : number) => boolean;
}

export default class Entity extends GameObject implements IEntity {
    speed: number;

    constructor(x: number, y: number, width: number, height: number, speed: number, image: string) {
        super(x, y, width, height, image);

        this.speed = speed;
    }

    update = (dt : number) => {
        return false;
    }
}