import Shape, { IShape } from "./shape";
import { ICoordinates } from "../../services/canvas-service";

export interface ICircle extends IShape {
    radius: number;
    startAngle: number;
    endAngle: number;
    antiClokwise?: boolean;
}

export default class Circle extends Shape implements ICircle {
    radius: number;    
    startAngle: number;
    endAngle: number;

    constructor(
        id: string, 
        x: number, 
        y: number, 
        radius: number,
        fill?: string,
        stroke?: string,
        alpha?: number,
    ) {
        super(id, x, y, 0, fill, stroke, alpha);

        this.radius = radius;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;

        this._offsetCenter(this.x, this.y);
    }

    _offsetCenter(x: number, y: number) {
        const centerOffset = this.radius * 0.75;
        this.x = x - centerOffset;
        this.y = y - centerOffset;
    }
}