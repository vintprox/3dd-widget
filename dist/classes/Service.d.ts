import HTTP from 'http-method-enum';
import { RequestData, RequestOptions } from 'DS/WAFData/WAFData';
/**
 * Class combining common authentication and request logic when facing 3DEXPERIENCE Platform web services.
 */
export default abstract class Service {
    /**
     * Name of top web service picked in response from `i3DXCompassServices.getPlatformServices`.
     */
    static topServiceName: string;
    /**
     * Base URL for making requests (which include authentication request for top service).
     * Call to `Widget.fetchServices` makes it easy to prepend top service URL.
     * URI relative to top service URL can be filled in for descendant service.
     */
    static url: string;
    /**
     * Whether client has already received token.
     */
    protected static isAuthenticated: boolean;
    /**
     * URI relative to base `url` that is used for receiving token for authentication.
     */
    protected static authURI: string;
    /**
     * Options that govern how authentication request and response will be treated.
     */
    protected static authOptions: RequestOptions<any, any>;
    /**
     * Common options that govern how requests and responses will be treated.
     * For example, it is used for sending authenticated requests with same token in header.
     */
    protected static commonOptions: RequestOptions<any, any>;
    /**
     * Make request for authentication and call `signRequests` to apply token.
     * You don't need to call it on descendant service.
     */
    static authenticate(): Promise<void>;
    /**
     * Make authenticated GET request by URI relative to base `url`.
     * @param uri     URI to perform request onto
     * @param data    Request data
     * @param options Additional options that govern how request and response will be treated
     */
    static get(uri: string, data?: RequestData, options?: RequestOptions<any, any>): Promise<any>;
    /**
     * Make authenticated request by URI relative to base `url`.
     * @param method  HTTP method; Service.HTTP enum values are gladly accepted
     * @param uri     URI to perform request onto
     * @param data    Request data
     * @param options Additional options that govern how request and response will be treated
     */
    static request(method: HTTP, uri: string, data?: RequestData, options?: RequestOptions<any, any>): Promise<any>;
    /**
     * Method intended to be implemented by extending class.
     * It must add appropriate values in `commonOptions` for new authenticated requests.
     * @param data Response object with token
     */
    protected static signRequests(data: any): void;
}
export { HTTP };
//# sourceMappingURL=Service.d.ts.map