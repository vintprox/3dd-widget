"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = __importDefault(require("../classes/Service"));
/**
 * Class facing 3DSwym web services.
 */
class SV3DSwym extends Service_1.default {
    static signRequests(data) {
        this.commonOptions.headers['X-DS-SWYM-CSRFTOKEN'] = data.result.ServerToken;
    }
}
exports.default = SV3DSwym;
SV3DSwym.serviceName = '3DSwym';
SV3DSwym.authURI = '/api/index/tk';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1YzRFN3eW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvU1YzRFN3eW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpRUFBeUM7QUFFekM7O0dBRUc7QUFDSCxNQUFxQixRQUFTLFNBQVEsaUJBQU87SUFJakMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFTO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDOUUsQ0FBQzs7QUFOSCwyQkFPQztBQU5RLG9CQUFXLEdBQUcsUUFBUSxDQUFDO0FBQ2IsZ0JBQU8sR0FBRyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmljZSBmcm9tICcuLi9jbGFzc2VzL1NlcnZpY2UnO1xuXG4vKipcbiAqIENsYXNzIGZhY2luZyAzRFN3eW0gd2ViIHNlcnZpY2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTVjNEU3d5bSBleHRlbmRzIFNlcnZpY2Uge1xuICBzdGF0aWMgc2VydmljZU5hbWUgPSAnM0RTd3ltJztcbiAgcHJvdGVjdGVkIHN0YXRpYyBhdXRoVVJJID0gJy9hcGkvaW5kZXgvdGsnO1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgc2lnblJlcXVlc3RzKGRhdGE6IGFueSkge1xuICAgIHRoaXMuY29tbW9uT3B0aW9ucy5oZWFkZXJzWydYLURTLVNXWU0tQ1NSRlRPS0VOJ10gPSBkYXRhLnJlc3VsdC5TZXJ2ZXJUb2tlbjtcbiAgfVxufVxuIl19