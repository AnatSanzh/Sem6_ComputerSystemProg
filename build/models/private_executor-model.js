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
const user_model_1 = require("./user-model");
const execution_district_model_1 = require("./execution_district-model");
let PrivateExecutor = class PrivateExecutor extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PrivateExecutor.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PrivateExecutor.prototype, "fullname", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_model_1.User, user => user.login, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: "user_login" }),
    __metadata("design:type", user_model_1.User)
], PrivateExecutor.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => execution_district_model_1.ExecutionDistrict, district => district.id, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: "district_id" }),
    __metadata("design:type", execution_district_model_1.ExecutionDistrict)
], PrivateExecutor.prototype, "district", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], PrivateExecutor.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PrivateExecutor.prototype, "certificate_num", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PrivateExecutor.prototype, "rec_certif_on", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PrivateExecutor.prototype, "office_addr", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PrivateExecutor.prototype, "started_out_on", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], PrivateExecutor.prototype, "created_on", void 0);
PrivateExecutor = __decorate([
    typeorm_1.Entity("private_executor")
], PrivateExecutor);
exports.PrivateExecutor = PrivateExecutor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leGVjdXRvci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcHJpdmF0ZV9leGVjdXRvci1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQVFpQjtBQUNqQiw2Q0FBa0M7QUFDbEMseUVBQTZEO0FBRzdELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsb0JBQVU7Q0FnQzlDLENBQUE7QUE5QkM7SUFEQyxnQ0FBc0IsRUFBRTs7MkNBQ2Q7QUFHWDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztpREFDRTtBQUlqQjtJQUZDLG1CQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUNwRSxvQkFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzhCQUM3QixpQkFBSTs2Q0FBQztBQUlYO0lBRkMsbUJBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDRDQUFpQixFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUN0RixvQkFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDOzhCQUMxQiw0Q0FBaUI7aURBQUM7QUFHNUI7SUFEQyxnQkFBTSxFQUFFOztrREFDVTtBQUduQjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzt3REFDUztBQUd4QjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztzREFDTztBQUd0QjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztvREFDSztBQUdwQjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzt1REFDUTtBQUd2QjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzttREFDSTtBQS9CUixlQUFlO0lBRDNCLGdCQUFNLENBQUMsa0JBQWtCLENBQUM7R0FDZCxlQUFlLENBZ0MzQjtBQWhDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVudGl0eSxcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcbiAgQ29sdW1uLFxuICBNYW55VG9PbmUsXG4gIEpvaW5Db2x1bW4sXG5cbiAgQmFzZUVudGl0eVxufSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi91c2VyLW1vZGVsXCI7XG5pbXBvcnQge0V4ZWN1dGlvbkRpc3RyaWN0fSBmcm9tIFwiLi9leGVjdXRpb25fZGlzdHJpY3QtbW9kZWxcIjtcblxuQEVudGl0eShcInByaXZhdGVfZXhlY3V0b3JcIilcbmV4cG9ydCBjbGFzcyBQcml2YXRlRXhlY3V0b3IgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oXCJ0ZXh0XCIpXG4gIGZ1bGxuYW1lOiBzdHJpbmc7XG5cbiAgQE1hbnlUb09uZSh0eXBlID0+IFVzZXIsIHVzZXIgPT4gdXNlci5sb2dpbiwgeyBvbkRlbGV0ZTogJ0NBU0NBREUnIH0pXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJ1c2VyX2xvZ2luXCIgfSlcbiAgdXNlcjogVXNlcjtcblxuICBATWFueVRvT25lKHR5cGUgPT4gRXhlY3V0aW9uRGlzdHJpY3QsIGRpc3RyaWN0ID0+IGRpc3RyaWN0LmlkLCB7IG9uRGVsZXRlOiAnQ0FTQ0FERScgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcImRpc3RyaWN0X2lkXCIgfSlcbiAgZGlzdHJpY3Q6IEV4ZWN1dGlvbkRpc3RyaWN0O1xuXG4gIEBDb2x1bW4oKVxuICBpc19hY3RpdmU6IGJvb2xlYW47XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgY2VydGlmaWNhdGVfbnVtOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgcmVjX2NlcnRpZl9vbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oXCJ0ZXh0XCIpXG4gIG9mZmljZV9hZGRyOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgc3RhcnRlZF9vdXRfb246IHN0cmluZztcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBjcmVhdGVkX29uOiBzdHJpbmc7XG59Il19