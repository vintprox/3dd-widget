import HTTP from 'http-method-enum';
import merge from 'lodash.merge';
import { authenticatedRequest, RequestData, RequestOptions, OnCompleteCallBack, OnFailureCallBack } from 'DS/WAFData/WAFData';

/**
 * Class combining common authentication and request logic when facing 3DEXPERIENCE Platform web services.
 */
export default abstract class Service {
  /**
   * Name of web service picked in response from `i3DXCompassServices.getPlatformServices`.
   */
  static serviceName: string;

  /**
   * Base URL for making requests (which include authentication request).
   * Call to `Widget.fetchServices` makes it easy to fill in.
   */
  static url: string;

  /**
   * Whether client has already received token.
   */
  protected static isAuthenticated: boolean = false;

  /**
   * URI relative to base `url` that is used for receiving token for authentication.
   */
  protected static authURI: string;

  /**
   * Options that govern how authentication request and response will be treated.
   */
  protected static authOptions: RequestOptions<any, any> = {
    type: 'json'
  };

  /**
   * Common options that govern how requests and responses will be treated.
   * For example, it is used for sending authenticated requests with same token in header.
   */
  protected static commonOptions: RequestOptions<any, any> = {
    type: 'json',
    headers: {}
  };

  /**
   * Make request for authentication and call `signRequests` to apply token.
   */
  static async authenticate() {
    return new Promise<void>((resolve, reject) => {
      authenticatedRequest(this.url + this.authURI,
        Object.assign(
          {},
          this.authOptions,
          {
            onComplete: data => {
              this.signRequests(data);
              this.isAuthenticated = true;
              resolve();
            },
            onFailure: reject,
            onTimeout: reject
          }
        )
      );
    });
  }

  /**
   * Make authenticated GET request by URI relative to base `url``.
   * @param uri     URI to perform request onto
   * @param data    Request data
   * @param options Additional options that govern how request and response will be treated
   */
  static async get(uri: string, data?: RequestData, options?: RequestOptions<any, any>) {
    return await this.request(HTTP.GET, uri, data, options);
  }

  /**
   * Make authenticated request by URI relative to base `url``.
   * @param method  HTTP method; Service.HTTP enum values are gladly accepted
   * @param uri     URI to perform request onto
   * @param data    Request data
   * @param options Additional options that govern how request and response will be treated
   */
  static async request(method: HTTP, uri: string, data: RequestData = {}, options: RequestOptions<any, any> = {}) {
    return new Promise<any>((resolve, reject) => {
      let onComplete: OnCompleteCallBack<any> = (response, headers) => {
        options.onComplete && options.onComplete(response, headers);
        resolve(response);
      };
      let onFailure: OnFailureCallBack<any> = (error, response, headers) => {
        options.onFailure && options.onFailure(error, response, headers);
        reject(error);
      };
      let onTimeout = () => {
        options.onTimeout && options.onTimeout();
        reject();
      };
      authenticatedRequest(this.url + uri,
        merge(
          {},
          this.commonOptions,
          options,
          {
            data,
            method,
            onComplete,
            onFailure,
            onTimeout
          }
        )
      );
    });
  }

  /**
   * Method intended to be implemented by extending class.
   * It must add appropriate values in `commonOptions` for new authenticated requests.
   * @param data Response object with token
   */
  protected static signRequests(data: any) {}
}

export { HTTP };
