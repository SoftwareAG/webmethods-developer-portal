import {ContextModel} from "./context.model";

export class BannerComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    setContext(context: ContextModel) {
        this.render(context);
    }

    render(context: ContextModel) {
        this.shadowRoot.innerHTML = `
            <style>
                h3 {
                    font-weight: 100;
                    background: #ee7203;
                    padding:  10px;
                    margin: 0px;
                    position: relative;
                    left:  -20px;
                    color: #fff;
                    font-size: 20px;
                }
                h3::after {
                    border-left: 10px solid transparent;
                    border-top: 10px solid #a85000;
                    content: " ";
                    height: 0;
                    width: 0;
                    position: absolute;
                    bottom: 0px;
                    top: 100%;
                    left: 0;
            }
            </style>
            <h3>
                ${context.getData().name}
            </h3>
            `
    }

}
