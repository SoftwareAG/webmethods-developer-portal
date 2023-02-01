import {AbstractPortalElement} from "../abstract.portal.element";

export class AssetBox extends AbstractPortalElement {
    private asset: any;
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    render(): void | Promise<any> {
       this.asset = this.getData();
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    private getTemplate() {
        return `
        <style>
            :host {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #CCC;
                    box-shadow: 2px 4px 8px #ccc;
                    border-radius: 10px;
            }
            .view-button {
                color: var(--primary);
                background-image: none;
                box-shadow: none;
                padding: 5px 15px 6px 15px;
                font-weight: normal;
                text-decoration: none;
                margin-top: 20px;
                display: inline-block;
            }
            
            .description {
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            
            h2 {
                font-size: 22px;
                font-weight: 300;
                color: #333333;
                line-height: 40px;
                margin-top: 0;
            }
            

        </style>
        
    
    <h2>${this.asset.name}</h2>
    <div class="description">${this.asset.summary}</div>
    <a class="view-button" href="/portal/pages/assets/${this.asset.type}/${this.asset.id}">View details >> </a>
        `
    }


}
