/**
 * Web component for rendering a youtube video
 *
 * To fix the heigh/width of the video, you can adjust the width/height properties for iframe
 */

export class YouTubeElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const url = 'https://www.youtube.com/embed/XDBDczyF8Vc';
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = '<iframe width="1000px" height="600px" src="'+ url +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
}

customElements.define('wc-youtube', YouTubeElement);
