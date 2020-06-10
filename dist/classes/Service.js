"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP = void 0;
const http_method_enum_1 = __importDefault(require("http-method-enum"));
exports.HTTP = http_method_enum_1.default;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const WAFData_1 = require("DS/WAFData/WAFData");
/**
 * Class combining common authentication and request logic when facing 3DEXPERIENCE Platform web services.
 */
class Service {
    /**
     * Make request for authentication and call `signRequests` to apply token.
     */
    static authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                WAFData_1.authenticatedRequest(this.url + this.authURI, Object.assign({}, this.authOptions, {
                    onComplete: data => {
                        this.signRequests(data);
                        this.isAuthenticated = true;
                        resolve();
                    },
                    onFailure: reject,
                    onTimeout: reject
                }));
            });
        });
    }
    /**
     * Make authenticated GET request by URI relative to base `url``.
     * @param uri     URI to perform request onto
     * @param data    Request data
     * @param options Additional options that govern how request and response will be treated
     */
    static get(uri, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(http_method_enum_1.default.GET, uri, data, options);
        });
    }
    /**
     * Make authenticated request by URI relative to base `url``.
     * @param method  HTTP method; Service.HTTP enum values are gladly accepted
     * @param uri     URI to perform request onto
     * @param data    Request data
     * @param options Additional options that govern how request and response will be treated
     */
    static request(method, uri, data = {}, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let onComplete = (response, headers) => {
                    options.onComplete && options.onComplete(response, headers);
                    resolve(response);
                };
                let onFailure = (error, response, headers) => {
                    options.onFailure && options.onFailure(error, response, headers);
                    reject(error);
                };
                let onTimeout = () => {
                    options.onTimeout && options.onTimeout();
                    reject();
                };
                WAFData_1.authenticatedRequest(this.url + uri, lodash_merge_1.default({}, this.commonOptions, options, {
                    data,
                    method,
                    onComplete,
                    onFailure,
                    onTimeout
                }));
            });
        });
    }
    /**
     * Method intended to be implemented by extending class.
     * It must add appropriate values in `commonOptions` for new authenticated requests.
     * @param data Response object with token
     */
    static signRequests(data) { }
}
exports.default = Service;
/**
 * Whether client has already received token.
 */
Service.isAuthenticated = false;
/**
 * Options that govern how authentication request and response will be treated.
 */
Service.authOptions = {
    type: 'json'
};
/**
 * Common options that govern how requests and responses will be treated.
 * For example, it is used for sending authenticated requests with same token in header.
 */
Service.commonOptions = {
    type: 'json',
    headers: {}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQW9DO0FBNEgzQixlQTVIRiwwQkFBSSxDQTRIRTtBQTNIYixnRUFBaUM7QUFDakMsZ0RBQThIO0FBRTlIOztHQUVHO0FBQ0gsTUFBOEIsT0FBTztJQXNDbkM7O09BRUc7SUFDSCxNQUFNLENBQU8sWUFBWTs7WUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDM0MsOEJBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUMxQyxNQUFNLENBQUMsTUFBTSxDQUNYLEVBQUUsRUFDRixJQUFJLENBQUMsV0FBVyxFQUNoQjtvQkFDRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3dCQUM1QixPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO29CQUNELFNBQVMsRUFBRSxNQUFNO29CQUNqQixTQUFTLEVBQUUsTUFBTTtpQkFDbEIsQ0FDRixDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBa0IsRUFBRSxPQUFrQzs7WUFDbEYsT0FBTyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQU8sT0FBTyxDQUFDLE1BQVksRUFBRSxHQUFXLEVBQUUsT0FBb0IsRUFBRSxFQUFFLFVBQW9DLEVBQUU7O1lBQzVHLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzFDLElBQUksVUFBVSxHQUE0QixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDOUQsT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxTQUFTLEdBQTJCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDbkUsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDO2dCQUNGLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRTtvQkFDbkIsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3pDLE1BQU0sRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQztnQkFDRiw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFDakMsc0JBQUssQ0FDSCxFQUFFLEVBQ0YsSUFBSSxDQUFDLGFBQWEsRUFDbEIsT0FBTyxFQUNQO29CQUNFLElBQUk7b0JBQ0osTUFBTTtvQkFDTixVQUFVO29CQUNWLFNBQVM7b0JBQ1QsU0FBUztpQkFDVixDQUNGLENBQ0YsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNPLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBUyxJQUFHLENBQUM7O0FBbEg3QywwQkFtSEM7QUF2R0M7O0dBRUc7QUFDYyx1QkFBZSxHQUFZLEtBQUssQ0FBQztBQU9sRDs7R0FFRztBQUNjLG1CQUFXLEdBQTZCO0lBQ3ZELElBQUksRUFBRSxNQUFNO0NBQ2IsQ0FBQztBQUVGOzs7R0FHRztBQUNjLHFCQUFhLEdBQTZCO0lBQ3pELElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLEVBQUU7Q0FDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhUVFAgZnJvbSAnaHR0cC1tZXRob2QtZW51bSc7XG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJztcbmltcG9ydCB7IGF1dGhlbnRpY2F0ZWRSZXF1ZXN0LCBSZXF1ZXN0RGF0YSwgUmVxdWVzdE9wdGlvbnMsIE9uQ29tcGxldGVDYWxsQmFjaywgT25GYWlsdXJlQ2FsbEJhY2sgfSBmcm9tICdEUy9XQUZEYXRhL1dBRkRhdGEnO1xuXG4vKipcbiAqIENsYXNzIGNvbWJpbmluZyBjb21tb24gYXV0aGVudGljYXRpb24gYW5kIHJlcXVlc3QgbG9naWMgd2hlbiBmYWNpbmcgM0RFWFBFUklFTkNFIFBsYXRmb3JtIHdlYiBzZXJ2aWNlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgU2VydmljZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHdlYiBzZXJ2aWNlIHBpY2tlZCBpbiByZXNwb25zZSBmcm9tIGBpM0RYQ29tcGFzc1NlcnZpY2VzLmdldFBsYXRmb3JtU2VydmljZXNgLlxuICAgKi9cbiAgc3RhdGljIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEJhc2UgVVJMIGZvciBtYWtpbmcgcmVxdWVzdHMgKHdoaWNoIGluY2x1ZGUgYXV0aGVudGljYXRpb24gcmVxdWVzdCkuXG4gICAqIENhbGwgdG8gYFdpZGdldC5mZXRjaFNlcnZpY2VzYCBtYWtlcyBpdCBlYXN5IHRvIGZpbGwgaW4uXG4gICAqL1xuICBzdGF0aWMgdXJsOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgY2xpZW50IGhhcyBhbHJlYWR5IHJlY2VpdmVkIHRva2VuLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVVJJIHJlbGF0aXZlIHRvIGJhc2UgYHVybGAgdGhhdCBpcyB1c2VkIGZvciByZWNlaXZpbmcgdG9rZW4gZm9yIGF1dGhlbnRpY2F0aW9uLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBhdXRoVVJJOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE9wdGlvbnMgdGhhdCBnb3Zlcm4gaG93IGF1dGhlbnRpY2F0aW9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlIHdpbGwgYmUgdHJlYXRlZC5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgYXV0aE9wdGlvbnM6IFJlcXVlc3RPcHRpb25zPGFueSwgYW55PiA9IHtcbiAgICB0eXBlOiAnanNvbidcbiAgfTtcblxuICAvKipcbiAgICogQ29tbW9uIG9wdGlvbnMgdGhhdCBnb3Zlcm4gaG93IHJlcXVlc3RzIGFuZCByZXNwb25zZXMgd2lsbCBiZSB0cmVhdGVkLlxuICAgKiBGb3IgZXhhbXBsZSwgaXQgaXMgdXNlZCBmb3Igc2VuZGluZyBhdXRoZW50aWNhdGVkIHJlcXVlc3RzIHdpdGggc2FtZSB0b2tlbiBpbiBoZWFkZXIuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGNvbW1vbk9wdGlvbnM6IFJlcXVlc3RPcHRpb25zPGFueSwgYW55PiA9IHtcbiAgICB0eXBlOiAnanNvbicsXG4gICAgaGVhZGVyczoge31cbiAgfTtcblxuICAvKipcbiAgICogTWFrZSByZXF1ZXN0IGZvciBhdXRoZW50aWNhdGlvbiBhbmQgY2FsbCBgc2lnblJlcXVlc3RzYCB0byBhcHBseSB0b2tlbi5cbiAgICovXG4gIHN0YXRpYyBhc3luYyBhdXRoZW50aWNhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF1dGhlbnRpY2F0ZWRSZXF1ZXN0KHRoaXMudXJsICsgdGhpcy5hdXRoVVJJLFxuICAgICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHRoaXMuYXV0aE9wdGlvbnMsXG4gICAgICAgICAge1xuICAgICAgICAgICAgb25Db21wbGV0ZTogZGF0YSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2lnblJlcXVlc3RzKGRhdGEpO1xuICAgICAgICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWx1cmU6IHJlamVjdCxcbiAgICAgICAgICAgIG9uVGltZW91dDogcmVqZWN0XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYXV0aGVudGljYXRlZCBHRVQgcmVxdWVzdCBieSBVUkkgcmVsYXRpdmUgdG8gYmFzZSBgdXJsYGAuXG4gICAqIEBwYXJhbSB1cmkgICAgIFVSSSB0byBwZXJmb3JtIHJlcXVlc3Qgb250b1xuICAgKiBAcGFyYW0gZGF0YSAgICBSZXF1ZXN0IGRhdGFcbiAgICogQHBhcmFtIG9wdGlvbnMgQWRkaXRpb25hbCBvcHRpb25zIHRoYXQgZ292ZXJuIGhvdyByZXF1ZXN0IGFuZCByZXNwb25zZSB3aWxsIGJlIHRyZWF0ZWRcbiAgICovXG4gIHN0YXRpYyBhc3luYyBnZXQodXJpOiBzdHJpbmcsIGRhdGE/OiBSZXF1ZXN0RGF0YSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zPGFueSwgYW55Pikge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnJlcXVlc3QoSFRUUC5HRVQsIHVyaSwgZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhdXRoZW50aWNhdGVkIHJlcXVlc3QgYnkgVVJJIHJlbGF0aXZlIHRvIGJhc2UgYHVybGBgLlxuICAgKiBAcGFyYW0gbWV0aG9kICBIVFRQIG1ldGhvZDsgU2VydmljZS5IVFRQIGVudW0gdmFsdWVzIGFyZSBnbGFkbHkgYWNjZXB0ZWRcbiAgICogQHBhcmFtIHVyaSAgICAgVVJJIHRvIHBlcmZvcm0gcmVxdWVzdCBvbnRvXG4gICAqIEBwYXJhbSBkYXRhICAgIFJlcXVlc3QgZGF0YVxuICAgKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgdGhhdCBnb3Zlcm4gaG93IHJlcXVlc3QgYW5kIHJlc3BvbnNlIHdpbGwgYmUgdHJlYXRlZFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBIVFRQLCB1cmk6IHN0cmluZywgZGF0YTogUmVxdWVzdERhdGEgPSB7fSwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnM8YW55LCBhbnk+ID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgb25Db21wbGV0ZTogT25Db21wbGV0ZUNhbGxCYWNrPGFueT4gPSAocmVzcG9uc2UsIGhlYWRlcnMpID0+IHtcbiAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlICYmIG9wdGlvbnMub25Db21wbGV0ZShyZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfTtcbiAgICAgIGxldCBvbkZhaWx1cmU6IE9uRmFpbHVyZUNhbGxCYWNrPGFueT4gPSAoZXJyb3IsIHJlc3BvbnNlLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgIG9wdGlvbnMub25GYWlsdXJlICYmIG9wdGlvbnMub25GYWlsdXJlKGVycm9yLCByZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9O1xuICAgICAgbGV0IG9uVGltZW91dCA9ICgpID0+IHtcbiAgICAgICAgb3B0aW9ucy5vblRpbWVvdXQgJiYgb3B0aW9ucy5vblRpbWVvdXQoKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9O1xuICAgICAgYXV0aGVudGljYXRlZFJlcXVlc3QodGhpcy51cmwgKyB1cmksXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHRoaXMuY29tbW9uT3B0aW9ucyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBvbkNvbXBsZXRlLFxuICAgICAgICAgICAgb25GYWlsdXJlLFxuICAgICAgICAgICAgb25UaW1lb3V0XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBpbnRlbmRlZCB0byBiZSBpbXBsZW1lbnRlZCBieSBleHRlbmRpbmcgY2xhc3MuXG4gICAqIEl0IG11c3QgYWRkIGFwcHJvcHJpYXRlIHZhbHVlcyBpbiBgY29tbW9uT3B0aW9uc2AgZm9yIG5ldyBhdXRoZW50aWNhdGVkIHJlcXVlc3RzLlxuICAgKiBAcGFyYW0gZGF0YSBSZXNwb25zZSBvYmplY3Qgd2l0aCB0b2tlblxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBzaWduUmVxdWVzdHMoZGF0YTogYW55KSB7fVxufVxuXG5leHBvcnQgeyBIVFRQIH07XG4iXX0=