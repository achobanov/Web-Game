import Shape, { IShape } from "./shape";
import { ICoordinates } from "../../services/canvas-service";

export interface ITriangle extends IShape {
    point2: ICoordinates;
    point3: ICoordinates;
}

export default class Triangle extends Shape implements ITriangle {
    point2: ICoordinates;
    point3: ICoordinates;

    constructor(
        id: string,
        point1: ICoordinates,
        point2: ICoordinates,
        point3: ICoordinates,
        angle: number,
        fill?: string,
        stroke?: string,
        alpha?: number,
    ) {
        super(id, point1.x, point1.y, angle, fill, stroke, alpha);

        this.point2 = point2;
        this.point3 = point3;
    }
}