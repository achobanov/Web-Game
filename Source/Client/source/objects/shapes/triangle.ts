import { ITriangle, ICoordinates } from "../../services/canvas-service";

export default class Triangle implements ITriangle {
    point2: ICoordinates;
    point3: ICoordinates;
    x: number;
    y: number;

    constructor(point1: ICoordinates, point2: ICoordinates, point3: ICoordinates) {
        this.x = point1.x;
        this.y = point1.y;
        this.point2 = point2;
        this.point3 = point3;
    }
}