import IGameObject from "../game-object";
import { ICoordinates } from "../../services/canvas-service";

export interface IShape extends ICoordinates {
    angle?: number;
    fill?: string;
    stroke?: string;
    alpha?: number;
}

export default class Shape implements IGameObject {
    id: string;
    x: number;    
    y: number;
    angle: number;
    fill?: string;
    stroke?: string;
    alpha?: number
    
    constructor(id: string, x: number, y: number, angle: number, fill?: string, stroke?: string, alpha?: number) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.fill = fill;
        this.stroke = stroke;
    }
}