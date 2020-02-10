import { ICircle } from "../../services/canvas-service";
import Shape from "./shape";

export default class Circle extends Shape implements ICircle {
    radius: number;    
    startAngle: number;
    endAngle: number;

    constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        super(x, y);

        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}