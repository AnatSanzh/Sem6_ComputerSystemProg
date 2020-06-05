import connectionPromise from './models/database';
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as nocache from "nocache";

import { cookieOptions, cookieName } from "./configs";
import { v1 as uuidV1, v4 as uuidV4 } from "uuid";

import { User } from "./models/user-model";
import { PrivateExecutor } from "./models/private_executor-model";
import { ExecutionDistrict } from "./models/execution_district-model";
import { JournalEvent } from "./models/journal_event-model";


import { Like, Equal } from "typeorm";


async function getLoggedUser(req: express.Request){
	if(req.cookies[cookieName] == undefined || req.cookies[cookieName] == "")
		return;

	return User.findOne(JSON.parse(decodeURIComponent(req.cookies[cookieName])).login);
}

const app: express.Application = express();

app.use(nocache());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: 3000000 }));
app.use(bodyParser.json({ limit: 3000000 }));
app.use(bodyParser.text({ limit: 30000000 }));

app.use(express.static(path.join(__dirname,'static')));

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.get('/', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	const role = (loggedUser == undefined)? 0 : loggedUser.role;
	const { fullname, district_id, is_active, certificate_num } = req.query;

	let searchObj:any = {};

	if(fullname!=undefined && fullname!="") searchObj.fullname = Like('%'+fullname+'%');
	if(certificate_num!=undefined && certificate_num!="") searchObj.certificate_num = Like('%'+certificate_num+'%');
	if(district_id!=undefined) searchObj.district_id = district_id;
	if(is_active!=undefined) searchObj.is_active = is_active;

	const privateExecutors = (Object.keys(searchObj).length>0)? (await PrivateExecutor.find(
		{
			where: searchObj,
			relations: ["district"]
		})) : [];

	console.log(privateExecutors);

	res.render('pages/main', {
		role,
		fullname, district_id, is_active, certificate_num,
		districts: await ExecutionDistrict.find(),
		privateExecutors: privateExecutors
	});
});
app.get('/login', (req: any, res: express.Response) => {
	res.render('pages/login');
});
app.get('/priv-exec/list', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	res.render('pages/priv-exec-list', {
		role: loggedUser.role,
		privateExecutors: await PrivateExecutor.find({
			relations: ['user'],
			where: {
				user: {
					login: loggedUser.login
				}
			}
		})
	});
});
app.get('/registrator/list', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	res.render('pages/registrator-list', {
		role: loggedUser.role,
		registers: await User.find({ where: { role: 1 } })
	});
});
app.get('/event-journal', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	const events = await JournalEvent.find({
		relations: ['user'],
		where: {
			user: {
				login: loggedUser.login
			}
		},
		order: {
			event_date: "DESC"
		}
	});
	
	res.render('pages/event-journal', { role: loggedUser.role, events });
});
app.get('/priv-exec/new', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');
	
	res.render('pages/priv-exec-new', { role: loggedUser.role, districts: await ExecutionDistrict.find() });
});
app.get('/priv-exec/:id/edit', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	const oldPrivExecVal = await PrivateExecutor.findOne({
		where: {
			id: req.params.id
		},
		relations: ["district"]
	});

	if(loggedUser == undefined || oldPrivExecVal == undefined)
		return res.redirect('/error/permission-denied');
	
	res.render('pages/priv-exec-edit', { role: loggedUser.role, oldPrivExecVal, districts: await ExecutionDistrict.find() });
});
app.get('/registrator/new', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	res.render('pages/registrator-new', { role: loggedUser.role });
});
app.get('/registrator/:login/edit', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	const oldUserVal = await User.findOne(req.params.login);

	if(loggedUser == undefined || oldUserVal == undefined)
		return res.redirect('/error/permission-denied');

	res.render('pages/registrator-edit', { role: loggedUser.role, oldUserVal });
});
app.get('/error/permission-denied', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	const role = (loggedUser == undefined)? 0 : loggedUser.role;

	res.render('pages/error', {role});
});


app.post('/api/auth/login', async (req: express.Request, res: express.Response) => {
	const {login, password} = JSON.parse(req.body);
	
	const userData = await User.findOne(login);

	if(userData != undefined && userData.pwd_hash == password && userData.is_active == true){
		res.cookie(cookieName, JSON.stringify({login, password}), cookieOptions);

	    res.status(200).send();
	}else{
		res.status(400).send();
	}
});
app.post('/api/auth/logout', async (req: express.Request, res: express.Response) => {
	res.clearCookie(cookieName, cookieOptions);

	res.status(200).send();
});


app.post('/api/user', async (req: express.Request, res: express.Response) => {
	const { fullname, additional_data } = JSON.parse(req.body);

	const identificationData = {
		login: uuidV1(),
		password: uuidV4()
	};

	if(await User.findOne({ fullname }) == undefined){
		const user = new User();

		user.login = identificationData.login;
		user.pwd_hash = identificationData.password;
		user.fullname = fullname;
		user.role = 1;
		user.date_registration = (new Date()).toISOString();
		user.is_active = true;
		user.additional_data = additional_data;
		
		await user.save();

	    res.json(identificationData);
	}else{
		res.status(400).send();
	}
});
app.post('/api/user/:login/res_id', async (req: express.Request, res: express.Response) => {
	const user = await User.findOne(req.params.login);

	if(user == undefined){
		return res.status(400).send();
	}

	user.login = uuidV1();
	user.pwd_hash = uuidV4();
	
	await user.save();

    res.status(200).send();
});
app.put('/api/user/:login', async (req: express.Request, res: express.Response) => {
	const { fullname, additional_data, is_active } = JSON.parse(req.body);

	const user = await User.findOne(req.params.login);

	if(user == undefined){
		return res.status(400).send();
	}

	if(fullname != undefined) user.fullname = fullname;
	if(is_active != undefined) user.is_active = is_active;
	if(additional_data != undefined) user.additional_data = additional_data;
	
	await user.save();

    res.status(200).send();
});
app.delete('/api/user/:login', async (req: express.Request, res: express.Response) => {
	await User.remove(req.params.login);

    res.status(200).send();
});


app.post('/api/priv-exec', async (req: express.Request, res: express.Response) => {
	const { 
		fullname, district_id, certificate_num,
		rec_certif_on, office_addr, started_out_on
	} = JSON.parse(req.body);
	const user = await getLoggedUser(req);

	console.log(JSON.parse(req.body));

	if(await PrivateExecutor.findOne({ fullname }) == undefined){
		const privExec = new PrivateExecutor();

		privExec.fullname = fullname;
		privExec.user = user;
		privExec.district = await ExecutionDistrict.findOne(Number(district_id));
		privExec.is_active = true;
		privExec.created_on = (new Date()).toISOString();
		privExec.certificate_num = certificate_num;
		privExec.rec_certif_on = rec_certif_on;
		privExec.office_addr = office_addr;
		privExec.started_out_on = started_out_on;
		
		await privExec.save();

	    res.status(200).send();
	}else{
		res.status(400).send();
	}
});
app.put('/api/priv-exec/:id', async (req: express.Request, res: express.Response) => {
	const { 
		fullname, district_id, certificate_num,
		rec_certif_on, office_addr, started_out_on,
		is_active
	} = JSON.parse(req.body);

	const privExec = await PrivateExecutor.findOne(req.params.id);

	if(privExec == undefined){
		return res.status(400).send();
	}

	if(fullname != undefined) privExec.fullname = fullname;
	if(district_id != undefined) privExec.district = await ExecutionDistrict.findOne(Number(district_id));
	if(certificate_num != undefined) privExec.certificate_num = certificate_num;
	if(rec_certif_on != undefined) privExec.rec_certif_on = rec_certif_on;
	if(office_addr != undefined) privExec.office_addr = office_addr;
	if(started_out_on != undefined) privExec.started_out_on = started_out_on;
	if(is_active != undefined) privExec.is_active = is_active;
	
	await privExec.save();

    res.status(200).send();
});
app.delete('/api/priv-exec/:id', async (req: express.Request, res: express.Response) => {
	await PrivateExecutor.remove(req.params.id);

    res.status(200).send();
});


app.use((err: Error, req: express.Request, resp: express.Response, next: Function)=>{
	console.log(err);
	resp.status(500).send('ERROR');
});

process.on('SIGINT',async () => (await connectionPromise).close().then(() => process.exit()));

(async function(){
	const connection = await connectionPromise;
	//await connection.synchronize();

	app.listen(process.env.PORT || 5000, () => {
		console.log("Started server!");
	});
})();