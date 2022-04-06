/**
 * Data service - For HTTP Invocation
 */
export class RequestDataService {

    /**
     * Returns the data for POST request for the given url and payload
     * @param url
     * @param body
     */
    postAsJSON(url: string, body: string): Promise<any> {
        return fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xsrf-token': this.getCookie('xsrf-token')
            },
            body
        }).then((response) => {
            return response.json();
        }).then(function(text) {
            return text;
        });
    }

    /**
     * Get the cookie value for the given name.
     * @param name
     */
    getCookie(name: string): string {
        const nameLenPlus = (name.length + 1);
        return document.cookie
            .split(';')
            .map(c => c.trim())
            .filter(cookie => {
                return cookie.substring(0, nameLenPlus) === `${name}=`;
            })
            .map(cookie => {
                return (cookie.substring(nameLenPlus));
            })[0] || null;
    }

}
