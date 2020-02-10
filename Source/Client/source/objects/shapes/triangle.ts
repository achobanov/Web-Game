import { ITriangle, ICoordinates } from "../../services/canvas-service";
import Shape from "./shape";

export default class Triangle extends Shape implements ITriangle {
    point2: ICoordinates;
    point3: ICoordinates;

    constructor(point1: ICoordinates, point2: ICoordinates, point3: ICoordinates) {
        super(point1.x, point1.y)

        this.point2 = point2;
        this.point3 = point3;
    }
}