import Shape, { IShape } from "./shape";

export interface ITextObject extends IShape {
    text: string;
}

export default class TextObject extends Shape implements ITextObject {
    text: string;

    constructor(id: string, text: string, x: number, y: number, width: number, height: number, angle: number, fill?: string) {
        super(id, x, y, angle, fill);

        this.text = text;
    }
}