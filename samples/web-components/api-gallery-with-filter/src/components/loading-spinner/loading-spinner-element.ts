import {AbstractPortalElement} from '../../abstract.portal.element';

export class LoadingSpinnerElement extends AbstractPortalElement{
    constructor() {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    render(): void {
        this.shadowRoot.innerHTML = this.getTemplate();
    }

    private getTemplate() {
        return `
        <style>
            .loading {
              display: flex;
              width: 50px;
              height: 50px;
              border: 3px solid #1776bf;
              border-radius: 50%;
              border-top-color: lightgray;
              animation: spin 1s ease-in-out infinite;
              -webkit-animation: spin 1s ease-in-out infinite;
            }
            
            .backalign {
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
            }

            
            @keyframes spin {
              to { -webkit-transform: rotate(360deg); }
            }
            @-webkit-keyframes spin {
              to { -webkit-transform: rotate(360deg); }
            }
            
        </style>
        <div class="backalign">
            <div class="loading"> </div>
        </div>
    `;
    }
}