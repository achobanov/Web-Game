import Shape, { IShape } from "./shape";

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
    ) {
        super(id, x, y, 0, fill, stroke);

        this.radius = radius;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
    }
}