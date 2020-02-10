import Shape, { IShape } from "./shape";
import { ICoordinates } from "../../services/canvas-service";

export interface ITriangle extends IShape {
    point2: ICoordinates;
    point3: ICoordinates;
}

export default class Triangle extends Shape implements ITriangle {
    point2: ICoordinates;
    point3: ICoordinates;

    constructor(id: string, point1: ICoordinates, point2: ICoordinates, point3: ICoordinates, fill?: string) {
        super(id, point1.x, point1.y, fill)

        this.point2 = point2;
        this.point3 = point3;
    }
}