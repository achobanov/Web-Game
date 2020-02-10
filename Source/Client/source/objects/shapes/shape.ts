import IGameObject from "../game-object";
import { ICoordinates } from "../../services/canvas-service";

export interface IShape extends ICoordinates {
    angle?: number;
    fill?: string;
    stroke?: string;
}

export default class Shape implements IGameObject {
    id: string;
    x: number;    
    y: number;
    angle: number;
    fill?: string;
    stroke?: string;
    
    constructor(id: string, x: number, y: number, angle: number, fill?: string, stroke?: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fill = fill;
        this.stroke = stroke;
    }
}