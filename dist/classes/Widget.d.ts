import Service from './Service';
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
     * Get platform ID and process instantiation options
     * @param options Options for widget instantiation
     */
    constructor(options?: WidgetOptions);
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