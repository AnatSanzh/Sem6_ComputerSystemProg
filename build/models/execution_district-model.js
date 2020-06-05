"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let ExecutionDistrict = class ExecutionDistrict extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ExecutionDistrict.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], ExecutionDistrict.prototype, "district_name", void 0);
ExecutionDistrict = __decorate([
    typeorm_1.Entity("execution_district")
], ExecutionDistrict);
exports.ExecutionDistrict = ExecutionDistrict;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0aW9uX2Rpc3RyaWN0LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9leGVjdXRpb25fZGlzdHJpY3QtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNaUI7QUFHakIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxvQkFBVTtDQU1oRCxDQUFBO0FBSkM7SUFEQyxnQ0FBc0IsRUFBRTs7NkNBQ2Q7QUFHWDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzt3REFDTztBQUxYLGlCQUFpQjtJQUQ3QixnQkFBTSxDQUFDLG9CQUFvQixDQUFDO0dBQ2hCLGlCQUFpQixDQU03QjtBQU5ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVudGl0eSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQ29sdW1uLFxuXG4gIEJhc2VFbnRpdHlcbn0gZnJvbSBcInR5cGVvcm1cIjtcblxuQEVudGl0eShcImV4ZWN1dGlvbl9kaXN0cmljdFwiKVxuZXhwb3J0IGNsYXNzIEV4ZWN1dGlvbkRpc3RyaWN0IGV4dGVuZHMgQmFzZUVudGl0eSB7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBkaXN0cmljdF9uYW1lOiBzdHJpbmc7XG59Il19