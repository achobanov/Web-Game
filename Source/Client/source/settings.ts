import Sniper from '../assets/Sniper.png';

export interface ILaunchSettings {
    imagePaths: string[];
    setupKey: string,
}

var launchSettings : ILaunchSettings = {
    imagePaths: [ Sniper ],
    setupKey: 'proofOfConcept',
};

export default launchSettings; 