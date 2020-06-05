import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,

  BaseEntity
} from "typeorm";
import {User} from "./user-model";
import {ExecutionDistrict} from "./execution_district-model";

@Entity("private_executor")
export class PrivateExecutor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  fullname: string;

  @ManyToOne(type => User, user => user.login, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_login" })
  user: User;

  @ManyToOne(type => ExecutionDistrict, district => district.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "district_id" })
  district: ExecutionDistrict;

  @Column()
  is_active: boolean;

  @Column("text")
  certificate_num: string;

  @Column("text")
  rec_certif_on: string;

  @Column("text")
  office_addr: string;

  @Column("text")
  started_out_on: string;

  @Column("text")
  created_on: string;
}