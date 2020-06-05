import connectionPromise from './models/database';
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import { cookieOptions, cookieName } from "./configs";
import { v1 as uuidV1, v4 as uuidV4 } from "uuid";

import { User } from "./models/user-model";
import { PrivateExecutor } from "./models/private_executor-model";
import { ExecutionDistrict } from "./models/execution_district-model";


async function getLoggedUser(req: express.Request){
	if(req.signedCookies[cookieName] == undefined)
		return;

	return User.findOne(JSON.parse(req.signedCookies[cookieName]).login);
}

const app: express.Application = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: 3000000 }));
app.use(bodyParser.json({ limit: 3000000 }));
app.use(bodyParser.text({ limit: 30000000 }));

app.use(express.static(path.join(__dirname,'static')));


app.get('/', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	const role = (loggedUser == undefined)? 0 : loggedUser.role;

	res.render('pages/main', {
		role
	});
});
app.get('/login', (req: any, res: express.Response) => {
	res.render('pages/login');
});
app.get('/priv-exec/list', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/registrator/list', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/event-journal', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/priv-exec/new', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/priv-exec/edit', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/registrator/new', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/registrator/edit', async (req: any, res: express.Response) => {
	const loggedUser = await getLoggedUser(req);

	if(loggedUser == undefined) return res.redirect('/error/permission-denied');

	//res.sendFile(path.join(__dirname,'public/index.html'));
});
app.get('/error/permission-denied', async (req: any, res: express.Response) => {
	//res.sendFile(path.join(__dirname,'public/index.html'));
});


app.post('/api/auth/login', async (req: express.Request, res: express.Response) => {
	const { login, password } = req.body;

	const userData = await User.findOne(login);

	if(userData.pwd_hash === password && userData.is_active === true){
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
	const { fullname, additional_data } = req.body;

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
	const { fullname, additional_data, is_active } = req.body;

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
	} = req.body;
	const user_login = JSON.parse(req.signedCookies[cookieName]).login;

	if(await PrivateExecutor.findOne({ fullname }) == undefined){
		const privExec = new PrivateExecutor();

		privExec.fullname = fullname;
		privExec.user = await User.findOne(user_login);
		privExec.district = await ExecutionDistrict.findOne(district_id);
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
	} = req.body;

	const privExec = await PrivateExecutor.findOne(req.params.id);

	if(privExec == undefined){
		return res.status(400).send();
	}

	if(fullname != undefined) privExec.fullname = fullname;
	if(district_id != undefined) privExec.district = await ExecutionDistrict.findOne(district_id);
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
	await (await connectionPromise).synchronize();

	app.listen(process.env.PORT || 5000, () => {
		console.log("Started server!");
	});
})();