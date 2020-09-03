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
     * You don't need to call it on descendant service.
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
     * Make authenticated GET request by URI relative to base `url`.
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
     * Make authenticated request by URI relative to base `url`.
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
 * Base URL for making requests (which include authentication request for top service).
 * Call to `Widget.fetchServices` makes it easy to prepend top service URL.
 * URI relative to top service URL can be filled in for descendant service.
 */
Service.url = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQW9DO0FBOEgzQixlQTlIRiwwQkFBSSxDQThIRTtBQTdIYixnRUFBaUM7QUFDakMsZ0RBQThIO0FBRTlIOztHQUVHO0FBQ0gsTUFBOEIsT0FBTztJQXVDbkM7OztPQUdHO0lBQ0gsTUFBTSxDQUFPLFlBQVk7O1lBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLDhCQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFDMUMsTUFBTSxDQUFDLE1BQU0sQ0FDWCxFQUFFLEVBQ0YsSUFBSSxDQUFDLFdBQVcsRUFDaEI7b0JBQ0UsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzt3QkFDNUIsT0FBTyxFQUFFLENBQUM7b0JBQ1osQ0FBQztvQkFDRCxTQUFTLEVBQUUsTUFBTTtvQkFDakIsU0FBUyxFQUFFLE1BQU07aUJBQ2xCLENBQ0YsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBTyxHQUFHLENBQUMsR0FBVyxFQUFFLElBQWtCLEVBQUUsT0FBa0M7O1lBQ2xGLE9BQU8sTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFPLE9BQU8sQ0FBQyxNQUFZLEVBQUUsR0FBVyxFQUFFLE9BQW9CLEVBQUUsRUFBRSxVQUFvQyxFQUFFOztZQUM1RyxPQUFPLElBQUksT0FBTyxDQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMxQyxJQUFJLFVBQVUsR0FBNEIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQzlELE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzVELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDO2dCQUNGLElBQUksU0FBUyxHQUEyQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUU7b0JBQ25FLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNqRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQztnQkFDRixJQUFJLFNBQVMsR0FBRyxHQUFHLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN6QyxNQUFNLEVBQUUsQ0FBQztnQkFDWCxDQUFDLENBQUM7Z0JBQ0YsOEJBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQ2pDLHNCQUFLLENBQ0gsRUFBRSxFQUNGLElBQUksQ0FBQyxhQUFhLEVBQ2xCLE9BQU8sRUFDUDtvQkFDRSxJQUFJO29CQUNKLE1BQU07b0JBQ04sVUFBVTtvQkFDVixTQUFTO29CQUNULFNBQVM7aUJBQ1YsQ0FDRixDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDTyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVMsSUFBRyxDQUFDOztBQXBIN0MsMEJBcUhDO0FBL0dDOzs7O0dBSUc7QUFDSSxXQUFHLEdBQVcsRUFBRSxDQUFDO0FBRXhCOztHQUVHO0FBQ2MsdUJBQWUsR0FBWSxLQUFLLENBQUM7QUFPbEQ7O0dBRUc7QUFDYyxtQkFBVyxHQUE2QjtJQUN2RCxJQUFJLEVBQUUsTUFBTTtDQUNiLENBQUM7QUFFRjs7O0dBR0c7QUFDYyxxQkFBYSxHQUE2QjtJQUN6RCxJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxFQUFFO0NBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIVFRQIGZyb20gJ2h0dHAtbWV0aG9kLWVudW0nO1xuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC5tZXJnZSc7XG5pbXBvcnQgeyBhdXRoZW50aWNhdGVkUmVxdWVzdCwgUmVxdWVzdERhdGEsIFJlcXVlc3RPcHRpb25zLCBPbkNvbXBsZXRlQ2FsbEJhY2ssIE9uRmFpbHVyZUNhbGxCYWNrIH0gZnJvbSAnRFMvV0FGRGF0YS9XQUZEYXRhJztcblxuLyoqXG4gKiBDbGFzcyBjb21iaW5pbmcgY29tbW9uIGF1dGhlbnRpY2F0aW9uIGFuZCByZXF1ZXN0IGxvZ2ljIHdoZW4gZmFjaW5nIDNERVhQRVJJRU5DRSBQbGF0Zm9ybSB3ZWIgc2VydmljZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFNlcnZpY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiB0b3Agd2ViIHNlcnZpY2UgcGlja2VkIGluIHJlc3BvbnNlIGZyb20gYGkzRFhDb21wYXNzU2VydmljZXMuZ2V0UGxhdGZvcm1TZXJ2aWNlc2AuXG4gICAqL1xuICBzdGF0aWMgdG9wU2VydmljZU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogQmFzZSBVUkwgZm9yIG1ha2luZyByZXF1ZXN0cyAod2hpY2ggaW5jbHVkZSBhdXRoZW50aWNhdGlvbiByZXF1ZXN0IGZvciB0b3Agc2VydmljZSkuXG4gICAqIENhbGwgdG8gYFdpZGdldC5mZXRjaFNlcnZpY2VzYCBtYWtlcyBpdCBlYXN5IHRvIHByZXBlbmQgdG9wIHNlcnZpY2UgVVJMLlxuICAgKiBVUkkgcmVsYXRpdmUgdG8gdG9wIHNlcnZpY2UgVVJMIGNhbiBiZSBmaWxsZWQgaW4gZm9yIGRlc2NlbmRhbnQgc2VydmljZS5cbiAgICovXG4gIHN0YXRpYyB1cmw6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGNsaWVudCBoYXMgYWxyZWFkeSByZWNlaXZlZCB0b2tlbi5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgaXNBdXRoZW50aWNhdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFVSSSByZWxhdGl2ZSB0byBiYXNlIGB1cmxgIHRoYXQgaXMgdXNlZCBmb3IgcmVjZWl2aW5nIHRva2VuIGZvciBhdXRoZW50aWNhdGlvbi5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgYXV0aFVSSTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBPcHRpb25zIHRoYXQgZ292ZXJuIGhvdyBhdXRoZW50aWNhdGlvbiByZXF1ZXN0IGFuZCByZXNwb25zZSB3aWxsIGJlIHRyZWF0ZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGF1dGhPcHRpb25zOiBSZXF1ZXN0T3B0aW9uczxhbnksIGFueT4gPSB7XG4gICAgdHlwZTogJ2pzb24nXG4gIH07XG5cbiAgLyoqXG4gICAqIENvbW1vbiBvcHRpb25zIHRoYXQgZ292ZXJuIGhvdyByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzIHdpbGwgYmUgdHJlYXRlZC5cbiAgICogRm9yIGV4YW1wbGUsIGl0IGlzIHVzZWQgZm9yIHNlbmRpbmcgYXV0aGVudGljYXRlZCByZXF1ZXN0cyB3aXRoIHNhbWUgdG9rZW4gaW4gaGVhZGVyLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBjb21tb25PcHRpb25zOiBSZXF1ZXN0T3B0aW9uczxhbnksIGFueT4gPSB7XG4gICAgdHlwZTogJ2pzb24nLFxuICAgIGhlYWRlcnM6IHt9XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2UgcmVxdWVzdCBmb3IgYXV0aGVudGljYXRpb24gYW5kIGNhbGwgYHNpZ25SZXF1ZXN0c2AgdG8gYXBwbHkgdG9rZW4uXG4gICAqIFlvdSBkb24ndCBuZWVkIHRvIGNhbGwgaXQgb24gZGVzY2VuZGFudCBzZXJ2aWNlLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGF1dGhlbnRpY2F0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXV0aGVudGljYXRlZFJlcXVlc3QodGhpcy51cmwgKyB0aGlzLmF1dGhVUkksXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge30sXG4gICAgICAgICAgdGhpcy5hdXRoT3B0aW9ucyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBkYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaWduUmVxdWVzdHMoZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbHVyZTogcmVqZWN0LFxuICAgICAgICAgICAgb25UaW1lb3V0OiByZWplY3RcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhdXRoZW50aWNhdGVkIEdFVCByZXF1ZXN0IGJ5IFVSSSByZWxhdGl2ZSB0byBiYXNlIGB1cmxgLlxuICAgKiBAcGFyYW0gdXJpICAgICBVUkkgdG8gcGVyZm9ybSByZXF1ZXN0IG9udG9cbiAgICogQHBhcmFtIGRhdGEgICAgUmVxdWVzdCBkYXRhXG4gICAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgb3B0aW9ucyB0aGF0IGdvdmVybiBob3cgcmVxdWVzdCBhbmQgcmVzcG9uc2Ugd2lsbCBiZSB0cmVhdGVkXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgZ2V0KHVyaTogc3RyaW5nLCBkYXRhPzogUmVxdWVzdERhdGEsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uczxhbnksIGFueT4pIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5yZXF1ZXN0KEhUVFAuR0VULCB1cmksIGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2UgYXV0aGVudGljYXRlZCByZXF1ZXN0IGJ5IFVSSSByZWxhdGl2ZSB0byBiYXNlIGB1cmxgLlxuICAgKiBAcGFyYW0gbWV0aG9kICBIVFRQIG1ldGhvZDsgU2VydmljZS5IVFRQIGVudW0gdmFsdWVzIGFyZSBnbGFkbHkgYWNjZXB0ZWRcbiAgICogQHBhcmFtIHVyaSAgICAgVVJJIHRvIHBlcmZvcm0gcmVxdWVzdCBvbnRvXG4gICAqIEBwYXJhbSBkYXRhICAgIFJlcXVlc3QgZGF0YVxuICAgKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgdGhhdCBnb3Zlcm4gaG93IHJlcXVlc3QgYW5kIHJlc3BvbnNlIHdpbGwgYmUgdHJlYXRlZFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIHJlcXVlc3QobWV0aG9kOiBIVFRQLCB1cmk6IHN0cmluZywgZGF0YTogUmVxdWVzdERhdGEgPSB7fSwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnM8YW55LCBhbnk+ID0ge30pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgb25Db21wbGV0ZTogT25Db21wbGV0ZUNhbGxCYWNrPGFueT4gPSAocmVzcG9uc2UsIGhlYWRlcnMpID0+IHtcbiAgICAgICAgb3B0aW9ucy5vbkNvbXBsZXRlICYmIG9wdGlvbnMub25Db21wbGV0ZShyZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfTtcbiAgICAgIGxldCBvbkZhaWx1cmU6IE9uRmFpbHVyZUNhbGxCYWNrPGFueT4gPSAoZXJyb3IsIHJlc3BvbnNlLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgIG9wdGlvbnMub25GYWlsdXJlICYmIG9wdGlvbnMub25GYWlsdXJlKGVycm9yLCByZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9O1xuICAgICAgbGV0IG9uVGltZW91dCA9ICgpID0+IHtcbiAgICAgICAgb3B0aW9ucy5vblRpbWVvdXQgJiYgb3B0aW9ucy5vblRpbWVvdXQoKTtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICB9O1xuICAgICAgYXV0aGVudGljYXRlZFJlcXVlc3QodGhpcy51cmwgKyB1cmksXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHRoaXMuY29tbW9uT3B0aW9ucyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBvbkNvbXBsZXRlLFxuICAgICAgICAgICAgb25GYWlsdXJlLFxuICAgICAgICAgICAgb25UaW1lb3V0XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCBpbnRlbmRlZCB0byBiZSBpbXBsZW1lbnRlZCBieSBleHRlbmRpbmcgY2xhc3MuXG4gICAqIEl0IG11c3QgYWRkIGFwcHJvcHJpYXRlIHZhbHVlcyBpbiBgY29tbW9uT3B0aW9uc2AgZm9yIG5ldyBhdXRoZW50aWNhdGVkIHJlcXVlc3RzLlxuICAgKiBAcGFyYW0gZGF0YSBSZXNwb25zZSBvYmplY3Qgd2l0aCB0b2tlblxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBzaWduUmVxdWVzdHMoZGF0YTogYW55KSB7fVxufVxuXG5leHBvcnQgeyBIVFRQIH07XG4iXX0=