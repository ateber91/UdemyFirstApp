export class Recipe {
    public name: string;
    public description: string;
    public urlPath: string;

    constructor (name: string, description: string, urlPath: string) {
        this.name = name;
        this.description = description;
        this.urlPath = urlPath;
    }
}