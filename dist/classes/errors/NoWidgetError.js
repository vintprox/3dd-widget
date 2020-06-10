"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error that is being thrown because `widget` object is undefined.
 */
class NoWidgetError extends Error {
    constructor() {
        super('`widget` object is not defined at execution time. Make sure that script is imported as AMD module in 3DDashboard widget endpoint.');
        this.name = this.constructor.name;
    }
}
exports.default = NoWidgetError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9XaWRnZXRFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGFzc2VzL2Vycm9ycy9Ob1dpZGdldEVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxNQUFxQixhQUFjLFNBQVEsS0FBSztJQUM5QztRQUNFLEtBQUssQ0FBQyxtSUFBbUksQ0FBQyxDQUFDO1FBQzNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQztDQUNGO0FBTEQsZ0NBS0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEVycm9yIHRoYXQgaXMgYmVpbmcgdGhyb3duIGJlY2F1c2UgYHdpZGdldGAgb2JqZWN0IGlzIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9XaWRnZXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ2B3aWRnZXRgIG9iamVjdCBpcyBub3QgZGVmaW5lZCBhdCBleGVjdXRpb24gdGltZS4gTWFrZSBzdXJlIHRoYXQgc2NyaXB0IGlzIGltcG9ydGVkIGFzIEFNRCBtb2R1bGUgaW4gM0REYXNoYm9hcmQgd2lkZ2V0IGVuZHBvaW50LicpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgfVxufVxuIl19