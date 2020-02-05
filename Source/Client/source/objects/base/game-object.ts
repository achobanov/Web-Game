export default class GameObject {
    x: number;    
    y: number;
    width: number;
    height: number;
    imageKey: string;

    constructor(x: number, y: number, width: number, height: number, imageKey: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageKey = imageKey;
    }
}