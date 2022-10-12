import {ContextModel} from './model/context.model';

/**
 * Developer Portal requires the web-components, created by Administrators, to extend this class AbstractPortalElement
 *
 * Developer Portal rendering engine will invoke setContext method to set applicable context data, navigator function and localize function.
 *
 * It is recommended to write the rendering logic of the web-components with render() function as the initiator.
 */

export abstract class AbstractPortalElement extends HTMLElement {

    private context: ContextModel;

    /**
     * Starting point of the rendering logic. The method will be implemented by extending web-component owned by administrator.
     */
    abstract render(): void | Promise<any>;

    /**
     * This method will be invoked by web-component rendering engine
     */
    setContext(context: ContextModel): void {
        this.context = context;
        this.render();
    }

    /**
     * returns the context data specific to the use-case, if applicable.
     * @protected
     */
    protected getData(): any {
        if (this.context && this.context.getData) {
            return this.context.getData();
        }
    }

    /**
     * navigate to the location mentioned.
     * @param path
     * @protected
     */
    protected navigate(path: string): void {
        if (this.context && this.context.navigate) {
            this.context.navigate(path);
        }
    }

    /**
     * Provides the value for the given property key. If the key doesnt exist, key string itself will be returned.
     * @param key
     * @protected
     */
    protected getLocaleString(key: string): string {
        if (this.context && this.context.getLocaleString) {
            return this.context.getLocaleString(key);
        }
        return key;
    }
}
