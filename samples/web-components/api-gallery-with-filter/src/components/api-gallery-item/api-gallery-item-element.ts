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
        this.shadowRoot.querySelector('.collapse').addEventListener('click', (event) => {
            event.preventDefault();
            this.shadowRoot.querySelector('.container').classList.toggle('in');
        });
        this.shadowRoot.querySelector('a.view').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = `/apis/${this.api.id}`;
        });
    }

    private getTemplate() {
        return `
        <style>
            .wrapper:hover {
                background: rgba(0,0,0,.75);
                color: #fff;
            }
            :host {
                display: flex;
                border: 1px solid #CACACA;
                margin: 10px;
                align-items: center;
            }
            .container {
             display: flex;
            }
            img {
                margin: 0 10px;
            }
            .collapse {
                display: inline-block;
                border: 0.4rem solid transparent;
                border-left-color: #4D4D4D;
                cursor: pointer;
                height: 0;
                width: 0;
                align-self: center;
                transition: all 0.5s ease-in-out;
            }
            .collapse-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.5s ease-in-out;
                padding: 0 10px;
            }
            .container.in .collapse {
                transform: rotateZ(90deg);
            }
            .container.in + .collapse-content {
                height: auto;
                max-height: 400px;
                overflow: auto;
            }
            .wrapper {
                display: flex;
                flex-direction: column;
                width: 100%;
            }
            .my-8p {
               margin-top: 0.5rem;
               margin-bottom: 0.5rem; 
            }
            .details {
                display: flex;
            }
            .detail {
                flex-grow: 1;
            }
            pre {
                align-self: center;
                margin: 0 5px;
            }
            a {
                text-decoration: none;
                color: var(--primary, #1789FF);
            }
        </style>
        <div class="wrapper">
            <div class="container">
                <a href="javascript:;" class="collapse"></a>
                <img src="/portal/${this.api.icon.url}" alt="${this.api.name}" height="48" width="48"/>
                <p> <a href="javascript:;" class="view">${this.api.name}</a> <pre>(${this.api.version})</pre></p>  
            </div>
            <div class="collapse-content">
                <h5 class="my-8p">Summary</h5>
                <small> ${this.api.summary} </small>
                
                <div class="details my-8p">
                    <div class="detail">
                           <h5 class="my-8p">Type</h5>
                           <div style="height: 80px; overflow: hidden;">
                            <small>${this.api.type}</small>
                           <div>
                    </div>
                    <div class="detail">
                           <h5 class="my-8p">Number of Resources</h5>
                           <small>${this.api.resourceIds?.length}</small>     
                    </div>
                    <div class="detail">
                           <h5 class="my-8p">Is Protected?</h5>
                           <small>${this.api.securitySchemes?.length ? 'Yes' : 'No'}</small>     
                    </div>
                    
                </div>
            </div>
        </div>
    `;
    }
}
