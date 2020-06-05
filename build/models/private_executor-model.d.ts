import { BaseEntity } from "typeorm";
import { User } from "./user-model";
import { ExecutionDistrict } from "./execution_district-model";
export declare class PrivateExecutor extends BaseEntity {
    id: number;
    fullname: string;
    user: User;
    district: ExecutionDistrict;
    is_active: boolean;
    certificate_num: string;
    rec_certif_on: string;
    office_addr: string;
    started_out_on: string;
    created_on: string;
}
//# sourceMappingURL=private_executor-model.d.ts.map