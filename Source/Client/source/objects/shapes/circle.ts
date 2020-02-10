import { ICircle } from "../../services/canvas-service";

export default class Circle implements ICircle {
    x: number;
    y: number;
    radius: number;    
    startAngle: number;
    endAngle: number;

    constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}