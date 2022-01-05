/**
 * Web component for google analytics
 *
 *
 * Google analytics uses scripts from www.googletagmanager.com and google-analytics.com and also connects to
 * google-analytics.com for data request. This requires CSP policy needs to be adapted.
 *
 * For example,
 *
 * default-src 'self' https://www.google-analytics.com/; script-src 'self' https://www.googletagmanager.com/ https://www.google-analytics.com/;
 *
 */

export class GoogleAnalyticsElement extends HTMLElement {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    connectedCallback() {
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.src = 'https://www.googletagmanager.com/gtag/js?id=UA-xxxxxxxxx-x'; // replace track id
        document.head.appendChild(scriptElement);

        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-xxxxxxxxx-x'); // replace track id
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/explicit-module-boundary-types
    setContext(context) {
        //do nothing
    }


}

customElements.define('wc-js-google-analytics', GoogleAnalyticsElement);
