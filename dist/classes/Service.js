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
const merge_1 = __importDefault(require("lodash/merge"));
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
                WAFData_1.authenticatedRequest(this.url + uri, merge_1.default({}, this.commonOptions, options, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jbGFzc2VzL1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0VBQW9DO0FBNEgzQixlQTVIRiwwQkFBSSxDQTRIRTtBQTNIYix5REFBaUM7QUFDakMsZ0RBQThIO0FBRTlIOztHQUVHO0FBQ0gsTUFBOEIsT0FBTztJQXNDbkM7O09BRUc7SUFDSCxNQUFNLENBQU8sWUFBWTs7WUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDM0MsOEJBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUMxQyxNQUFNLENBQUMsTUFBTSxDQUNYLEVBQUUsRUFDRixJQUFJLENBQUMsV0FBVyxFQUNoQjtvQkFDRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO3dCQUM1QixPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO29CQUNELFNBQVMsRUFBRSxNQUFNO29CQUNqQixTQUFTLEVBQUUsTUFBTTtpQkFDbEIsQ0FDRixDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFPLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBa0IsRUFBRSxPQUFrQzs7WUFDbEYsT0FBTyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQU8sT0FBTyxDQUFDLE1BQVksRUFBRSxHQUFXLEVBQUUsT0FBb0IsRUFBRSxFQUFFLFVBQW9DLEVBQUU7O1lBQzVHLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzFDLElBQUksVUFBVSxHQUE0QixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDOUQsT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNwQixDQUFDLENBQUM7Z0JBQ0YsSUFBSSxTQUFTLEdBQTJCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtvQkFDbkUsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDO2dCQUNGLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRTtvQkFDbkIsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3pDLE1BQU0sRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQztnQkFDRiw4QkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFDakMsZUFBSyxDQUNILEVBQUUsRUFDRixJQUFJLENBQUMsYUFBYSxFQUNsQixPQUFPLEVBQ1A7b0JBQ0UsSUFBSTtvQkFDSixNQUFNO29CQUNOLFVBQVU7b0JBQ1YsU0FBUztvQkFDVCxTQUFTO2lCQUNWLENBQ0YsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ08sTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFTLElBQUcsQ0FBQzs7QUFsSDdDLDBCQW1IQztBQXZHQzs7R0FFRztBQUNjLHVCQUFlLEdBQVksS0FBSyxDQUFDO0FBT2xEOztHQUVHO0FBQ2MsbUJBQVcsR0FBNkI7SUFDdkQsSUFBSSxFQUFFLE1BQU07Q0FDYixDQUFDO0FBRUY7OztHQUdHO0FBQ2MscUJBQWEsR0FBNkI7SUFDekQsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsRUFBRTtDQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSFRUUCBmcm9tICdodHRwLW1ldGhvZC1lbnVtJztcbmltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnO1xuaW1wb3J0IHsgYXV0aGVudGljYXRlZFJlcXVlc3QsIFJlcXVlc3REYXRhLCBSZXF1ZXN0T3B0aW9ucywgT25Db21wbGV0ZUNhbGxCYWNrLCBPbkZhaWx1cmVDYWxsQmFjayB9IGZyb20gJ0RTL1dBRkRhdGEvV0FGRGF0YSc7XG5cbi8qKlxuICogQ2xhc3MgY29tYmluaW5nIGNvbW1vbiBhdXRoZW50aWNhdGlvbiBhbmQgcmVxdWVzdCBsb2dpYyB3aGVuIGZhY2luZyAzREVYUEVSSUVOQ0UgUGxhdGZvcm0gd2ViIHNlcnZpY2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2Ygd2ViIHNlcnZpY2UgcGlja2VkIGluIHJlc3BvbnNlIGZyb20gYGkzRFhDb21wYXNzU2VydmljZXMuZ2V0UGxhdGZvcm1TZXJ2aWNlc2AuXG4gICAqL1xuICBzdGF0aWMgc2VydmljZU5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogQmFzZSBVUkwgZm9yIG1ha2luZyByZXF1ZXN0cyAod2hpY2ggaW5jbHVkZSBhdXRoZW50aWNhdGlvbiByZXF1ZXN0KS5cbiAgICogQ2FsbCB0byBgV2lkZ2V0LmZldGNoU2VydmljZXNgIG1ha2VzIGl0IGVhc3kgdG8gZmlsbCBpbi5cbiAgICovXG4gIHN0YXRpYyB1cmw6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciBjbGllbnQgaGFzIGFscmVhZHkgcmVjZWl2ZWQgdG9rZW4uXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGlzQXV0aGVudGljYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBVUkkgcmVsYXRpdmUgdG8gYmFzZSBgdXJsYCB0aGF0IGlzIHVzZWQgZm9yIHJlY2VpdmluZyB0b2tlbiBmb3IgYXV0aGVudGljYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGF1dGhVUkk6IHN0cmluZztcblxuICAvKipcbiAgICogT3B0aW9ucyB0aGF0IGdvdmVybiBob3cgYXV0aGVudGljYXRpb24gcmVxdWVzdCBhbmQgcmVzcG9uc2Ugd2lsbCBiZSB0cmVhdGVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBhdXRoT3B0aW9uczogUmVxdWVzdE9wdGlvbnM8YW55LCBhbnk+ID0ge1xuICAgIHR5cGU6ICdqc29uJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb21tb24gb3B0aW9ucyB0aGF0IGdvdmVybiBob3cgcmVxdWVzdHMgYW5kIHJlc3BvbnNlcyB3aWxsIGJlIHRyZWF0ZWQuXG4gICAqIEZvciBleGFtcGxlLCBpdCBpcyB1c2VkIGZvciBzZW5kaW5nIGF1dGhlbnRpY2F0ZWQgcmVxdWVzdHMgd2l0aCBzYW1lIHRva2VuIGluIGhlYWRlci5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgY29tbW9uT3B0aW9uczogUmVxdWVzdE9wdGlvbnM8YW55LCBhbnk+ID0ge1xuICAgIHR5cGU6ICdqc29uJyxcbiAgICBoZWFkZXJzOiB7fVxuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlIHJlcXVlc3QgZm9yIGF1dGhlbnRpY2F0aW9uIGFuZCBjYWxsIGBzaWduUmVxdWVzdHNgIHRvIGFwcGx5IHRva2VuLlxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGF1dGhlbnRpY2F0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXV0aGVudGljYXRlZFJlcXVlc3QodGhpcy51cmwgKyB0aGlzLmF1dGhVUkksXG4gICAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAge30sXG4gICAgICAgICAgdGhpcy5hdXRoT3B0aW9ucyxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBkYXRhID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaWduUmVxdWVzdHMoZGF0YSk7XG4gICAgICAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRmFpbHVyZTogcmVqZWN0LFxuICAgICAgICAgICAgb25UaW1lb3V0OiByZWplY3RcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhdXRoZW50aWNhdGVkIEdFVCByZXF1ZXN0IGJ5IFVSSSByZWxhdGl2ZSB0byBiYXNlIGB1cmxgYC5cbiAgICogQHBhcmFtIHVyaSAgICAgVVJJIHRvIHBlcmZvcm0gcmVxdWVzdCBvbnRvXG4gICAqIEBwYXJhbSBkYXRhICAgIFJlcXVlc3QgZGF0YVxuICAgKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgdGhhdCBnb3Zlcm4gaG93IHJlcXVlc3QgYW5kIHJlc3BvbnNlIHdpbGwgYmUgdHJlYXRlZFxuICAgKi9cbiAgc3RhdGljIGFzeW5jIGdldCh1cmk6IHN0cmluZywgZGF0YT86IFJlcXVlc3REYXRhLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnM8YW55LCBhbnk+KSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucmVxdWVzdChIVFRQLkdFVCwgdXJpLCBkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYWtlIGF1dGhlbnRpY2F0ZWQgcmVxdWVzdCBieSBVUkkgcmVsYXRpdmUgdG8gYmFzZSBgdXJsYGAuXG4gICAqIEBwYXJhbSBtZXRob2QgIEhUVFAgbWV0aG9kOyBTZXJ2aWNlLkhUVFAgZW51bSB2YWx1ZXMgYXJlIGdsYWRseSBhY2NlcHRlZFxuICAgKiBAcGFyYW0gdXJpICAgICBVUkkgdG8gcGVyZm9ybSByZXF1ZXN0IG9udG9cbiAgICogQHBhcmFtIGRhdGEgICAgUmVxdWVzdCBkYXRhXG4gICAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgb3B0aW9ucyB0aGF0IGdvdmVybiBob3cgcmVxdWVzdCBhbmQgcmVzcG9uc2Ugd2lsbCBiZSB0cmVhdGVkXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgcmVxdWVzdChtZXRob2Q6IEhUVFAsIHVyaTogc3RyaW5nLCBkYXRhOiBSZXF1ZXN0RGF0YSA9IHt9LCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9uczxhbnksIGFueT4gPSB7fSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBvbkNvbXBsZXRlOiBPbkNvbXBsZXRlQ2FsbEJhY2s8YW55PiA9IChyZXNwb25zZSwgaGVhZGVycykgPT4ge1xuICAgICAgICBvcHRpb25zLm9uQ29tcGxldGUgJiYgb3B0aW9ucy5vbkNvbXBsZXRlKHJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgbGV0IG9uRmFpbHVyZTogT25GYWlsdXJlQ2FsbEJhY2s8YW55PiA9IChlcnJvciwgcmVzcG9uc2UsIGhlYWRlcnMpID0+IHtcbiAgICAgICAgb3B0aW9ucy5vbkZhaWx1cmUgJiYgb3B0aW9ucy5vbkZhaWx1cmUoZXJyb3IsIHJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH07XG4gICAgICBsZXQgb25UaW1lb3V0ID0gKCkgPT4ge1xuICAgICAgICBvcHRpb25zLm9uVGltZW91dCAmJiBvcHRpb25zLm9uVGltZW91dCgpO1xuICAgICAgICByZWplY3QoKTtcbiAgICAgIH07XG4gICAgICBhdXRoZW50aWNhdGVkUmVxdWVzdCh0aGlzLnVybCArIHVyaSxcbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAge30sXG4gICAgICAgICAgdGhpcy5jb21tb25PcHRpb25zLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIG9uQ29tcGxldGUsXG4gICAgICAgICAgICBvbkZhaWx1cmUsXG4gICAgICAgICAgICBvblRpbWVvdXRcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGludGVuZGVkIHRvIGJlIGltcGxlbWVudGVkIGJ5IGV4dGVuZGluZyBjbGFzcy5cbiAgICogSXQgbXVzdCBhZGQgYXBwcm9wcmlhdGUgdmFsdWVzIGluIGBjb21tb25PcHRpb25zYCBmb3IgbmV3IGF1dGhlbnRpY2F0ZWQgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSBkYXRhIFJlc3BvbnNlIG9iamVjdCB3aXRoIHRva2VuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIHNpZ25SZXF1ZXN0cyhkYXRhOiBhbnkpIHt9XG59XG5cbmV4cG9ydCB7IEhUVFAgfTtcbiJdfQ==