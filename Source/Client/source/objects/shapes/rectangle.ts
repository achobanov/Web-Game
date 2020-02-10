import Shape, { IShape } from "./shape";

export interface IRectangle extends IShape {
    width: number;
    height: number;
}

export default class Rectangle extends Shape implements IRectangle {
    width: number;
    height: number;

    constructor(id: string,
        x: number,
        y: number,
        width: number,
        height: number,
        angle: number,
        fill?: string,
        stroke?: string
    ) {
        super(id, x, y, angle, fill, stroke);

        this.width = width;
        this.height = height;
    }
}