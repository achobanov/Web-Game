import Soldier from '../assets/Soldier.png';

export interface IAssetInfo {
    path: string,
    framesCount: number,
    frameRate: number,
}

export interface ILaunchSettings {
    assets: IAssetInfo[];
    setupKey: string,
}

var launchSettings : ILaunchSettings = {
    assets: [ 
        {
            path: Soldier,
            framesCount: 8,
            frameRate: 6
        }
    ],
    setupKey: 'proofOfConcept',
};

export default launchSettings; 