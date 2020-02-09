import { IRenderable } from "./canvas-service";
import { IAssetInfo } from "../settings";

export interface IAsset extends IAssetInfo {
    frames: IRenderable[];
    image: HTMLImageElement;
}

export default class AssetsService {
    assets: { [key:string]: IAsset };
    haveLoaded: Promise<void>

    constructor(assets: IAssetInfo[]) {
        this.assets = {};

        
        const requests = assets.map(assetInfo => {
            const image = new Image();
            image.src = assetInfo.path

            return new Promise((resolve, _) => {
                image.onload = () => {
                    const asset = this._createAsset(image, assetInfo);
                    this.assets[asset.path] = asset;
                }
                resolve();
            });
        });

        this.haveLoaded = new Promise(async (resolve, _) => {
            await Promise.all(requests);
            resolve();            
        });
    }

    get = (key: string) : IAsset | undefined => 
        this.assets[key];

    _createAsset = (image: HTMLImageElement, assetInfo: IAssetInfo) : IAsset => ({ 
            ...assetInfo, 
            frames: this._parseFrames(image, assetInfo.framesCount),
            image,
        });

    _parseFrames = (image: HTMLImageElement, framesCount: number) : IRenderable[] => {
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
}