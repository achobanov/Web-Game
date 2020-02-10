import { IShape } from "../../services/canvas-service";

export default class Shape implements IShape {
    x: number;    
    y: number;
    fill?: string;

    constructor(x: number, y: number, fill?: string) {
        this.x = x;
        this.y = y;
        this.fill = fill;
    }
}