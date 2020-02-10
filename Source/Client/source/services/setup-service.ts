import Soldier from "../objects/entities/soldier"
import utils from "../utils/utils";
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

        const id = utils.uId();
        const z = 1;
        const x = 550;
        const y = 550;

        const soldier = new Soldier(this._events, this._assets, id, z, x, y);

        return [ soldier ];
    }
}