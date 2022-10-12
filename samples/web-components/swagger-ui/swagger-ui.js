
export class SwaggerUiElement extends HTMLElement {

    _context;
    constructor() {
        super();
    }
    setContext(context) {
        this._context = context;
    }

    connectedCallback() {


        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css';
        document.head.appendChild(linkElement);

        let elementByTagName = document.getElementsByTagName('customize-swagger-ui');
        const divElement = document.createElement('div');
        divElement.setAttribute("id","swagger-ui");

        elementByTagName[0].appendChild(divElement);

        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js';
        scriptElement.crossOrigin ='';
        document.body.appendChild(scriptElement);


        setTimeout(()=> {
            let attachments = this._context.getData().attachments;
            let uri = '/portal'+attachments.find(a => a.name.endsWith('swagger.json')).uri;

            window.ui = new SwaggerUIBundle({
                url: uri,
                dom_id: '#swagger-ui'
            });
        }, 1000);
    }
}

customElements.define('customize-swagger-ui', SwaggerUiElement);