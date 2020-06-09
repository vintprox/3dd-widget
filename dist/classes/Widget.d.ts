import Service from './Service';
/**
 * We consider that `widget` object is already accessible in `init` function implemented by extending class.
 */
declare global {
    const widget: any;
}
/**
 * Usual data about platform.
 * May be not exhausting on initialization.
 */
export interface Platform {
    id: string;
    displayName?: string;
}
/**
 * Usual response from `i3DXCompassServices.getPlatformServices`.
 */
export interface PlatformServices {
    platformId: string;
    displayName: string;
    [serviceName: string]: string;
}
export interface WidgetOptions {
    /**
     * Whether to remove styles that are embedded into 3DDashboard widget by default.
     */
    removeDefaultStyles?: boolean;
}
/**
 * Class with typed abstraction of 3DDashboard widget.
 * It also makes working with 3DEXPERIENCE web services more convenient if you use classes extending `Service`.
 */
export default abstract class Widget {
    /**
     * Data about platform that can be accessed via `Widget.platform`.
     */
    static platform: Platform;
    /**
     * Get platform ID and wait for `onLoad` to initialize everything else.
     * @param options Options for widget instantiation
     */
    constructor(options?: WidgetOptions);
    /**
     * Method intended to be implemented by extending class.
     * It must initialize application when `onLoad` event is being triggered by UWA.
     * There is guarantee that you will have access to `widget` object at the time of `init` is being called.
     */
    abstract init(): void;
    /**
     * Get widget's underlying URL.
     */
    static get href(): string;
    /**
     * Get underlying URL query parameters.
     */
    static get params(): URLSearchParams;
    /**
     * Promisified `widget.addEvent`.
     * @param name Name of event
     * @return Promise that is resolved with an array of event result parameters
     */
    static listen(name: string): Promise<any[]>;
    /**
     * Request platform service URLs and set them in required `Service` classes.
     * Retrieves display name of the platform as bonus.
     * @param services Array of `Service` classes required for working application
     * @return Promise that is resolved after initial authentication of all services was performed
     */
    protected static fetchServices(services: typeof Service[]): Promise<void>;
}
//# sourceMappingURL=Widget.d.ts.map