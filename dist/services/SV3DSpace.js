"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../classes/Service"));
/**
 * Class facing 3DSpace web services.
 */
class SV3DSpace extends Service_1.default {
    static signRequests(data) {
        this.commonOptions.headers.ENO_CSRF_TOKEN = data.csrf.value;
    }
}
exports.default = SV3DSpace;
SV3DSpace.topServiceName = '3DSpace';
SV3DSpace.authURI = '/resources/v1/application/CSRF';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1YzRFNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL1NWM0RTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlFQUF5QztBQUV6Qzs7R0FFRztBQUNILE1BQXFCLFNBQVUsU0FBUSxpQkFBTztJQUlsQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7O0FBTkgsNEJBT0M7QUFOUSx3QkFBYyxHQUFHLFNBQVMsQ0FBQztBQUNqQixpQkFBTyxHQUFHLGdDQUFnQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi4vY2xhc3Nlcy9TZXJ2aWNlJztcblxuLyoqXG4gKiBDbGFzcyBmYWNpbmcgM0RTcGFjZSB3ZWIgc2VydmljZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNWM0RTcGFjZSBleHRlbmRzIFNlcnZpY2Uge1xuICBzdGF0aWMgdG9wU2VydmljZU5hbWUgPSAnM0RTcGFjZSc7XG4gIHByb3RlY3RlZCBzdGF0aWMgYXV0aFVSSSA9ICcvcmVzb3VyY2VzL3YxL2FwcGxpY2F0aW9uL0NTUkYnO1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgc2lnblJlcXVlc3RzKGRhdGE6IGFueSkge1xuICAgIHRoaXMuY29tbW9uT3B0aW9ucy5oZWFkZXJzLkVOT19DU1JGX1RPS0VOID0gZGF0YS5jc3JmLnZhbHVlO1xuICB9XG59XG4iXX0=