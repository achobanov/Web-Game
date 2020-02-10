import Shape, { IShape } from "./shape";

export interface ITextObject extends IShape {
    text: string;
    font: string;
}

export default class TextObject extends Shape implements ITextObject {
    text: string;
    font: string;

    constructor(id: string, text: string, font: string,  x: number, y: number, angle: number, fill: string) {
        super(id, x, y, angle, fill);

        this.text = text;
        this.font = font;
    }
}