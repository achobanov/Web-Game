export default class GameObject {
    x: number;    
    y: number;
    width: number;
    height: number;
    speed: number;
    image: string;

    constructor(x: number, y: number, width: number, height: number, speed: number, image: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.image = image;
    }
}