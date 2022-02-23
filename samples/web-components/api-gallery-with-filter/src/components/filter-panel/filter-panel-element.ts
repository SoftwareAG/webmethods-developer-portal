import {RequestDataService} from '../../service/request.service';
import {ApiGalleryItemElement} from '../api-gallery-item/api-gallery-item-element';
import {AbstractPortalElement} from '../../abstract.portal.element';
import {FilterModel} from '../../model/data/filter.model';
import {List} from '../../model/list';
import {ApiModel} from '../../model/data/api.model';
import {LoadingSpinnerElement} from '../loading-spinner/loading-spinner-element';

export class FilterPanelElement extends AbstractPortalElement {

    filter: FilterModel;

    paginationLink: string;

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    private verifyCheckbox(data: string[], payload: any, type: string) {
        const values: string[] = [];
        if (data?.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if ((<HTMLInputElement>this.shadowRoot.getElementById(type + i))?.checked === true) {
                    values.push((<HTMLInputElement>this.shadowRoot.getElementById(type + i)).value);
                }
            }
        }
        if (values.length > 0) {
            payload.criterias.push({field: type, values: values, operation: 'EQUALS'});
        }
    }

    private getPayload() {
        const payload: any = {
            conjunction: 'AND',
            criterias: [{field: 'latest', values: ['true'], operation: 'EQUALS'}],
            sort: {name: 'ASC'}
        };

        this.verifyCheckbox(this.filter.type, payload, 'apitype');
        this.verifyCheckbox(this.filter.tags, payload, 'tags');
        this.verifyCheckbox(this.filter.maturityStatus, payload, 'maturitystatus');
        this.verifyCheckbox(this.filter.businessTerms, payload, 'businessterms');
        this.verifyCheckbox(this.filter.categories, payload, 'categories');
        return payload;
    }

    showLoader() {
        const htmlElement = document.createElement('loading-spinner');
        this.shadowRoot.getElementById('result')?.appendChild(htmlElement);
        (htmlElement as LoadingSpinnerElement).setContext({
            getData: () => null,
            getLocaleString: this.getLocaleString,
            navigate: this.navigate
        });
    }

    hideLoader() {
        for (let i = 0; i <= this.shadowRoot.getElementById('result').childNodes.length; i++) {
            if (this.shadowRoot.getElementById('result').childNodes[i]?.nodeName.toLowerCase() === 'loading-spinner') {
                this.shadowRoot.getElementById('result').removeChild(this.shadowRoot.getElementById('result').childNodes[i]);
            }
        }
    }

    async render(): Promise<any> {
        const service = new RequestDataService();
        this.shadowRoot.innerHTML = '<div id="result"></div>';
        this.showLoader();
        this.filter = await service.getAsJSON('/portal/rest/v1/apis/filter');
        this.hideLoader();
        this.shadowRoot.innerHTML = this.getTemplate();
        this.shadowRoot.querySelectorAll('.datacheckbox').forEach(e => e.addEventListener('click', (event) => {
            this.shadowRoot.getElementById('result').innerHTML = '';
            this.searchAPI('/portal/rest/v1/apis/search?page=0&limit=12');
        }));
        this.shadowRoot.getElementById('result').innerHTML = '';
        await this.searchAPI('/portal/rest/v1/apis/search?page=0&limit=12');
    }

    async searchAPI(link: string) {
        this.showLoader();
        const service = new RequestDataService();
        const payload = this.getPayload();
        const apis: List<ApiModel> = await service.postAsJSON(link, JSON.stringify(payload));
        const value: ApiModel[] = apis.result;
        this.paginationLink = apis._links?._next;
        value.forEach(api => {
            const htmlElement = document.createElement('api-gallery-item');
            this.shadowRoot.getElementById('result').appendChild(htmlElement);
            (htmlElement as ApiGalleryItemElement).setContext({
                getData: () => api,
                getLocaleString: this.getLocaleString,
                navigate: this.navigate
            });
        });
        this.hideLoader();
        if (this.paginationLink !== null && this.paginationLink !== undefined) {
            this.shadowRoot.getElementById('result').insertAdjacentHTML( 'beforeend', '<a id="loadmore" class="pointer loadmore"> Load more... </a>');
            this.shadowRoot.querySelector('.loadmore').addEventListener('click', (event) => {
                event.preventDefault();
                for (let i = 0; i <= this.shadowRoot.getElementById('result').childNodes.length; i++) {
                    if (this.shadowRoot.getElementById('result').childNodes[i]?.nodeName.toLowerCase() === 'a') {
                        this.shadowRoot.getElementById('result').removeChild(this.shadowRoot.getElementById('result').childNodes[i]);
                    }
                }
                this.searchAPI(this.paginationLink);
            });
        }
    }

    private getTemplate() {
        return `
            <style>
                .row {
                  color: var(--primary);
                  background: #fff;
                  padding: 0 1em 1em;
                  display:flex;
                  float: left;
                  flex-direction: row;
                  width: 95%;
                }
                
                input {
                  position: absolute;
                  opacity: 0;
                  z-index: -1;
                }

                .row .col {
                    flex:1;
                }
                .row .col:last-child {
                      /*margin-left: 1em;*/
                }
                
                .tabs {
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
                }
                .tab {
                  width: 100%;
                  color: white;
                  overflow: hidden;
                }
                
                 .tab-content {
                    max-height: 0;
                    padding: 0 1em;
                    color: var(--primary);
                    background: white;
                    transition: all .35s;
                }
                
                 .tab-close {
                    display: flex;
                    justify-content: flex-end;
                    padding: 1em;
                    font-size: 0.75em;
                    background: var(--primary);
                    cursor: pointer;
                  }
                
                 .tab-close:hover {
                      background: var(--primary-500);
                    }
                
                .tab-label {
                    display: flex;
                    justify-content: space-between;
                    padding: 1em;
                    background: var(--primary);
                    font-weight: bold;
                    cursor: pointer;
                    /* Icon */
                }
                
                .tab-label:hover {
                      background: var(--primary-500);
                }
                
                .tab-label::after {
                      content: "\\276F";
                      width: 1em;
                      height: 1em;
                      text-align: center;
                      transition: all .35s;
                }

                input:checked ~ .tab-content {
                    max-height: 100vh;
                    padding: 1em;
                }
                
                input:checked + .tab-label {
                    background: var(--primary-500);
                }
                
                input:checked + .tab-label::after {
                      transform: rotate(90deg);
                }
                
                .datacheckbox + label {
                  display: block;
                  /*margin: 0.2em;*/
                  cursor: pointer;
                  padding: 0.2em;
                }
                
                .datacheckbox {
                  display: none;
                }
                
                .datacheckbox + label:before {
                  content: "\\2714";
                  border: 0.1em solid #000;
                  border-radius: 0.2em;
                  display: inline-block;
                  width: 1em;
                  height: 1em;
                  padding-left: 0.2em;
                  padding-bottom: 0.3em;
                  margin-right: 0.2em;
                  vertical-align: bottom;
                  color: transparent;
                  transition: .2s;
                }
                
                .datacheckbox + label:active:before {
                  transform: scale(0);
                }
                
                .datacheckbox:checked + label:before {
                  background-color: var(--primary);
                  border-color: var(--primary);
                  color: #fff;
                }
                
                a:hover {
                    cursor: pointer;
                }

                </style>
            <div class="row">
              <div class="col" style="flex-basis: 30%; padding: 20px; width: 300px">
                <div class="tabs">
                            `

                    + this.getCategories() +

                    `
                            
                            `

                    + this.getType() +

                    `
                            
                            `

                    + this.getBusinessTerms() +


                    `
                            
                            `

                    + this.getTags() +


                    `
                            `

                    + this.getMaturity() +


                    `
                            <span> </span>
                </div>
              </div>
              <div class="col" id="result" style="flex-basis: 70%; padding: 20px; width: calc(100vw - 430px)">
              </div>
            </div>
            
            `;
    }

    getCategories() {
        if (this.filter.categories.length > 0) {
            return '<div class="tab"><input type="checkbox" id="chck1"><label class="tab-label" for="chck1">Categories</label><div class="tab-content" id="categories"> ' + this.getCheckbox(this.filter.categories, 'categories') + '</div></div>';
        }
        return '';
    }

    getTags() {
        if (this.filter.tags.length > 0) {
            return '<div class="tab"><input type="checkbox" id="chck4"><label class="tab-label" for="chck4">Tags</label><div class="tab-content"> ' + this.getCheckbox(this.filter.tags, 'tags') +   '</div></div>';
        }
        return '';
    }

    getBusinessTerms() {
        if (this.filter.businessTerms.length > 0) {
            return '<div class="tab"><input type="checkbox" id="chck3"><label class="tab-label" for="chck3">Business Terms</label><div class="tab-content"> ' + this.getCheckbox(this.filter.businessTerms, 'businessterms') + '</div></div>';
        }
        return '';
    }

    getMaturity() {
        if (this.filter.maturityStatus.length > 0) {
            return '<div class="tab"><input type="checkbox" id="chck5"><label class="tab-label" for="chck5">Maturity Status</label><div class="tab-content"> ' + this.getCheckbox(this.filter.maturityStatus, 'maturitystatus') + ' </div> </div>';
        }
        return '';
    }

    getType() {
        if (this.filter.type.length > 0) {
            return '<div class="tab"><input type="checkbox" id="chck2"><label class="tab-label" for="chck2">Type</label><div class="tab-content">'+ this.getCheckbox(this.filter.type, 'apitype') + ' </div> </div>';
        }
        return '';
    }

    getCheckbox(values: string[], type: string) {
        let tags = '';
        for (let i = 0; i < values.length; i++) {
            tags += '<input class="datacheckbox" type="checkbox" id=' + type + i + ' name=' + type + i + ' value=' + values[i] + '> <label for=' + type + i + '>' + values[i] + '</label>';
        }
        return tags;
    }
}
