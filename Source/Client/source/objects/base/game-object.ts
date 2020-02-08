import { IRenderable } from "../../services/canvas-service";

export default class GameObject implements IRenderable {
    x: number;
    y: number;
    width: number;
    height: number;
    imageKey: string;

    constructor(x: number, y: number, width: number, height: number, imageKey: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageKey = imageKey;
    }
}