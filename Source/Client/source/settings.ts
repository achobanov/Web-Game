import Sniper from '../assets/Sniper.png';

export interface IAsset {
    path: string,
    frames: number,
    frameRate: number,
    image?: HTMLImageElement,
}

export interface ILaunchSettings {
    assets: IAsset[];
    setupKey: string,
}

var launchSettings : ILaunchSettings = {
    assets: [ 
        {
            path: Sniper,
            frames: 8,
            frameRate: 6
        }
    ],
    setupKey: 'proofOfConcept',
};

export default launchSettings; 