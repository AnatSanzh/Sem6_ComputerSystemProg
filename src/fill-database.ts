import connectionPromise from './models/database';

import { User } from "./models/user-model";
import { ExecutionDistrict } from "./models/execution_district-model";


process.on('SIGINT',async () => (await connectionPromise).close().then(() => process.exit()));

(async function(){
	const connection = await connectionPromise;
	//await connection.synchronize();

	const districtNames = ["Київська область","Закарпатська область","Черкаська область","Полтавська область"];
	for (const name in districtNames) {
		const tempDistrict = new ExecutionDistrict();
		tempDistrict.district_name = name;
		await tempDistrict.save();
	}

	{
		const admin = new User();

		admin.login = "admin";
		admin.fullname = "Андрій Андрійович Андрієнко";
		admin.role = 2;
		admin.date_registration = (new Date()).toISOString();
		admin.pwd_hash = "1234";
		admin.is_active = true;
		admin.additional_data = "";

		await admin.save();
	}

	process.exit();
})();