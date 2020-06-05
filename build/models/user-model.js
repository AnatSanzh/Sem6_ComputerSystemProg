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
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn("text"),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "date_registration", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "pwd_hash", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], User.prototype, "additional_data", void 0);
User = __decorate([
    typeorm_1.Entity("user")
], User);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQU1pQjtBQUdqQixJQUFhLElBQUksR0FBakIsTUFBYSxJQUFLLFNBQVEsb0JBQVU7Q0FxQm5DLENBQUE7QUFuQkM7SUFEQyx1QkFBYSxDQUFDLE1BQU0sQ0FBQzs7bUNBQ1I7QUFHZDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztzQ0FDRTtBQUdqQjtJQURDLGdCQUFNLENBQUMsU0FBUyxDQUFDOztrQ0FDTDtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7OytDQUNXO0FBRzFCO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3NDQUNFO0FBR2pCO0lBREMsZ0JBQU0sRUFBRTs7dUNBQ1U7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7NkNBQ1M7QUFwQmIsSUFBSTtJQURoQixnQkFBTSxDQUFDLE1BQU0sQ0FBQztHQUNGLElBQUksQ0FxQmhCO0FBckJZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBQcmltYXJ5Q29sdW1uLFxuICBDb2x1bW4sXG5cbiAgQmFzZUVudGl0eVxufSBmcm9tIFwidHlwZW9ybVwiO1xuXG5ARW50aXR5KFwidXNlclwiKVxuZXhwb3J0IGNsYXNzIFVzZXIgZXh0ZW5kcyBCYXNlRW50aXR5e1xuICBAUHJpbWFyeUNvbHVtbihcInRleHRcIilcbiAgbG9naW46IHN0cmluZztcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBmdWxsbmFtZTogc3RyaW5nO1xuXG4gIEBDb2x1bW4oXCJpbnRlZ2VyXCIpXG4gIHJvbGU6IG51bWJlcjtcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBkYXRlX3JlZ2lzdHJhdGlvbjogc3RyaW5nO1xuXG4gIEBDb2x1bW4oXCJ0ZXh0XCIpXG4gIHB3ZF9oYXNoOiBzdHJpbmc7XG5cbiAgQENvbHVtbigpXG4gIGlzX2FjdGl2ZTogYm9vbGVhbjtcblxuICBAQ29sdW1uKFwidGV4dFwiKVxuICBhZGRpdGlvbmFsX2RhdGE6IHN0cmluZztcbn0iXX0=