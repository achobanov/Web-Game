import { IRenderable } from "../../services/render-service";

export default class GameObject implements IRenderable {
    z: number;
    x: number;
    y: number;
    width: number;
    height: number;
    imageKey: string;

    constructor(z: number, x: number, y: number, width: number, height: number, imageKey: string) {
        this.z = z;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageKey = imageKey;
    }
}