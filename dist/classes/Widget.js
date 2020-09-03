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
                    onComplete: (response) => {
                        Widget.platform.displayName = response.displayName;
                        const authPromises = [];
                        for (let service of services) {
                            const appendUrl = service.url;
                            service.url = response[service.topServiceName] + appendUrl;
                            if (!appendUrl) {
                                authPromises.push(service.authenticate());
                            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsYXNzZXMvV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUdBQTZFO0FBRTdFLDJFQUFtRDtBQStCbkQ7OztHQUdHO0FBQ0gsTUFBOEIsTUFBTTtJQU1sQzs7O09BR0c7SUFDSCxZQUFZLFVBQXlCLEVBQUU7O1FBQ3JDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQzNELElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFFO1lBQy9CLE1BQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQywwQ0FBRSxNQUFNLEdBQUc7U0FDOUQ7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLEtBQUssSUFBSTtRQUNiLE9BQU8sSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLEtBQUssTUFBTTtRQUNmLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBTyxNQUFNLENBQUMsSUFBWTs7WUFDOUIsSUFBSSxDQUFDLE1BQU07Z0JBQUUsTUFBTSxJQUFJLHVCQUFhLEVBQUUsQ0FBQztZQUN2QyxPQUFPLElBQUksT0FBTyxDQUFRLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRixDQUFDO0tBQUE7SUFFRDs7Ozs7O09BTUc7SUFDTyxNQUFNLENBQU8sYUFBYSxDQUFDLFFBQTBCOztZQUM3RCxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMzQyw2QkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDdEMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDOUIsVUFBVSxFQUFFLENBQUMsUUFBMEIsRUFBRSxFQUFFO3dCQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO3dCQUNuRCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3hCLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFOzRCQUM1QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBOzRCQUM3QixPQUFPLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsU0FBUyxDQUFBOzRCQUMxRCxJQUFJLENBQUMsU0FBUyxFQUFFO2dDQUNkLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUE7NkJBQzFDO3lCQUNGO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckQsQ0FBQztvQkFDRCxTQUFTLEVBQUUsTUFBTTtvQkFDakIsU0FBUyxFQUFFLE1BQU07aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUFyRUQseUJBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGkzRFhDb21wYXNzU2VydmljZXMgZnJvbSAnRFMvaTNEWENvbXBhc3NTZXJ2aWNlcy9pM0RYQ29tcGFzc1NlcnZpY2VzJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vU2VydmljZSc7XG5pbXBvcnQgTm9XaWRnZXRFcnJvciBmcm9tICcuL2Vycm9ycy9Ob1dpZGdldEVycm9yJztcblxuZGVjbGFyZSBnbG9iYWwge1xuICBjb25zdCB3aWRnZXQ6IGFueTtcbn1cblxuLyoqXG4gKiBVc3VhbCBkYXRhIGFib3V0IHBsYXRmb3JtLlxuICogTWF5IGJlIG5vdCBleGhhdXN0aW5nIG9uIGluaXRpYWxpemF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBsYXRmb3JtIHtcbiAgaWQ6IHN0cmluZztcbiAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVXN1YWwgcmVzcG9uc2UgZnJvbSBgaTNEWENvbXBhc3NTZXJ2aWNlcy5nZXRQbGF0Zm9ybVNlcnZpY2VzYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGF0Zm9ybVNlcnZpY2VzIHtcbiAgcGxhdGZvcm1JZDogc3RyaW5nO1xuICBkaXNwbGF5TmFtZTogc3RyaW5nO1xuICBbc2VydmljZU5hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXaWRnZXRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVtb3ZlIHN0eWxlcyB0aGF0IGFyZSBlbWJlZGRlZCBpbnRvIDNERGFzaGJvYXJkIHdpZGdldCBieSBkZWZhdWx0LlxuICAgKi9cbiAgcmVtb3ZlRGVmYXVsdFN0eWxlcz86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQ2xhc3Mgd2l0aCB0eXBlZCBhYnN0cmFjdGlvbiBvZiAzRERhc2hib2FyZCB3aWRnZXQuXG4gKiBJdCBhbHNvIG1ha2VzIHdvcmtpbmcgd2l0aCAzREVYUEVSSUVOQ0Ugd2ViIHNlcnZpY2VzIG1vcmUgY29udmVuaWVudCBpZiB5b3UgdXNlIGNsYXNzZXMgZXh0ZW5kaW5nIGBTZXJ2aWNlYC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgV2lkZ2V0IHtcbiAgLyoqXG4gICAqIERhdGEgYWJvdXQgcGxhdGZvcm0gdGhhdCBjYW4gYmUgYWNjZXNzZWQgdmlhIGBXaWRnZXQucGxhdGZvcm1gLlxuICAgKi9cbiAgc3RhdGljIHBsYXRmb3JtOiBQbGF0Zm9ybTtcblxuICAvKipcbiAgICogR2V0IHBsYXRmb3JtIElEIGFuZCBwcm9jZXNzIGluc3RhbnRpYXRpb24gb3B0aW9uc1xuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB3aWRnZXQgaW5zdGFudGlhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogV2lkZ2V0T3B0aW9ucyA9IHt9KSB7XG4gICAgV2lkZ2V0LnBsYXRmb3JtID0geyBpZDogd2lkZ2V0LmdldFZhbHVlKCd4M2RQbGF0Zm9ybUlkJykgfTtcbiAgICBpZiAob3B0aW9ucy5yZW1vdmVEZWZhdWx0U3R5bGVzKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW2hyZWYqPVwiaWZyYW1lLmNzc1wiXScpPy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHdpZGdldCdzIHVuZGVybHlpbmcgVVJMLlxuICAgKi9cbiAgc3RhdGljIGdldCBocmVmKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKS5nZXQoJ3V3YVVybCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1bmRlcmx5aW5nIFVSTCBxdWVyeSBwYXJhbWV0ZXJzLlxuICAgKi9cbiAgc3RhdGljIGdldCBwYXJhbXMoKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyh0aGlzLmhyZWYuc3Vic3RyaW5nKHRoaXMuaHJlZi5pbmRleE9mKCc/JykgKyAxKSk7XG4gIH1cblxuICAvKipcbiAgICogUHJvbWlzaWZpZWQgYHdpZGdldC5hZGRFdmVudGAuXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgZXZlbnRcbiAgICogQHJldHVybiBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2l0aCBhbiBhcnJheSBvZiBldmVudCByZXN1bHQgcGFyYW1ldGVyc1xuICAgKi9cbiAgc3RhdGljIGFzeW5jIGxpc3RlbihuYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIXdpZGdldCkgdGhyb3cgbmV3IE5vV2lkZ2V0RXJyb3IoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55W10+KHJlc29sdmUgPT4gd2lkZ2V0LmFkZEV2ZW50KG5hbWUsICguLi5hcmdzKSA9PiByZXNvbHZlKGFyZ3MpKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCBwbGF0Zm9ybSBzZXJ2aWNlIFVSTHMgYW5kIHNldCB0aGVtIGluIHJlcXVpcmVkIGBTZXJ2aWNlYCBjbGFzc2VzLlxuICAgKiBQcmVwZW5kcyBiYXNlIFVSTCBvZiB0b3Agc2VydmljZSB0byBlYWNoIGRlc2NlbmRhbnQgc2VydmljZSBsaXN0ZWQgaW4gYXJyYXkuXG4gICAqIFJldHJpZXZlcyBkaXNwbGF5IG5hbWUgb2YgdGhlIHBsYXRmb3JtIGFzIGJvbnVzLlxuICAgKiBAcGFyYW0gc2VydmljZXMgQXJyYXkgb2YgYFNlcnZpY2VgIGNsYXNzZXMgcmVxdWlyZWQgZm9yIHdvcmtpbmcgYXBwbGljYXRpb25cbiAgICogQHJldHVybiBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgYWZ0ZXIgaW5pdGlhbCBhdXRoZW50aWNhdGlvbiBvZiBhbGwgc2VydmljZXMgd2FzIHBlcmZvcm1lZFxuICAgKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBhc3luYyBmZXRjaFNlcnZpY2VzKHNlcnZpY2VzOiB0eXBlb2YgU2VydmljZVtdKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGkzRFhDb21wYXNzU2VydmljZXMuZ2V0UGxhdGZvcm1TZXJ2aWNlcyh7XG4gICAgICAgIHBsYXRmb3JtSWQ6IFdpZGdldC5wbGF0Zm9ybS5pZCxcbiAgICAgICAgb25Db21wbGV0ZTogKHJlc3BvbnNlOiBQbGF0Zm9ybVNlcnZpY2VzKSA9PiB7XG4gICAgICAgICAgV2lkZ2V0LnBsYXRmb3JtLmRpc3BsYXlOYW1lID0gcmVzcG9uc2UuZGlzcGxheU5hbWU7XG4gICAgICAgICAgY29uc3QgYXV0aFByb21pc2VzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgc2VydmljZSBvZiBzZXJ2aWNlcykge1xuICAgICAgICAgICAgY29uc3QgYXBwZW5kVXJsID0gc2VydmljZS51cmxcbiAgICAgICAgICAgIHNlcnZpY2UudXJsID0gcmVzcG9uc2Vbc2VydmljZS50b3BTZXJ2aWNlTmFtZV0gKyBhcHBlbmRVcmxcbiAgICAgICAgICAgIGlmICghYXBwZW5kVXJsKSB7XG4gICAgICAgICAgICAgIGF1dGhQcm9taXNlcy5wdXNoKHNlcnZpY2UuYXV0aGVudGljYXRlKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIFByb21pc2UuYWxsKGF1dGhQcm9taXNlcykudGhlbihyZXNvbHZlLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuICAgICAgICBvbkZhaWx1cmU6IHJlamVjdCxcbiAgICAgICAgb25UaW1lb3V0OiByZWplY3RcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=