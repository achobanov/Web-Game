import ImagesService from "./services/images-service";

export default class Game {
    resources: ImagesService
    
    constructor() {
        this.resources = new ImagesService()
    }
}
