import { BaseEntity } from "typeorm";
import { User } from "./user-model";
export declare class JournalEvent extends BaseEntity {
    id: number;
    user: User;
    event_date: Date;
    event_type: number;
    row_affected: string;
    new_value: string;
    user_ip: string;
}
export declare const EventTypes: string[];
//# sourceMappingURL=journal_event-model.d.ts.map