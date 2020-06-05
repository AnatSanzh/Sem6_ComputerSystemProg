import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,

  BaseEntity
} from "typeorm";
import {User} from "./user-model";


@Entity("journal_event")
export class JournalEvent extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.login, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_login" })
  user: User;

  @Column('date')
  event_date : Date;

  @Column("integer")
  event_type: number;

  @Column("text")
  row_affected: string;

  @Column("text")
  new_value: string;

  @Column("text")
  user_ip: string;
}

export const EventTypes = [
  "Реєстрація реєстратора",
  "Редагування даних реєстратора",
  "Зміна пароля та логіна реєстратора",
  
  "Реєстрація приватного виконавця",
  "Редагування даних приватного виконавця",
  "Видалення приватного виконавця",
  
  "Авторизація користувачів"
];