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
SV3DSpace.serviceName = '3DSpace';
SV3DSpace.authURI = '/resources/v1/application/CSRF';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1YzRFNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL1NWM0RTcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlFQUF5QztBQUV6Qzs7R0FFRztBQUNILE1BQXFCLFNBQVUsU0FBUSxpQkFBTztJQUlsQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVM7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7O0FBTkgsNEJBT0M7QUFOUSxxQkFBVyxHQUFHLFNBQVMsQ0FBQztBQUNkLGlCQUFPLEdBQUcsZ0NBQWdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmljZSBmcm9tICcuLi9jbGFzc2VzL1NlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZhY2luZyAzRFNwYWNlIHdlYiBzZXJ2aWNlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1YzRFNwYWNlIGV4dGVuZHMgU2VydmljZSB7XG4gIHN0YXRpYyBzZXJ2aWNlTmFtZSA9ICczRFNwYWNlJztcbiAgcHJvdGVjdGVkIHN0YXRpYyBhdXRoVVJJID0gJy9yZXNvdXJjZXMvdjEvYXBwbGljYXRpb24vQ1NSRic7XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBzaWduUmVxdWVzdHMoZGF0YTogYW55KSB7XG4gICAgdGhpcy5jb21tb25PcHRpb25zLmhlYWRlcnMuRU5PX0NTUkZfVE9LRU4gPSBkYXRhLmNzcmYudmFsdWU7XG4gIH1cbn1cbiJdfQ==