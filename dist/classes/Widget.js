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
/**
 * Class with typed abstraction of 3DDashboard widget.
 * It also makes working with 3DEXPERIENCE web services more convenient if you use classes extending `Service`.
 */
class Widget {
    /**
     * Get platform ID and wait for `onLoad` to initialize everything else.
     * @param options Options for widget instantiation
     */
    constructor(options = {}) {
        var _a;
        if (!widget)
            throw new Error(`Application must run as 3DDashboard widget`);
        Widget.platform = { id: widget.getValue('x3dPlatformId') };
        Widget.listen('onLoad').then(this.init);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsYXNzZXMvV2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxR0FBNkU7QUFtQzdFOzs7R0FHRztBQUNILE1BQThCLE1BQU07SUFNbEM7OztPQUdHO0lBQ0gsWUFBWSxVQUF5QixFQUFFOztRQUNyQyxJQUFJLENBQUMsTUFBTTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsUUFBUSxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDL0IsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLDBDQUFFLE1BQU0sR0FBRztTQUM5RDtJQUNILENBQUM7SUFTRDs7T0FFRztJQUNILE1BQU0sS0FBSyxJQUFJO1FBQ2IsT0FBTyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sS0FBSyxNQUFNO1FBQ2YsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFPLE1BQU0sQ0FBQyxJQUFZOztZQUM5QixPQUFPLElBQUksT0FBTyxDQUFRLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRixDQUFDO0tBQUE7SUFFRDs7Ozs7T0FLRztJQUNPLE1BQU0sQ0FBTyxhQUFhLENBQUMsUUFBMEI7O1lBQzdELE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLDZCQUFtQixDQUFDLG1CQUFtQixDQUFDO29CQUN0QyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5QixVQUFVLEVBQUUsQ0FBQyxFQUFzRCxFQUFFLEVBQUU7NEJBQTFELEVBQUUsVUFBVSxFQUFFLFdBQVcsT0FBNkIsRUFBeEIsSUFBSSxjQUFsQyw2QkFBb0MsQ0FBRjt3QkFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO3dCQUMxQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7d0JBQ3hCLEtBQUssSUFBSSxPQUFPLElBQUksUUFBUSxFQUFFOzRCQUM1QixPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7eUJBQzNDO3dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDckQsQ0FBQztvQkFDRCxTQUFTLEVBQUUsTUFBTTtvQkFDakIsU0FBUyxFQUFFLE1BQU07aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUF6RUQseUJBeUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGkzRFhDb21wYXNzU2VydmljZXMgZnJvbSAnRFMvaTNEWENvbXBhc3NTZXJ2aWNlcy9pM0RYQ29tcGFzc1NlcnZpY2VzJztcbmltcG9ydCBTZXJ2aWNlIGZyb20gJy4vU2VydmljZSc7XG5cbi8qKlxuICogV2UgY29uc2lkZXIgdGhhdCBgd2lkZ2V0YCBvYmplY3QgaXMgYWxyZWFkeSBhY2Nlc3NpYmxlIGluIGBpbml0YCBmdW5jdGlvbiBpbXBsZW1lbnRlZCBieSBleHRlbmRpbmcgY2xhc3MuXG4gKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgY29uc3Qgd2lkZ2V0OiBhbnk7XG59XG5cbi8qKlxuICogVXN1YWwgZGF0YSBhYm91dCBwbGF0Zm9ybS5cbiAqIE1heSBiZSBub3QgZXhoYXVzdGluZyBvbiBpbml0aWFsaXphdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQbGF0Zm9ybSB7XG4gIGlkOiBzdHJpbmc7XG4gIGRpc3BsYXlOYW1lPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFVzdWFsIHJlc3BvbnNlIGZyb20gYGkzRFhDb21wYXNzU2VydmljZXMuZ2V0UGxhdGZvcm1TZXJ2aWNlc2AuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGxhdGZvcm1TZXJ2aWNlcyB7XG4gIHBsYXRmb3JtSWQ6IHN0cmluZztcbiAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgW3NlcnZpY2VOYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lkZ2V0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIHJlbW92ZSBzdHlsZXMgdGhhdCBhcmUgZW1iZWRkZWQgaW50byAzRERhc2hib2FyZCB3aWRnZXQgYnkgZGVmYXVsdC5cbiAgICovXG4gIHJlbW92ZURlZmF1bHRTdHlsZXM/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIENsYXNzIHdpdGggdHlwZWQgYWJzdHJhY3Rpb24gb2YgM0REYXNoYm9hcmQgd2lkZ2V0LlxuICogSXQgYWxzbyBtYWtlcyB3b3JraW5nIHdpdGggM0RFWFBFUklFTkNFIHdlYiBzZXJ2aWNlcyBtb3JlIGNvbnZlbmllbnQgaWYgeW91IHVzZSBjbGFzc2VzIGV4dGVuZGluZyBgU2VydmljZWAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFdpZGdldCB7XG4gIC8qKlxuICAgKiBEYXRhIGFib3V0IHBsYXRmb3JtIHRoYXQgY2FuIGJlIGFjY2Vzc2VkIHZpYSBgV2lkZ2V0LnBsYXRmb3JtYC5cbiAgICovXG4gIHN0YXRpYyBwbGF0Zm9ybTogUGxhdGZvcm07XG5cbiAgLyoqXG4gICAqIEdldCBwbGF0Zm9ybSBJRCBhbmQgd2FpdCBmb3IgYG9uTG9hZGAgdG8gaW5pdGlhbGl6ZSBldmVyeXRoaW5nIGVsc2UuXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHdpZGdldCBpbnN0YW50aWF0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBXaWRnZXRPcHRpb25zID0ge30pIHtcbiAgICBpZiAoIXdpZGdldCkgdGhyb3cgbmV3IEVycm9yKGBBcHBsaWNhdGlvbiBtdXN0IHJ1biBhcyAzRERhc2hib2FyZCB3aWRnZXRgKTtcbiAgICBXaWRnZXQucGxhdGZvcm0gPSB7IGlkOiB3aWRnZXQuZ2V0VmFsdWUoJ3gzZFBsYXRmb3JtSWQnKSB9O1xuICAgIFdpZGdldC5saXN0ZW4oJ29uTG9hZCcpLnRoZW4odGhpcy5pbml0KTtcbiAgICBpZiAob3B0aW9ucy5yZW1vdmVEZWZhdWx0U3R5bGVzKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW2hyZWYqPVwiaWZyYW1lLmNzc1wiXScpPy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIGludGVuZGVkIHRvIGJlIGltcGxlbWVudGVkIGJ5IGV4dGVuZGluZyBjbGFzcy5cbiAgICogSXQgbXVzdCBpbml0aWFsaXplIGFwcGxpY2F0aW9uIHdoZW4gYG9uTG9hZGAgZXZlbnQgaXMgYmVpbmcgdHJpZ2dlcmVkIGJ5IFVXQS5cbiAgICogVGhlcmUgaXMgZ3VhcmFudGVlIHRoYXQgeW91IHdpbGwgaGF2ZSBhY2Nlc3MgdG8gYHdpZGdldGAgb2JqZWN0IGF0IHRoZSB0aW1lIG9mIGBpbml0YCBpcyBiZWluZyBjYWxsZWQuXG4gICAqL1xuICBhYnN0cmFjdCBpbml0KCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldCB3aWRnZXQncyB1bmRlcmx5aW5nIFVSTC5cbiAgICovXG4gIHN0YXRpYyBnZXQgaHJlZigpOiBzdHJpbmcge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCkuZ2V0KCd1d2FVcmwnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdW5kZXJseWluZyBVUkwgcXVlcnkgcGFyYW1ldGVycy5cbiAgICovXG4gIHN0YXRpYyBnZXQgcGFyYW1zKCk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy5ocmVmLnN1YnN0cmluZyh0aGlzLmhyZWYuaW5kZXhPZignPycpICsgMSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb21pc2lmaWVkIGB3aWRnZXQuYWRkRXZlbnRgLlxuICAgKiBAcGFyYW0gbmFtZSBOYW1lIG9mIGV2ZW50XG4gICAqIEByZXR1cm4gUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdpdGggYW4gYXJyYXkgb2YgZXZlbnQgcmVzdWx0IHBhcmFtZXRlcnNcbiAgICovXG4gIHN0YXRpYyBhc3luYyBsaXN0ZW4obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueVtdPihyZXNvbHZlID0+IHdpZGdldC5hZGRFdmVudChuYW1lLCAoLi4uYXJncykgPT4gcmVzb2x2ZShhcmdzKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcXVlc3QgcGxhdGZvcm0gc2VydmljZSBVUkxzIGFuZCBzZXQgdGhlbSBpbiByZXF1aXJlZCBgU2VydmljZWAgY2xhc3Nlcy5cbiAgICogUmV0cmlldmVzIGRpc3BsYXkgbmFtZSBvZiB0aGUgcGxhdGZvcm0gYXMgYm9udXMuXG4gICAqIEBwYXJhbSBzZXJ2aWNlcyBBcnJheSBvZiBgU2VydmljZWAgY2xhc3NlcyByZXF1aXJlZCBmb3Igd29ya2luZyBhcHBsaWNhdGlvblxuICAgKiBAcmV0dXJuIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCBhZnRlciBpbml0aWFsIGF1dGhlbnRpY2F0aW9uIG9mIGFsbCBzZXJ2aWNlcyB3YXMgcGVyZm9ybWVkXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGFzeW5jIGZldGNoU2VydmljZXMoc2VydmljZXM6IHR5cGVvZiBTZXJ2aWNlW10pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaTNEWENvbXBhc3NTZXJ2aWNlcy5nZXRQbGF0Zm9ybVNlcnZpY2VzKHtcbiAgICAgICAgcGxhdGZvcm1JZDogV2lkZ2V0LnBsYXRmb3JtLmlkLFxuICAgICAgICBvbkNvbXBsZXRlOiAoeyBwbGF0Zm9ybUlkLCBkaXNwbGF5TmFtZSwgLi4udXJscyB9OiBQbGF0Zm9ybVNlcnZpY2VzKSA9PiB7XG4gICAgICAgICAgV2lkZ2V0LnBsYXRmb3JtLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gICAgICAgICAgY29uc3QgYXV0aFByb21pc2VzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgc2VydmljZSBvZiBzZXJ2aWNlcykge1xuICAgICAgICAgICAgc2VydmljZS51cmwgPSB1cmxzW3NlcnZpY2Uuc2VydmljZU5hbWVdO1xuICAgICAgICAgICAgYXV0aFByb21pc2VzLnB1c2goc2VydmljZS5hdXRoZW50aWNhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFByb21pc2UuYWxsKGF1dGhQcm9taXNlcykudGhlbihyZXNvbHZlLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuICAgICAgICBvbkZhaWx1cmU6IHJlamVjdCxcbiAgICAgICAgb25UaW1lb3V0OiByZWplY3RcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=