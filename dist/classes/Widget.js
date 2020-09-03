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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i3DXCompassServices_1 = __importDefault(require("DS/i3DXCompassServices/i3DXCompassServices"));
const NoWidgetError_1 = __importDefault(require("./errors/NoWidgetError"));
/**
 * Class with typed abstraction of 3DDashboard widget.
 * It also makes working with 3DEXPERIENCE web services more convenient if you use classes extending `Service`.
 */
class Widget {
    /**
     * Get platform ID and process instantiation options
     * @param options Options for widget instantiation
     */
    constructor(options = {}) {
        var _a;
        Widget.platform = { id: widget.getValue('x3dPlatformId') };
        if (options.removeDefaultStyles) {
            (_a = document.querySelector('link[href*="iframe.css"]')) === null || _a === void 0 ? void 0 : _a.remove();
        }
    }
    /**
     * Get widget's underlying URL.
     */
    static get href() {
        return new URLSearchParams(location.search).get('uwaUrl');
    }
    /**
     * Get underlying URL query parameters.
     */
    static get params() {
        return new URLSearchParams(this.href.substring(this.href.indexOf('?') + 1));
    }
    /**
     * Promisified `widget.addEvent`.
     * @param name Name of event
     * @return Promise that is resolved with an array of event result parameters
     */
    static listen(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!widget)
                throw new NoWidgetError_1.default();
            return new Promise(resolve => widget.addEvent(name, (...args) => resolve(args)));
        });
    }
    /**
     * Request platform service URLs and set them in required `Service` classes.
     * Prepends base URL of top service to each descendant service listed in array.
     * Retrieves display name of the platform as bonus.
     * @param services Array of `Service` classes required for working application
     * @return Promise that is resolved after initial authentication of all services was performed
     */
    static fetchServices(services) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                i3DXCompassServices_1.default.getPlatformServices({
                    platformId: Widget.platform.id,
                    onComplete: (_a) => {
                        var { platformId, displayName } = _a, urls = __rest(_a, ["platformId", "displayName"]);
                        Widget.platform.displayName = displayName;
                        const authPromises = [];
                        for (let service of services) {
                            if (!service.url) {
                                authPromises.push(service.authenticate());
                            }
                            service.url = urls[service.topServiceName] + service.url;
                        }
                        Promise.all(authPromises).then(resolve.bind(this));
                    },
                    onFailure: reject,
                    onTimeout: reject
                });
            });
        });
    }
}
exports.default = Widget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsYXNzZXMvV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxR0FBNkU7QUFFN0UsMkVBQW1EO0FBK0JuRDs7O0dBR0c7QUFDSCxNQUE4QixNQUFNO0lBTWxDOzs7T0FHRztJQUNILFlBQVksVUFBeUIsRUFBRTs7UUFDckMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7UUFDM0QsSUFBSSxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDL0IsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLDBDQUFFLE1BQU0sR0FBRztTQUM5RDtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sS0FBSyxJQUFJO1FBQ2IsT0FBTyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sS0FBSyxNQUFNO1FBQ2YsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFPLE1BQU0sQ0FBQyxJQUFZOztZQUM5QixJQUFJLENBQUMsTUFBTTtnQkFBRSxNQUFNLElBQUksdUJBQWEsRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQVEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLENBQUM7S0FBQTtJQUVEOzs7Ozs7T0FNRztJQUNPLE1BQU0sQ0FBTyxhQUFhLENBQUMsUUFBMEI7O1lBQzdELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLDZCQUFtQixDQUFDLG1CQUFtQixDQUFDO29CQUN0QyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5QixVQUFVLEVBQUUsQ0FBQyxFQUFzRCxFQUFFLEVBQUU7NEJBQTFELEVBQUUsVUFBVSxFQUFFLFdBQVcsT0FBNkIsRUFBeEIsSUFBSSxjQUFsQyw2QkFBb0MsQ0FBRjt3QkFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO3dCQUMxQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3hCLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFOzRCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQ0FDaEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTs2QkFDMUM7NEJBQ0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7eUJBQ3pEO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckQsQ0FBQztvQkFDRCxTQUFTLEVBQUUsTUFBTTtvQkFDakIsU0FBUyxFQUFFLE1BQU07aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUFwRUQseUJBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGkzRFhDb21wYXNzU2VydmljZXMgZnJvbSAnRFMvaTNEWENvbXBhc3NTZXJ2aWNlcy9pM0RYQ29tcGFzc1NlcnZpY2VzJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgTm9XaWRnZXRFcnJvciBmcm9tICcuL2Vycm9ycy9Ob1dpZGdldEVycm9yJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBjb25zdCB3aWRnZXQ6IGFueTtcbn1cblxuLyoqXG4gKiBVc3VhbCBkYXRhIGFib3V0IHBsYXRmb3JtLlxuICogTWF5IGJlIG5vdCBleGhhdXN0aW5nIG9uIGluaXRpYWxpemF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYXRmb3JtIHtcbiAgaWQ6IHN0cmluZztcbiAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVXN1YWwgcmVzcG9uc2UgZnJvbSBgaTNEWENvbXBhc3NTZXJ2aWNlcy5nZXRQbGF0Zm9ybVNlcnZpY2VzYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGF0Zm9ybVNlcnZpY2VzIHtcbiAgcGxhdGZvcm1JZDogc3RyaW5nO1xuICBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICBbc2VydmljZU5hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXaWRnZXRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVtb3ZlIHN0eWxlcyB0aGF0IGFyZSBlbWJlZGRlZCBpbnRvIDNERGFzaGJvYXJkIHdpZGdldCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcmVtb3ZlRGVmYXVsdFN0eWxlcz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ2xhc3Mgd2l0aCB0eXBlZCBhYnN0cmFjdGlvbiBvZiAzRERhc2hib2FyZCB3aWRnZXQuXG4gKiBJdCBhbHNvIG1ha2VzIHdvcmtpbmcgd2l0aCAzREVYUEVSSUVOQ0Ugd2ViIHNlcnZpY2VzIG1vcmUgY29udmVuaWVudCBpZiB5b3UgdXNlIGNsYXNzZXMgZXh0ZW5kaW5nIGBTZXJ2aWNlYC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgV2lkZ2V0IHtcbiAgLyoqXG4gICAqIERhdGEgYWJvdXQgcGxhdGZvcm0gdGhhdCBjYW4gYmUgYWNjZXNzZWQgdmlhIGBXaWRnZXQucGxhdGZvcm1gLlxuICAgKi9cbiAgc3RhdGljIHBsYXRmb3JtOiBQbGF0Zm9ybTtcblxuICAvKipcbiAgICogR2V0IHBsYXRmb3JtIElEIGFuZCBwcm9jZXNzIGluc3RhbnRpYXRpb24gb3B0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB3aWRnZXQgaW5zdGFudGlhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogV2lkZ2V0T3B0aW9ucyA9IHt9KSB7XG4gICAgV2lkZ2V0LnBsYXRmb3JtID0geyBpZDogd2lkZ2V0LmdldFZhbHVlKCd4M2RQbGF0Zm9ybUlkJykgfTtcbiAgICBpZiAob3B0aW9ucy5yZW1vdmVEZWZhdWx0U3R5bGVzKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW2hyZWYqPVwiaWZyYW1lLmNzc1wiXScpPy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHdpZGdldCdzIHVuZGVybHlpbmcgVVJMLlxuICAgKi9cbiAgc3RhdGljIGdldCBocmVmKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKS5nZXQoJ3V3YVVybCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1bmRlcmx5aW5nIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgc3RhdGljIGdldCBwYXJhbXMoKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLmhyZWYuc3Vic3RyaW5nKHRoaXMuaHJlZi5pbmRleE9mKCc/JykgKyAxKSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvbWlzaWZpZWQgYHdpZGdldC5hZGRFdmVudGAuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgZXZlbnRcbiAgICogQHJldHVybiBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2l0aCBhbiBhcnJheSBvZiBldmVudCByZXN1bHQgcGFyYW1ldGVyc1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIGxpc3RlbihuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXdpZGdldCkgdGhyb3cgbmV3IE5vV2lkZ2V0RXJyb3IoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55W10+KHJlc29sdmUgPT4gd2lkZ2V0LmFkZEV2ZW50KG5hbWUsICguLi5hcmdzKSA9PiByZXNvbHZlKGFyZ3MpKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCBwbGF0Zm9ybSBzZXJ2aWNlIFVSTHMgYW5kIHNldCB0aGVtIGluIHJlcXVpcmVkIGBTZXJ2aWNlYCBjbGFzc2VzLlxuICAgKiBQcmVwZW5kcyBiYXNlIFVSTCBvZiB0b3Agc2VydmljZSB0byBlYWNoIGRlc2NlbmRhbnQgc2VydmljZSBsaXN0ZWQgaW4gYXJyYXkuXG4gICAqIFJldHJpZXZlcyBkaXNwbGF5IG5hbWUgb2YgdGhlIHBsYXRmb3JtIGFzIGJvbnVzLlxuICAgKiBAcGFyYW0gc2VydmljZXMgQXJyYXkgb2YgYFNlcnZpY2VgIGNsYXNzZXMgcmVxdWlyZWQgZm9yIHdvcmtpbmcgYXBwbGljYXRpb25cbiAgICogQHJldHVybiBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgYWZ0ZXIgaW5pdGlhbCBhdXRoZW50aWNhdGlvbiBvZiBhbGwgc2VydmljZXMgd2FzIHBlcmZvcm1lZFxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBhc3luYyBmZXRjaFNlcnZpY2VzKHNlcnZpY2VzOiB0eXBlb2YgU2VydmljZVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGkzRFhDb21wYXNzU2VydmljZXMuZ2V0UGxhdGZvcm1TZXJ2aWNlcyh7XG4gICAgICAgIHBsYXRmb3JtSWQ6IFdpZGdldC5wbGF0Zm9ybS5pZCxcbiAgICAgICAgb25Db21wbGV0ZTogKHsgcGxhdGZvcm1JZCwgZGlzcGxheU5hbWUsIC4uLnVybHMgfTogUGxhdGZvcm1TZXJ2aWNlcykgPT4ge1xuICAgICAgICAgIFdpZGdldC5wbGF0Zm9ybS5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgICAgICAgIGNvbnN0IGF1dGhQcm9taXNlcyA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IHNlcnZpY2Ugb2Ygc2VydmljZXMpIHtcbiAgICAgICAgICAgIGlmICghc2VydmljZS51cmwpIHtcbiAgICAgICAgICAgICAgYXV0aFByb21pc2VzLnB1c2goc2VydmljZS5hdXRoZW50aWNhdGUoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlcnZpY2UudXJsID0gdXJsc1tzZXJ2aWNlLnRvcFNlcnZpY2VOYW1lXSArIHNlcnZpY2UudXJsXG4gICAgICAgICAgfVxuICAgICAgICAgIFByb21pc2UuYWxsKGF1dGhQcm9taXNlcykudGhlbihyZXNvbHZlLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuICAgICAgICBvbkZhaWx1cmU6IHJlamVjdCxcbiAgICAgICAgb25UaW1lb3V0OiByZWplY3RcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=