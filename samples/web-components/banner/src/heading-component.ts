import {ContextModel} from "./context.model";

export class HeadingComponent extends HTMLElement {

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
                h1 {
                    font-weight: 100;
                }
            </style>
            <h1> ${context.getData().name}</h1>
            `
    }

}
