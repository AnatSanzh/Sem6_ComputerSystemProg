import {
  Entity,
  PrimaryGeneratedColumn,
  Column,

  BaseEntity
} from "typeorm";

@Entity("execution_district")
export class ExecutionDistrict extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  district_name: string;
}