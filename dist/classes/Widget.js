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
                            service.url = urls[service.serviceName];
                            authPromises.push(service.authenticate());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsYXNzZXMvV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxR0FBNkU7QUFFN0UsMkVBQW1EO0FBK0JuRDs7O0dBR0c7QUFDSCxNQUE4QixNQUFNO0lBTWxDOzs7T0FHRztJQUNILFlBQVksVUFBeUIsRUFBRTs7UUFDckMsTUFBTSxDQUFDLFFBQVEsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7UUFDM0QsSUFBSSxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDL0IsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLDBDQUFFLE1BQU0sR0FBRztTQUM5RDtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sS0FBSyxJQUFJO1FBQ2IsT0FBTyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sS0FBSyxNQUFNO1FBQ2YsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFPLE1BQU0sQ0FBQyxJQUFZOztZQUM5QixJQUFJLENBQUMsTUFBTTtnQkFBRSxNQUFNLElBQUksdUJBQWEsRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQVEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ08sTUFBTSxDQUFPLGFBQWEsQ0FBQyxRQUEwQjs7WUFDN0QsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDM0MsNkJBQW1CLENBQUMsbUJBQW1CLENBQUM7b0JBQ3RDLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzlCLFVBQVUsRUFBRSxDQUFDLEVBQXNELEVBQUUsRUFBRTs0QkFBMUQsRUFBRSxVQUFVLEVBQUUsV0FBVyxPQUE2QixFQUF4QixJQUFJLGNBQWxDLDZCQUFvQyxDQUFGO3dCQUM3QyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7d0JBQzFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsS0FBSyxJQUFJLE9BQU8sSUFBSSxRQUFRLEVBQUU7NEJBQzVCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDeEMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzt5QkFDM0M7d0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxDQUFDO29CQUNELFNBQVMsRUFBRSxNQUFNO29CQUNqQixTQUFTLEVBQUUsTUFBTTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRjtBQWpFRCx5QkFpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaTNEWENvbXBhc3NTZXJ2aWNlcyBmcm9tICdEUy9pM0RYQ29tcGFzc1NlcnZpY2VzL2kzRFhDb21wYXNzU2VydmljZXMnO1xuaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi9TZXJ2aWNlJztcbmltcG9ydCBOb1dpZGdldEVycm9yIGZyb20gJy4vZXJyb3JzL05vV2lkZ2V0RXJyb3InO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGNvbnN0IHdpZGdldDogYW55O1xufVxuXG4vKipcbiAqIFVzdWFsIGRhdGEgYWJvdXQgcGxhdGZvcm0uXG4gKiBNYXkgYmUgbm90IGV4aGF1c3Rpbmcgb24gaW5pdGlhbGl6YXRpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhdGZvcm0ge1xuICBpZDogc3RyaW5nO1xuICBkaXNwbGF5TmFtZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBVc3VhbCByZXNwb25zZSBmcm9tIGBpM0RYQ29tcGFzc1NlcnZpY2VzLmdldFBsYXRmb3JtU2VydmljZXNgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYXRmb3JtU2VydmljZXMge1xuICBwbGF0Zm9ybUlkOiBzdHJpbmc7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIFtzZXJ2aWNlTmFtZTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdpZGdldE9wdGlvbnMge1xuICAvKipcbiAgICogV2hldGhlciB0byByZW1vdmUgc3R5bGVzIHRoYXQgYXJlIGVtYmVkZGVkIGludG8gM0REYXNoYm9hcmQgd2lkZ2V0IGJ5IGRlZmF1bHQuXG4gICAqL1xuICByZW1vdmVEZWZhdWx0U3R5bGVzPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDbGFzcyB3aXRoIHR5cGVkIGFic3RyYWN0aW9uIG9mIDNERGFzaGJvYXJkIHdpZGdldC5cbiAqIEl0IGFsc28gbWFrZXMgd29ya2luZyB3aXRoIDNERVhQRVJJRU5DRSB3ZWIgc2VydmljZXMgbW9yZSBjb252ZW5pZW50IGlmIHlvdSB1c2UgY2xhc3NlcyBleHRlbmRpbmcgYFNlcnZpY2VgLlxuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBXaWRnZXQge1xuICAvKipcbiAgICogRGF0YSBhYm91dCBwbGF0Zm9ybSB0aGF0IGNhbiBiZSBhY2Nlc3NlZCB2aWEgYFdpZGdldC5wbGF0Zm9ybWAuXG4gICAqL1xuICBzdGF0aWMgcGxhdGZvcm06IFBsYXRmb3JtO1xuXG4gIC8qKlxuICAgKiBHZXQgcGxhdGZvcm0gSUQgYW5kIHByb2Nlc3MgaW5zdGFudGlhdGlvbiBvcHRpb25zXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHdpZGdldCBpbnN0YW50aWF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBXaWRnZXRPcHRpb25zID0ge30pIHtcbiAgICBXaWRnZXQucGxhdGZvcm0gPSB7IGlkOiB3aWRnZXQuZ2V0VmFsdWUoJ3gzZFBsYXRmb3JtSWQnKSB9O1xuICAgIGlmIChvcHRpb25zLnJlbW92ZURlZmF1bHRTdHlsZXMpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbaHJlZio9XCJpZnJhbWUuY3NzXCJdJyk/LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgd2lkZ2V0J3MgdW5kZXJseWluZyBVUkwuXG4gICAqL1xuICBzdGF0aWMgZ2V0IGhyZWYoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpLmdldCgndXdhVXJsJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHVuZGVybHlpbmcgVVJMIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqL1xuICBzdGF0aWMgZ2V0IHBhcmFtcygpOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKHRoaXMuaHJlZi5zdWJzdHJpbmcodGhpcy5ocmVmLmluZGV4T2YoJz8nKSArIDEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9taXNpZmllZCBgd2lkZ2V0LmFkZEV2ZW50YC5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiBldmVudFxuICAgKiBAcmV0dXJuIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aXRoIGFuIGFycmF5IG9mIGV2ZW50IHJlc3VsdCBwYXJhbWV0ZXJzXG4gICAqL1xuICBzdGF0aWMgYXN5bmMgbGlzdGVuKG5hbWU6IHN0cmluZykge1xuICAgIGlmICghd2lkZ2V0KSB0aHJvdyBuZXcgTm9XaWRnZXRFcnJvcigpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnlbXT4ocmVzb2x2ZSA9PiB3aWRnZXQuYWRkRXZlbnQobmFtZSwgKC4uLmFyZ3MpID0+IHJlc29sdmUoYXJncykpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXF1ZXN0IHBsYXRmb3JtIHNlcnZpY2UgVVJMcyBhbmQgc2V0IHRoZW0gaW4gcmVxdWlyZWQgYFNlcnZpY2VgIGNsYXNzZXMuXG4gICAqIFJldHJpZXZlcyBkaXNwbGF5IG5hbWUgb2YgdGhlIHBsYXRmb3JtIGFzIGJvbnVzLlxuICAgKiBAcGFyYW0gc2VydmljZXMgQXJyYXkgb2YgYFNlcnZpY2VgIGNsYXNzZXMgcmVxdWlyZWQgZm9yIHdvcmtpbmcgYXBwbGljYXRpb25cbiAgICogQHJldHVybiBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgYWZ0ZXIgaW5pdGlhbCBhdXRoZW50aWNhdGlvbiBvZiBhbGwgc2VydmljZXMgd2FzIHBlcmZvcm1lZFxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBhc3luYyBmZXRjaFNlcnZpY2VzKHNlcnZpY2VzOiB0eXBlb2YgU2VydmljZVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGkzRFhDb21wYXNzU2VydmljZXMuZ2V0UGxhdGZvcm1TZXJ2aWNlcyh7XG4gICAgICAgIHBsYXRmb3JtSWQ6IFdpZGdldC5wbGF0Zm9ybS5pZCxcbiAgICAgICAgb25Db21wbGV0ZTogKHsgcGxhdGZvcm1JZCwgZGlzcGxheU5hbWUsIC4uLnVybHMgfTogUGxhdGZvcm1TZXJ2aWNlcykgPT4ge1xuICAgICAgICAgIFdpZGdldC5wbGF0Zm9ybS5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgICAgICAgIGNvbnN0IGF1dGhQcm9taXNlcyA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IHNlcnZpY2Ugb2Ygc2VydmljZXMpIHtcbiAgICAgICAgICAgIHNlcnZpY2UudXJsID0gdXJsc1tzZXJ2aWNlLnNlcnZpY2VOYW1lXTtcbiAgICAgICAgICAgIGF1dGhQcm9taXNlcy5wdXNoKHNlcnZpY2UuYXV0aGVudGljYXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBQcm9taXNlLmFsbChhdXRoUHJvbWlzZXMpLnRoZW4ocmVzb2x2ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25GYWlsdXJlOiByZWplY3QsXG4gICAgICAgIG9uVGltZW91dDogcmVqZWN0XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19