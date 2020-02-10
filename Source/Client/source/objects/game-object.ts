import { IShape } from "./shapes/shape";

export default interface IGameObject extends IShape { 
    id: string;
    update?: (dT: number) => void;
}