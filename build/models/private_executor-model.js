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
    typeorm_1.JoinColumn({ name: "user_login", referencedColumnName: "login" }),
    __metadata("design:type", user_model_1.User)
], PrivateExecutor.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => execution_district_model_1.ExecutionDistrict, district => district.id, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: "district_id", referencedColumnName: "id" }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leGVjdXRvci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcHJpdmF0ZV9leGVjdXRvci1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQVFpQjtBQUNqQiw2Q0FBa0M7QUFDbEMseUVBQTZEO0FBRzdELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsb0JBQVU7Q0FnQzlDLENBQUE7QUE5QkM7SUFEQyxnQ0FBc0IsRUFBRTs7MkNBQ2Q7QUFHWDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztpREFDRTtBQUlqQjtJQUZDLG1CQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUNwRSxvQkFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsQ0FBQzs4QkFDNUQsaUJBQUk7NkNBQUM7QUFJWDtJQUZDLG1CQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyw0Q0FBaUIsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDdEYsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ3RELDRDQUFpQjtpREFBQztBQUc1QjtJQURDLGdCQUFNLEVBQUU7O2tEQUNVO0FBR25CO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3dEQUNTO0FBR3hCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3NEQUNPO0FBR3RCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O29EQUNLO0FBR3BCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3VEQUNRO0FBR3ZCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O21EQUNJO0FBL0JSLGVBQWU7SUFEM0IsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQztHQUNkLGVBQWUsQ0FnQzNCO0FBaENZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBDb2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcblxuICBCYXNlRW50aXR5XG59IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXItbW9kZWxcIjtcbmltcG9ydCB7RXhlY3V0aW9uRGlzdHJpY3R9IGZyb20gXCIuL2V4ZWN1dGlvbl9kaXN0cmljdC1tb2RlbFwiO1xuXG5ARW50aXR5KFwicHJpdmF0ZV9leGVjdXRvclwiKVxuZXhwb3J0IGNsYXNzIFByaXZhdGVFeGVjdXRvciBleHRlbmRzIEJhc2VFbnRpdHkge1xuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXG4gIGlkOiBudW1iZXI7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgZnVsbG5hbWU6IHN0cmluZztcblxuICBATWFueVRvT25lKHR5cGUgPT4gVXNlciwgdXNlciA9PiB1c2VyLmxvZ2luLCB7IG9uRGVsZXRlOiAnQ0FTQ0FERScgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcInVzZXJfbG9naW5cIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwibG9naW5cIiB9KVxuICB1c2VyOiBVc2VyO1xuXG4gIEBNYW55VG9PbmUodHlwZSA9PiBFeGVjdXRpb25EaXN0cmljdCwgZGlzdHJpY3QgPT4gZGlzdHJpY3QuaWQsIHsgb25EZWxldGU6ICdDQVNDQURFJyB9KVxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiZGlzdHJpY3RfaWRcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9KVxuICBkaXN0cmljdDogRXhlY3V0aW9uRGlzdHJpY3Q7XG5cbiAgQENvbHVtbigpXG4gIGlzX2FjdGl2ZTogYm9vbGVhbjtcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBjZXJ0aWZpY2F0ZV9udW06IHN0cmluZztcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICByZWNfY2VydGlmX29uOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgb2ZmaWNlX2FkZHI6IHN0cmluZztcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBzdGFydGVkX291dF9vbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oXCJ0ZXh0XCIpXG4gIGNyZWF0ZWRfb246IHN0cmluZztcbn0iXX0=