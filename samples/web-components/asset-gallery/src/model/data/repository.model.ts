export class RepositoryModel {
    name: string;
    id: string;
    summary: string;
    description: string;


    constructor(name: string, id: string, summary: string, description: string) {
        this.name = name;
        this.id = id;
        this.summary = summary;
        this.description = description;
    }
}
