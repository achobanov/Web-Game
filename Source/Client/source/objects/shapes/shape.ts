import IGameObject from "../game-object";
import { ICoordinates } from "../../services/canvas-service";

export interface IShape extends ICoordinates, IGameObject {}

export default class Shape implements IGameObject {
    id: string;
    x: number;    
    y: number;
    fill?: string;
    
    constructor(id: string, x: number, y: number, fill?: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.fill = fill;
    }
}