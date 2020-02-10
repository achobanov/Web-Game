import Soldier from "../objects/entities/soldier"
import AssetsService from "./assets-service";
import EventsService from "./events-service";
import IGameObject from "../objects/game-object";

export default class SetupService {
    _assets: AssetsService;
    _events: EventsService

    constructor(assets: AssetsService, events: EventsService) {
        this._assets = assets;
        this._events = events;
    }
    
    proofOfConcept = async () : Promise<IGameObject[]> => {
        await this._assets.haveLoaded;

        const x = 480;
        const y = 200;

        const soldier = new Soldier(this._events, this._assets, x, y);

        return [ soldier ];
    }
}