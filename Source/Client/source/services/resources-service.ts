export default class ResourcesService {
    images: { [key:string]: HTMLImageElement };
    haveLoaded: Promise<void>

    constructor(imagePaths: Array<string>) {
        this.images = {};

        const requests = imagePaths.map(path => {
            const image = new Image();
            image.src = path

            this.images[path] = image;
            
            return new Promise((resolve, _) => {
                image.onload = () => resolve();
            });
        });

        this.haveLoaded = new Promise(async (resolve, _) => {
            await Promise.all(requests);
            resolve();            
        });
    }
}