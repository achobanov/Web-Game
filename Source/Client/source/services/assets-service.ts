import { IRenderable } from "./canvas-service";
import { IAsset } from "../settings";

export default class AssetsService {
    assets: { [key:string]: IAsset };
    haveLoaded: Promise<void>

    constructor(assets: IAsset[]) {
        this.assets = {};

        
        const requests = assets.map(asset => {
            const image = new Image();
            image.src = asset.path
            asset.image = image;

            this.assets[asset.path] = asset;
            
            return new Promise((resolve, _) => {
                image.onload = () => resolve();
            });
        });

        this.haveLoaded = new Promise(async (resolve, _) => {
            await Promise.all(requests);
            resolve();            
        });
    }

    parseFrames = (key: string) : IRenderable[] => {
        const asset = this.assets[key];
        if (!asset.image) throw new Error('Image is not loaded.');

        const framesCount = asset.frames;
        const image = asset.image;
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

    get = (key: string) : HTMLImageElement | undefined => 
        this.assets[key]?.image;
}