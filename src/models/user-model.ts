import {
  Entity,
  PrimaryColumn,
  Column,

  BaseEntity
} from "typeorm";

@Entity("user")
export class User extends BaseEntity{
  @PrimaryColumn("text")
  login: string;

  @Column("text")
  fullname: string;

  @Column("integer")
  role: number;

  @Column("text")
  date_registration: string;

  @Column("text")
  pwd_hash: string;

  @Column()
  is_active: boolean;

  @Column("text")
  additional_data: string;
}