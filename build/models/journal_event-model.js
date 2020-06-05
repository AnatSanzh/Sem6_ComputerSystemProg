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
let JournalEvent = class JournalEvent extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], JournalEvent.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_model_1.User, user => user.login, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: "user_login" }),
    __metadata("design:type", user_model_1.User)
], JournalEvent.prototype, "user", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], JournalEvent.prototype, "event_date", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], JournalEvent.prototype, "event_type", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JournalEvent.prototype, "row_affected", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JournalEvent.prototype, "new_value", void 0);
__decorate([
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], JournalEvent.prototype, "user_ip", void 0);
JournalEvent = __decorate([
    typeorm_1.Entity("journal_event")
], JournalEvent);
exports.JournalEvent = JournalEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam91cm5hbF9ldmVudC1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvam91cm5hbF9ldmVudC1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQVFpQjtBQUNqQiw2Q0FBa0M7QUFJbEMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLG9CQUFVO0NBc0IzQyxDQUFBO0FBcEJDO0lBREMsZ0NBQXNCLEVBQUU7O3dDQUNkO0FBSVg7SUFGQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDcEUsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzs4QkFDN0IsaUJBQUk7MENBQUM7QUFHWDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzhCQUNGLElBQUk7Z0RBQUM7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLFNBQVMsQ0FBQzs7Z0RBQ0M7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7a0RBQ007QUFHckI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7K0NBQ0c7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7NkNBQ0M7QUFyQkwsWUFBWTtJQUR4QixnQkFBTSxDQUFDLGVBQWUsQ0FBQztHQUNYLFlBQVksQ0FzQnhCO0FBdEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBDb2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcblxuICBCYXNlRW50aXR5XG59IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXItbW9kZWxcIjtcblxuXG5ARW50aXR5KFwiam91cm5hbF9ldmVudFwiKVxuZXhwb3J0IGNsYXNzIEpvdXJuYWxFdmVudCBleHRlbmRzIEJhc2VFbnRpdHl7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKHR5cGUgPT4gVXNlciwgdXNlciA9PiB1c2VyLmxvZ2luLCB7IG9uRGVsZXRlOiAnQ0FTQ0FERScgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcInVzZXJfbG9naW5cIiB9KVxuICB1c2VyOiBVc2VyO1xuXG4gIEBDb2x1bW4oJ2RhdGUnKVxuICBldmVudF9kYXRlIDogRGF0ZTtcblxuICBAQ29sdW1uKFwiaW50ZWdlclwiKVxuICBldmVudF90eXBlOiBudW1iZXI7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgcm93X2FmZmVjdGVkOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgbmV3X3ZhbHVlOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgdXNlcl9pcDogc3RyaW5nO1xufSJdfQ==