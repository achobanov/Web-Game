import GameObject from "./game-object";

export interface IEntity {
    update: (dt : number) => boolean;
}

export default class Entity extends GameObject implements IEntity {
    constructor(x: number, y: number, width: number, height: number, speed: number, image: string) {
        super(x, y, width, height, speed, image);
    }

    update = (dt : number) => {
        return false;
    }
}