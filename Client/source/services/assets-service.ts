import { IAssetInfo } from "../settings";
import { IRectangle } from "../objects/shapes/rectangle";

export interface IAsset extends IAssetInfo {
    frames: IRectangle[];
    image: HTMLImageElement;
}

export default class AssetsService {
    assets: { [key:string]: IAsset };
    haveLoaded: Promise<void>

    constructor(assets: IAssetInfo[]) {
        this.assets = {};
        this.haveLoaded = this._load(assets);
    }

    get = (key: string) : IAsset | undefined => 
        this.assets[key];

    _createAsset = (image: HTMLImageElement, assetInfo: IAssetInfo) : IAsset => ({ 
            ...assetInfo, 
            frames: this._parseFrames(image, assetInfo.framesCount),
            image,
        });

    _parseFrames = (image: HTMLImageElement, framesCount: number) : IRectangle[] => {
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
            const frame : IRectangle = {
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

    _load = (assets: IAssetInfo[]) : Promise<void> => {
        const requests = assets.map(assetInfo => {
            const image = new Image();
            image.src = assetInfo.path

            return new Promise((resolve, _) => {
                image.onload = () => {
                    const asset = this._createAsset(image, assetInfo);
                    this.assets[asset.path] = asset;
                    resolve();
                }
            });
        });

        return new Promise(async (resolve, _) => {
            await Promise.all(requests);
            resolve();            
        });
    }
}