import { IRectangle } from "../../services/canvas-service";
import Shape from "./shape";

export default class Rectangle extends Shape implements IRectangle {
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number, fill?: string) {
        super(x, y, fill);

        this.width = width;
        this.height = height;
    }
}