export class TwitterTimelineElement extends HTMLElement {


    constructor() {
        super();
    }

    connectedCallback() {
        const url = 'https://twitter.com/SoftwareAG?ref_src=twsrc%5Etfw';
        this.innerHTML = '<a class="twitter-timeline" data-height="350" href="' + url + '">Tweets by SoftwareAG</a>';
        this.loadWidgetJs();
    }

    loadWidgetJs() {
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.src = 'https://platform.twitter.com/widgets.js';
        document.head.appendChild(scriptElement);
    }
}

customElements.define('wc-twitter-timeline', TwitterTimelineElement);
