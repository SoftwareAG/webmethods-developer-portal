import {RepositoryModel} from './repository.model';

export class ApiModel extends RepositoryModel {

    type: string;

    constructor(name: string, id: string, summary: string, description: string, type: string) {
        super(name, id, summary, description);
        this.type = type;
    }
}
