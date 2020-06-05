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
exports.EventTypes = [
    "Реєстрація реєстратора",
    "Редагування даних реєстратора",
    "Зміна пароля та логіна реєстратора",
    "Реєстрація приватного виконавця",
    "Редагування даних приватного виконавця",
    "Видалення приватного виконавця",
    "Авторизація користувачів"
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam91cm5hbF9ldmVudC1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvam91cm5hbF9ldmVudC1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQVFpQjtBQUNqQiw2Q0FBa0M7QUFJbEMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLG9CQUFVO0NBc0IzQyxDQUFBO0FBcEJDO0lBREMsZ0NBQXNCLEVBQUU7O3dDQUNkO0FBSVg7SUFGQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDcEUsb0JBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzs4QkFDN0IsaUJBQUk7MENBQUM7QUFHWDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzhCQUNGLElBQUk7Z0RBQUM7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLFNBQVMsQ0FBQzs7Z0RBQ0M7QUFHbkI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7a0RBQ007QUFHckI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7K0NBQ0c7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7NkNBQ0M7QUFyQkwsWUFBWTtJQUR4QixnQkFBTSxDQUFDLGVBQWUsQ0FBQztHQUNYLFlBQVksQ0FzQnhCO0FBdEJZLG9DQUFZO0FBd0JaLFFBQUEsVUFBVSxHQUFHO0lBQ3hCLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0Isb0NBQW9DO0lBRXBDLGlDQUFpQztJQUNqQyx3Q0FBd0M7SUFDeEMsZ0NBQWdDO0lBRWhDLDBCQUEwQjtDQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRW50aXR5LFxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxuICBDb2x1bW4sXG4gIE1hbnlUb09uZSxcbiAgSm9pbkNvbHVtbixcblxuICBCYXNlRW50aXR5XG59IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuL3VzZXItbW9kZWxcIjtcblxuXG5ARW50aXR5KFwiam91cm5hbF9ldmVudFwiKVxuZXhwb3J0IGNsYXNzIEpvdXJuYWxFdmVudCBleHRlbmRzIEJhc2VFbnRpdHl7XG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcbiAgaWQ6IG51bWJlcjtcblxuICBATWFueVRvT25lKHR5cGUgPT4gVXNlciwgdXNlciA9PiB1c2VyLmxvZ2luLCB7IG9uRGVsZXRlOiAnQ0FTQ0FERScgfSlcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcInVzZXJfbG9naW5cIiB9KVxuICB1c2VyOiBVc2VyO1xuXG4gIEBDb2x1bW4oJ2RhdGUnKVxuICBldmVudF9kYXRlIDogRGF0ZTtcblxuICBAQ29sdW1uKFwiaW50ZWdlclwiKVxuICBldmVudF90eXBlOiBudW1iZXI7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgcm93X2FmZmVjdGVkOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgbmV3X3ZhbHVlOiBzdHJpbmc7XG5cbiAgQENvbHVtbihcInRleHRcIilcbiAgdXNlcl9pcDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgRXZlbnRUeXBlcyA9IFtcbiAgXCLQoNC10ZTRgdGC0YDQsNGG0ZbRjyDRgNC10ZTRgdGC0YDQsNGC0L7RgNCwXCIsXG4gIFwi0KDQtdC00LDQs9GD0LLQsNC90L3RjyDQtNCw0L3QuNGFINGA0LXRlNGB0YLRgNCw0YLQvtGA0LBcIixcbiAgXCLQl9C80ZbQvdCwINC/0LDRgNC+0LvRjyDRgtCwINC70L7Qs9GW0L3QsCDRgNC10ZTRgdGC0YDQsNGC0L7RgNCwXCIsXG4gIFxuICBcItCg0LXRlNGB0YLRgNCw0YbRltGPINC/0YDQuNCy0LDRgtC90L7Qs9C+INCy0LjQutC+0L3QsNCy0YbRj1wiLFxuICBcItCg0LXQtNCw0LPRg9Cy0LDQvdC90Y8g0LTQsNC90LjRhSDQv9GA0LjQstCw0YLQvdC+0LPQviDQstC40LrQvtC90LDQstGG0Y9cIixcbiAgXCLQktC40LTQsNC70LXQvdC90Y8g0L/RgNC40LLQsNGC0L3QvtCz0L4g0LLQuNC60L7QvdCw0LLRhtGPXCIsXG4gIFxuICBcItCQ0LLRgtC+0YDQuNC30LDRhtGW0Y8g0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyXCJcbl07Il19