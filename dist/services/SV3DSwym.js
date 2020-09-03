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
SV3DSwym.topServiceName = '3DSwym';
SV3DSwym.authURI = '/api/index/tk';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1YzRFN3eW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvU1YzRFN3eW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpRUFBeUM7QUFFekM7O0dBRUc7QUFDSCxNQUFxQixRQUFTLFNBQVEsaUJBQU87SUFJakMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFTO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDOUUsQ0FBQzs7QUFOSCwyQkFPQztBQU5RLHVCQUFjLEdBQUcsUUFBUSxDQUFDO0FBQ2hCLGdCQUFPLEdBQUcsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNlcnZpY2UgZnJvbSAnLi4vY2xhc3Nlcy9TZXJ2aWNlJztcblxuLyoqXG4gKiBDbGFzcyBmYWNpbmcgM0RTd3ltIHdlYiBzZXJ2aWNlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1YzRFN3eW0gZXh0ZW5kcyBTZXJ2aWNlIHtcbiAgc3RhdGljIHRvcFNlcnZpY2VOYW1lID0gJzNEU3d5bSc7XG4gIHByb3RlY3RlZCBzdGF0aWMgYXV0aFVSSSA9ICcvYXBpL2luZGV4L3RrJztcblxuICBwcm90ZWN0ZWQgc3RhdGljIHNpZ25SZXF1ZXN0cyhkYXRhOiBhbnkpIHtcbiAgICB0aGlzLmNvbW1vbk9wdGlvbnMuaGVhZGVyc1snWC1EUy1TV1lNLUNTUkZUT0tFTiddID0gZGF0YS5yZXN1bHQuU2VydmVyVG9rZW47XG4gIH1cbn1cbiJdfQ==