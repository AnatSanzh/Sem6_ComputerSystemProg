import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    login: string;
    fullname: string;
    role: number;
    date_registration: string;
    pwd_hash: string;
    is_active: boolean;
    additional_data: string;
}
//# sourceMappingURL=user-model.d.ts.map