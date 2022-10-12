import {AbstractPortalElement} from '../../abstract.portal.element';

export class ApiGalleryItemElement extends AbstractPortalElement {

    private api: any;
    private navigator: { navigate: (_: string) => void };

    constructor() {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    render(): void {
        this.api = this.getData();
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    private getTemplate() {
        return `
        <style>
            .card-top{
                height: 190px;
                position: relative;
            }

            .card-body{
                height: 70px;
                overflow: hidden; word-break: break-word;
                text-overflow: ellipsis;
            }

            .card-footer {
                border-top: 1px solid #CACACA;
                color: #7e7e7e;
                font-size: .75em;
                height: 30px;
                line-height: 2rem;
             }

            .card-top-overlay:hover {
                background: rgba(0,0,0,.75);
                opacity: 1;
            }

            .card-top-overlay{
                opacity: 0;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            :host {
                display: flex;
                border: 1px solid #CACACA;
                margin: 10px;
                align-items: center;
            }

            .card{
                width: 100%;
            }

            .card-top-badge{
                position: absolute;
                font-size: .75em;
                top: 0px;
                right: 0px;
                color: #fff;
                height: 20px;
                padding-left: 15px;
                padding-right: 15px;
                padding-top: 7px;
                text-transform: uppercase;
                background: #bf1734;
            }

        </style>
        <div class="card">
            <div class="card-top">
                <a href="/portal/apis/${this.api.id}">
                    <div class="card-top-badge">${this.api.type}</div>
                    <img class="card-top-img" src="/portal/${this.api.icon.url}" alt="${this.api.name}" height="190px" width="100%" style="display:block"/>
                    <div class="card-top-overlay">
                        <h3 style="color: #fff">${this.api.name}</h3>
                    </div>
                </a>
            </div>
            <div class="card-body">
                <small>${this.api.summary}</small>
            </div>
            <div class="card-footer">
                Published on: ${this.api.modified}
            </div>
        </div>
    `;
    }
}
