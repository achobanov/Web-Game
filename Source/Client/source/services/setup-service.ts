import Soldier from "../objects/soldier"
import utils from "../utils/utils";
import { IEntity } from "../objects/base/entity";
import AssetsService from "./assets-service";
import Sniper from '../../assets/Sniper.png';
import EventsService from "./events-service";

export default class SetupService {
    _assets: AssetsService;
    _events: EventsService

    constructor(assets: AssetsService, events: EventsService) {
        this._assets = assets;
        this._events = events;
    }
    
    proofOfConcept = async () : Promise<IEntity[]> => {
        await this._assets.haveLoaded;
        
        const id = utils.uId();
        const z = 1;
        const x = 550;
        const y = 550;
        const width = 50;
        const height = 50;
        const speed  = 10;
        const imageKey = Sniper;
        const framesCount = 8;
        const frames = this._assets.parseFrames(imageKey, framesCount);
        const frameRate = 6;

        const soldier = new Soldier(this._events, id, z, x, y, width, height, speed, imageKey, frames, frameRate);

        return [ soldier ];
    }
}