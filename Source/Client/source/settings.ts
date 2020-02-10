import Soldier from '../assets/soldier.png';
import Rocket from '../assets/rocket.png';
import Explosion from '../assets/explosion.png';

export interface IAssetInfo {
    path: string,
    framesCount: number,
    frameRate: number,
}

export interface ILaunchSettings {
    assets: IAssetInfo[];
    setupKey: string,
    defaultFill: string,
}

var launchSettings : ILaunchSettings = {
    assets: [ 
        {
            path: Soldier,
            framesCount: 8,
            frameRate: 10,
        },
        {
            path: Rocket,
            framesCount: 4,
            frameRate: 25,
        },
        {
            path: Explosion,
            framesCount: 40,
            frameRate: 45,
        },
    ],
    setupKey: 'proofOfConcept',
    defaultFill: '#252729',
};

export default launchSettings; 