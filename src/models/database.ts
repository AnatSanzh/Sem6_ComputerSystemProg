import "reflect-metadata";
import { createConnection } from "typeorm";
import { config } from "dotenv";

config();

export default createConnection({
	type: 'postgres',
	
	username: process.env.DB_USERNAME,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: 5432,
    schema: "",

    synchronize: false,
    logging: false,
    entities: [__dirname + "/*-model.js"]
});

/*connection.then( conn => conn.query(
`CREATE TABLE IF NOT EXISTS private_executor
(
    id              serial NOT NULL,      -- ідентифікатор приватного виконавця
    user_login      text NOT NULL         -- логін реєстратора, що зареєстрував
    district_id     serial NOT NULL,      -- ідентифікатор виконавчого округу
    fullname        text NOT NULL,        -- ПІБ
    is_active       boolean NOT NULL,     -- діє/недіє
    certificate_num text NOT NULL,        -- номер посвідчення
    rec_certif_on   text NOT NULL,        -- дата видачі посвідчення
    office_addr     text NOT NULL,        -- адреса офісу
    started_out_on  text NOT NULL,        -- дата початку здійснення діяльності
    created_on      text NOT NULL,        -- дата реєстрації


    CONSTRAINT private_executor_pkey PRIMARY KEY (id),
    CONSTRAINT priv_exc_to_user_fkey FOREIGN KEY (user_login)
        REFERENCES user (login) MATCH FULL
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT priv_exc_to_exec_dist_fkey FOREIGN KEY (district_id)
        REFERENCES execution_district (id) MATCH FULL
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
)

CREATE TABLE TABLE IF NOT EXISTS execution_district
(
    id                  serial NOT NULL,    -- ідентифікатор виконавчого округу
    district_name       text NOT NULL,      -- назва округу
    CONSTRAINT execution_district_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS user
(
    login             text NOT NULL,    -- логін користувача
    fullname          text NOT NULL,    -- ПІБ
    role              int NOT NULL,     -- роль(Адміністратор/реєстратор)
    date_registration text NOT NULL,    -- дата реєстрації
    pwd_hash          text NOT NULL,    -- хеш паролю
    is_active         boolean NOT NULL, -- статус(дійсний/вимкнений)
    additional_data   text NOT NULL,    -- додаткові дані
    
    CONSTRAINT users_pkey PRIMARY KEY (login)
    CONSTRAINT fullname_ukey UNIQUE(fullname)
)

CREATE TABLE IF NOT EXISTS journal_event
(
    id           serial NOT NULL, -- id події
    user_login   text NOT NULL,   -- логін користувача
    event_date   date NOT NULL,   -- дата події
    event_type   int NOT NULL,    -- тип події
    row_affected text NOT NULL,   -- строка таблиці де подія відбулася
    new_value    text NOT NULL,   -- нове значення
    user_ip      text NOT NULL,   -- ІP користувача, що спричинив подію

    CONSTRAINT journal_actions_pkey PRIMARY KEY (id),
    CONSTRAINT journal_event_to_user_fkey FOREIGN KEY (user_login)
        REFERENCES user (login) MATCH FULL
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
)`
	)
);*/