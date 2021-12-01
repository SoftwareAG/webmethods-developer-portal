import {RequestDataService} from '../../service/request.service';
import {List} from '../../model/list';
import {ApiModel} from '../../model/data/api.model';
import {ApiGalleryItemElement} from '../api-gallery-item/api-gallery-item-element';
import {AbstractPortalElement} from '../../abstract.portal.element';

export class ApiGalleryElement extends AbstractPortalElement {

    apis: any[] = [];

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    async render(): Promise<any> {
        const service = new RequestDataService();
        const payload = ApiGalleryElement.getPayload();
        const apis: List<ApiModel> = await service.postAsJSON('/portal/rest/v1/apis/search?page=0&limit=12', JSON.stringify(payload));
        const value: ApiModel[] = apis.result;
        if (!this.shadowRoot) {
            return;
        }
        this.shadowRoot.innerHTML = `
        <style> 
            :host {
                display: flex;
                flex-direction: column;
            }
            api-gallery-item:not(:nth-child(2)) {
                border-top: none;
            }
        </style>`
        ;

        value.forEach(api => {
            const htmlElement = document.createElement('api-gallery-item');
            this.shadowRoot?.appendChild(htmlElement);
            (htmlElement as ApiGalleryItemElement).setContext({
                getData: () => api,
                getLocaleString: this.getLocaleString,
                navigate: this.navigate
            });
        });

    }

    private static getPayload() {
        return {conjunction: 'AND', criterias: [{field: 'latest', values: ['true'], operation: 'EQUALS'}], sort: {name: 'ASC'}};
    }
}
