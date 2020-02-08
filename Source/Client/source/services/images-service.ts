import { IRenderable } from "./render-service";

export default class ImagesService {
    images: { [key:string]: HTMLImageElement };
    haveLoaded: Promise<void>

    constructor(imagePaths: Array<string>) {
        this.images = {};

        const requests = imagePaths.map(path => {
            const image = new Image();
            image.src = path

            this.images[path] = image;
            
            return new Promise((resolve, _) => {
                image.onload = () => resolve();
            });
        });

        this.haveLoaded = new Promise(async (resolve, _) => {
            await Promise.all(requests);
            resolve();            
        });
    }

    parseFrames = (key: string, framesCount: number) : IRenderable[] => {
        const image = this.images[key];

        let frameWidth;
        let frameHeight;

        var isHorizontalMap = image.width > image.height;

        if (isHorizontalMap) {
            frameHeight = image.height;
            frameWidth = image.width / framesCount;
        } else {
            frameHeight = image.height / framesCount;
            frameWidth = image.width;
        }

        const frames = [];
        let frameX = 0;
        let frameY = 0;
        for (let i = 0; i < framesCount; i++) {
            const frame : IRenderable = {
                x: frameX,
                y: frameY,
                width: frameWidth,
                height: frameHeight
            };

            frames.push(frame);
            
            if (isHorizontalMap)
                frameX += frameWidth;
            else
                frameY == frameHeight;
        }

        return frames;
    }

    get = (key: string) : HTMLImageElement => 
        this.images[key];
}