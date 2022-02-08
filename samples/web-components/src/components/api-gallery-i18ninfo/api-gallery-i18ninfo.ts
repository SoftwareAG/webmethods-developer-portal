import { AbstractPortalElement } from "../../abstract.portal.element";
import { ContextModel } from "../../model/context.model";
import { AllData, LEExcludingBox, LocalStrings } from "../../model/data/alldata.model";
import { ApiModel } from "../../model/data/api.model";
import { List } from "../../model/list";
import { RequestDataService } from "../../service/request.service";

export class ApiGalleryI18ninfo extends AbstractPortalElement {

    locales: any = {};

    constructor() {
        super();
        // console.log("### current context constructor is\n", this);
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
    }

    async render(): Promise<any> {
        const service = new RequestDataService();
        if (this.getData().id && this.checkIfValidUUID(this.getData().id)) {
            const thisData: AllData = await service.getAsJSON('/portal/rest/v1/apis/' + this.getData().id + '/i18n');
            // console.log("### current context is\n", this, this.parentElement.parentElement.parentElement.parentElement);
            let parentElem = this.parentElement;
            // throw new Error("Method not implemented.");
            const apiLocales: string[] = [];
            if (thisData.summary && thisData.summary.localStrings) {
                for (const item in thisData.summary.localStrings) {
                    apiLocales.push(item);
                }
            }
            // this.shadowRoot.innerHTML = this.getTemplate();
            let rootHtml = document.createElement("div");
            rootHtml.className = "i18n-wrapper";
            apiLocales.forEach(l => {
                const localeItem = document.createElement('span');
                localeItem.addEventListener('click', (evt) =>{
                    evt.preventDefault();
                    this.switchLocale(evt, l, parentElem);
                });
                // localeItem.innerText = l;
                const country = l.substring(l.indexOf("_") + 1);
                localeItem.className = "fi fi-" + country.toLowerCase();
                rootHtml.appendChild(localeItem);

                // store name, summary and description for later usage 
                this.locales[l] = {
                    "name": thisData.name.localStrings[l as LEExcludingBox],
                    "summary":thisData.summary.localStrings[l as LEExcludingBox],
                    "description": thisData.description.localStrings[l as LEExcludingBox]
                };
                
            });
            this.shadowRoot.innerHTML = `
                <style>
                    .i18n-wrapper {
                        text-align: right;
                    }
                    .fi {
                        background-size: contain;
                        background-position: 50%;
                        background-repeat: no-repeat;
                        position: relative;
                        display: inline-block;
                        width: 1.33333333em;
                        line-height: 1em;
                        margin: 0 2px;
                    }
                    .fi:before {
                        content: '\\00a0';
                    }
                    .fi.fis {
                        width: 1em;
                    }
                    .fi-de {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg);
                    }
                    .fi-de.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg);
                    }
                    .fi-de {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg);
                    }
                    .fi-de.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg);
                    }
                    .fi-us {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg);
                    }
                    .fi-us.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg);
                    }
                </style>`
                ;

            this.shadowRoot.appendChild(rootHtml);
            // let iconSelector = this.shadowRoot.querySelector('div.i18n-wrapper span');
            // // console.log("query selector\n", );
            // if (iconSelector != null) {
            //     iconSelector.addEventListener('click', (event) => {
            //         event.preventDefault();
            //         this.switchLocale(event);
            //     });
                
            // }
        } else {
            console.log("+-+ api-gallery-i18n: no api id found to check for locales... only an empty box will be rendered");
            let rootHtml = document.createElement("div");
            rootHtml.className = "i18n-wrapper"
            rootHtml.innerHTML = "i18n locale icons";
            this.shadowRoot.innerHTML = `
                <style>
                    .i18n-wrapper {
                        border: 1px solid #000011;
                    }
                </style>`
                ;
            this.shadowRoot.appendChild(rootHtml);

        }
    }

    switchLocale(evt:Event, l:any, parentElem:any) {
        // console.log("* switching locale to \n", [l, "\n-", this.parentElement, evt.target, this.querySelector('span.fi')]);
        // the parent element should be a 'yap-web-component'
        // its parent element should be a 'yap-div' element, which contains the API icon, title and description
        // we will check if these elements are there and switch the locale if it's different from the current one
        let apiTitleElem = parentElem.parentElement.querySelector('yap-link a');
        if (apiTitleElem != null) {
            apiTitleElem.innerText = this.locales[l].name;
        }
        let apiSummaryElem = parentElem.parentElement.querySelector('yap-paragraph p');
        if (apiSummaryElem != null) {
            apiSummaryElem.innerText = this.locales[l].summary;
        }
    }

    private getTemplate() {
        return `
        <div class="wrapper">
        </div>
    `;
    }
    private checkIfValidUUID(str: string) {
        // Regular expression to check if string is a valid UUID
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

        return regexExp.test(str);
    }
}