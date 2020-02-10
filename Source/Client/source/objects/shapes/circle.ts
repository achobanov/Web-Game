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
        startAngle: number, 
        endAngle: number, 
        fill?: string
    ) {
        super(id, x, y, 0, fill);

        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}