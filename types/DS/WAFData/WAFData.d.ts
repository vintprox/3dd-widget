declare module 'DS/WAFData/WAFData' {
  /**
   * Make request with DS 3DPassport authentication.
   * Used for 3DEXPERIENCE web services.
   * @param url     Direct URL
   * @param options Options that govern how request and response will be treated
   */
  export function authenticatedRequest(url: string, options: RequestOptions<any, any>): Request;

  /**
   * Delegate request to 3DDashboard Service proxy.
   * Used for external resources.
   * @param url     Direct URL
   * @param options Options that govern how request and response will be treated
   */
  export function proxifiedRequest(url: string, options: RequestOptions<any, any>): Request;

  /**
   * Make direct HTTP request.
   * Used for domains that are CORS-compliant with 3DDashboard.
   * @param url       Direct URL
   * @param options   Options that govern how request and response will be treated
   */
  export function request(url: string, options: RequestOptions<any, any>): Request;

  /**
   * Set the callback to handle unrecoverable DS Passport authentication error.
   */
  export function setErrorHandler(callback: (error: Error, authUrl: string | undefined) => void): void;

  export interface Request {
    /**
     * Cancel the asynchronous request.
     */
    cancel(): void;
  }

  /**
   * Data that will transformed according to method and sent with request.
   */
  export type RequestData = Object | BodyInit;

  export interface PlainHeaders { [name: string]: string; }

  /**
   * @template R  Response object type
   */
  export interface OnCompleteCallBack<R> {
    /**
     * @param response  The response in form of expected responseType
     * @param headers   Response headers
     */
    (response: R, headers: PlainHeaders): void;
  }

  /**
   * @template R  Response object type
   */
  export interface OnFailureCallBack<R> {
    /**
     * @param error     Error object
     * @param response  The response in form of expected responseType
     * @param headers   Response headers
     */
    (error: Error, response: R | undefined, headers: PlainHeaders): void;
  }

  /**
   * Expected response type.
   */
  export type ResponseType = 'text' | 'json' | 'document' | 'arraybuffer' | 'blob';

  /**
   * Options that govern how request and response will be treated.
   * @template S  Success response object type
   * @template F  Failure response object type
   */
  export interface RequestOptions<S, F> {
    /**
     * Data that is being sent along with request.
     * If it's Object, URLSearchParams or string, parameters will be added to URL of GET request. In other case, data will be placed in body.
     */
    data?: RequestData,

    /**
     * HTTP request method.
     */
    method?: string;

    /**
     * Whether to make asynchronous request as usual or not.
     * Though we don't recommend latter as it will freeze the client.
     */
    async?: boolean;

    /**
     * Shorthand for responseType option and Accept header.
     */
    type?: 'xml' | 'json';

    /**
     * Type of the response expected.
     */
    responseType?: ResponseType;

    /**
     * HTTP headers.
     */
    headers?: PlainHeaders;
    
    /**
     * Number of milliseconds a request can take before automatically being terminated.
     * Zero value leads to infinite request. The default value is 25 seconds.
     */
    timeout?: number;

    /**
     * Type of desired proxy for proxifiedRequest.
     */
    proxy?: 'passport' | 'ajax' | 'feed' | 'xml' | 'soap';

    /**
     * Callback that is called after success response.
     */
    onComplete?: OnCompleteCallBack<S>;

    /**
     * Callback that is called after failure response.
     */
    onFailure?: OnFailureCallBack<F>;

    /**
     * Callback that is called after timeout.
     */
    onTimeout?: () => void;

    /**
     * Callback that is called periodically with more data from response.
     */
    onProgress?(event: ProgressEvent): void;

    /**
     * Callback that is called periodically with more data uploaded.
     */
    onUploadProgress?(event: ProgressEvent): void;
  }
}
