"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./models/database");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nocache = require("nocache");
const configs_1 = require("./configs");
const uuid_1 = require("uuid");
const user_model_1 = require("./models/user-model");
const private_executor_model_1 = require("./models/private_executor-model");
const execution_district_model_1 = require("./models/execution_district-model");
const journal_event_model_1 = require("./models/journal_event-model");
const typeorm_1 = require("typeorm");
async function getLoggedUser(req) {
    if (req.signedCookies[configs_1.cookieName] == undefined)
        return;
    return user_model_1.User.findOne(JSON.parse(req.signedCookies[configs_1.cookieName]).login);
}
const app = express();
app.use(nocache());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: 3000000 }));
app.use(bodyParser.json({ limit: 3000000 }));
app.use(bodyParser.text({ limit: 30000000 }));
app.use(express.static(path.join(__dirname, 'static')));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.get('/', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    const role = (loggedUser == undefined) ? 0 : loggedUser.role;
    const { fullname, district_id, is_active, certificate_num } = req.query;
    let searchObj = {};
    if (fullname != undefined && fullname != "")
        searchObj.fullname = typeorm_1.Like('%' + fullname + '%');
    if (certificate_num != undefined && certificate_num != "")
        searchObj.certificate_num = typeorm_1.Like('%' + certificate_num + '%');
    if (district_id != undefined)
        searchObj.district_id = district_id;
    if (is_active != undefined)
        searchObj.is_active = is_active;
    const privateExecutors = (Object.keys(searchObj).length > 0) ? (await private_executor_model_1.PrivateExecutor.find(searchObj)) : [];
    res.render('pages/main', {
        role,
        fullname, district_id, is_active, certificate_num,
        districts: await execution_district_model_1.ExecutionDistrict.find(),
        privateExecutors: privateExecutors
    });
});
app.get('/login', (req, res) => {
    res.render('pages/login');
});
app.get('/priv-exec/list', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    if (loggedUser == undefined)
        return res.redirect('/error/permission-denied');
    res.render('pages/priv-exec-list', {
        role: loggedUser.role,
        privateExecutors: await private_executor_model_1.PrivateExecutor.find({
            relations: ['user'],
            where: {
                user: {
                    login: loggedUser.login
                }
            }
        })
    });
});
app.get('/registrator/list', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    if (loggedUser == undefined)
        return res.redirect('/error/permission-denied');
    res.render('pages/registrator-list', {
        role: loggedUser.role,
        registers: await user_model_1.User.find({ where: { role: 1 } })
    });
});
app.get('/event-journal', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    if (loggedUser == undefined)
        return res.redirect('/error/permission-denied');
    const events = await journal_event_model_1.JournalEvent.find({
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
app.get('/priv-exec/new', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    if (loggedUser == undefined)
        return res.redirect('/error/permission-denied');
    res.render('pages/priv-exec-new', { role: loggedUser.role });
});
app.get('/priv-exec/:id/edit', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    const oldPrivExecVal = await private_executor_model_1.PrivateExecutor.findOne(req.params.id);
    if (loggedUser == undefined || oldPrivExecVal == undefined)
        return res.redirect('/error/permission-denied');
    res.render('pages/priv-exec-edit', { role: loggedUser.role, oldPrivExecVal });
});
app.get('/registrator/new', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    if (loggedUser == undefined)
        return res.redirect('/error/permission-denied');
    res.render('pages/registrator-new', { role: loggedUser.role });
});
app.get('/registrator/:login/edit', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    const oldUserVal = await user_model_1.User.findOne(req.params.login);
    if (loggedUser == undefined || oldUserVal == undefined)
        return res.redirect('/error/permission-denied');
    res.render('pages/registrator-edit', { role: loggedUser.role, oldUserVal });
});
app.get('/error/permission-denied', async (req, res) => {
    const loggedUser = await getLoggedUser(req);
    const role = (loggedUser == undefined) ? 0 : loggedUser.role;
    res.render('pages/error', { role });
});
app.post('/api/auth/login', async (req, res) => {
    const { login, password } = req.body;
    const userData = await user_model_1.User.findOne(login);
    if (userData != undefined && userData.pwd_hash === password && userData.is_active === true) {
        res.cookie(configs_1.cookieName, JSON.stringify({ login, password }), configs_1.cookieOptions);
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
});
app.post('/api/auth/logout', async (req, res) => {
    res.clearCookie(configs_1.cookieName, configs_1.cookieOptions);
    res.status(200).send();
});
app.post('/api/user', async (req, res) => {
    const { fullname, additional_data } = req.body;
    const identificationData = {
        login: uuid_1.v1(),
        password: uuid_1.v4()
    };
    if (await user_model_1.User.findOne({ fullname }) == undefined) {
        const user = new user_model_1.User();
        user.login = identificationData.login;
        user.pwd_hash = identificationData.password;
        user.fullname = fullname;
        user.role = 1;
        user.date_registration = (new Date()).toISOString();
        user.is_active = true;
        user.additional_data = additional_data;
        await user.save();
        res.json(identificationData);
    }
    else {
        res.status(400).send();
    }
});
app.post('/api/user/:login/res_id', async (req, res) => {
    const user = await user_model_1.User.findOne(req.params.login);
    if (user == undefined) {
        return res.status(400).send();
    }
    user.login = uuid_1.v1();
    user.pwd_hash = uuid_1.v4();
    await user.save();
    res.status(200).send();
});
app.put('/api/user/:login', async (req, res) => {
    const { fullname, additional_data, is_active } = req.body;
    const user = await user_model_1.User.findOne(req.params.login);
    if (user == undefined) {
        return res.status(400).send();
    }
    if (fullname != undefined)
        user.fullname = fullname;
    if (is_active != undefined)
        user.is_active = is_active;
    if (additional_data != undefined)
        user.additional_data = additional_data;
    await user.save();
    res.status(200).send();
});
app.delete('/api/user/:login', async (req, res) => {
    await user_model_1.User.remove(req.params.login);
    res.status(200).send();
});
app.post('/api/priv-exec', async (req, res) => {
    const { fullname, district_id, certificate_num, rec_certif_on, office_addr, started_out_on } = req.body;
    const user_login = JSON.parse(req.signedCookies[configs_1.cookieName]).login;
    if (await private_executor_model_1.PrivateExecutor.findOne({ fullname }) == undefined) {
        const privExec = new private_executor_model_1.PrivateExecutor();
        privExec.fullname = fullname;
        privExec.user = await user_model_1.User.findOne(user_login);
        privExec.district = await execution_district_model_1.ExecutionDistrict.findOne(district_id);
        privExec.is_active = true;
        privExec.created_on = (new Date()).toISOString();
        privExec.certificate_num = certificate_num;
        privExec.rec_certif_on = rec_certif_on;
        privExec.office_addr = office_addr;
        privExec.started_out_on = started_out_on;
        await privExec.save();
        res.status(200).send();
    }
    else {
        res.status(400).send();
    }
});
app.put('/api/priv-exec/:id', async (req, res) => {
    const { fullname, district_id, certificate_num, rec_certif_on, office_addr, started_out_on, is_active } = req.body;
    const privExec = await private_executor_model_1.PrivateExecutor.findOne(req.params.id);
    if (privExec == undefined) {
        return res.status(400).send();
    }
    if (fullname != undefined)
        privExec.fullname = fullname;
    if (district_id != undefined)
        privExec.district = await execution_district_model_1.ExecutionDistrict.findOne(district_id);
    if (certificate_num != undefined)
        privExec.certificate_num = certificate_num;
    if (rec_certif_on != undefined)
        privExec.rec_certif_on = rec_certif_on;
    if (office_addr != undefined)
        privExec.office_addr = office_addr;
    if (started_out_on != undefined)
        privExec.started_out_on = started_out_on;
    if (is_active != undefined)
        privExec.is_active = is_active;
    await privExec.save();
    res.status(200).send();
});
app.delete('/api/priv-exec/:id', async (req, res) => {
    await private_executor_model_1.PrivateExecutor.remove(req.params.id);
    res.status(200).send();
});
app.use((err, req, resp, next) => {
    console.log(err);
    resp.status(500).send('ERROR');
});
process.on('SIGINT', async () => (await database_1.default).close().then(() => process.exit()));
(async function () {
    const connection = await database_1.default;
    //await connection.synchronize();
    app.listen(process.env.PORT || 5000, () => {
        console.log("Started server!");
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBa0Q7QUFDbEQsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QiwwQ0FBMEM7QUFDMUMsOENBQThDO0FBQzlDLG1DQUFtQztBQUVuQyx1Q0FBc0Q7QUFDdEQsK0JBQWtEO0FBRWxELG9EQUEyQztBQUMzQyw0RUFBa0U7QUFDbEUsZ0ZBQXNFO0FBQ3RFLHNFQUE0RDtBQUc1RCxxQ0FBc0M7QUFHdEMsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFvQjtJQUNoRCxJQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsb0JBQVUsQ0FBQyxJQUFJLFNBQVM7UUFDNUMsT0FBTztJQUVSLE9BQU8saUJBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFFRCxNQUFNLEdBQUcsR0FBd0IsT0FBTyxFQUFFLENBQUM7QUFFM0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ25CLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMs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T0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUU5RixDQUFDLEtBQUs7SUFDTCxNQUFNLFVBQVUsR0FBRyxNQUFNLGtCQUFpQixDQUFDO0lBQzNDLGlDQUFpQztJQUVqQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25uZWN0aW9uUHJvbWlzZSBmcm9tICcuL21vZGVscy9kYXRhYmFzZSc7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBib2R5UGFyc2VyIGZyb20gXCJib2R5LXBhcnNlclwiO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBub2NhY2hlIGZyb20gXCJub2NhY2hlXCI7XG5cbmltcG9ydCB7IGNvb2tpZU9wdGlvbnMsIGNvb2tpZU5hbWUgfSBmcm9tIFwiLi9jb25maWdzXCI7XG5pbXBvcnQgeyB2MSBhcyB1dWlkVjEsIHY0IGFzIHV1aWRWNCB9IGZyb20gXCJ1dWlkXCI7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9tb2RlbHMvdXNlci1tb2RlbFwiO1xuaW1wb3J0IHsgUHJpdmF0ZUV4ZWN1dG9yIH0gZnJvbSBcIi4vbW9kZWxzL3ByaXZhdGVfZXhlY3V0b3ItbW9kZWxcIjtcbmltcG9ydCB7IEV4ZWN1dGlvbkRpc3RyaWN0IH0gZnJvbSBcIi4vbW9kZWxzL2V4ZWN1dGlvbl9kaXN0cmljdC1tb2RlbFwiO1xuaW1wb3J0IHsgSm91cm5hbEV2ZW50IH0gZnJvbSBcIi4vbW9kZWxzL2pvdXJuYWxfZXZlbnQtbW9kZWxcIjtcblxuXG5pbXBvcnQgeyBMaWtlLCBFcXVhbCB9IGZyb20gXCJ0eXBlb3JtXCI7XG5cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9nZ2VkVXNlcihyZXE6IGV4cHJlc3MuUmVxdWVzdCl7XG5cdGlmKHJlcS5zaWduZWRDb29raWVzW2Nvb2tpZU5hbWVdID09IHVuZGVmaW5lZClcblx0XHRyZXR1cm47XG5cblx0cmV0dXJuIFVzZXIuZmluZE9uZShKU09OLnBhcnNlKHJlcS5zaWduZWRDb29raWVzW2Nvb2tpZU5hbWVdKS5sb2dpbik7XG59XG5cbmNvbnN0IGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbiA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShub2NhY2hlKCkpO1xuYXBwLnNldCgndmlldyBlbmdpbmUnLCAnZWpzJyk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUsIGxpbWl0OiAzMDAwMDAwIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgbGltaXQ6IDMwMDAwMDAgfSkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnRleHQoeyBsaW1pdDogMzAwMDAwMDAgfSkpO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsJ3N0YXRpYycpKSk7XG5cbmFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHJlcy5zZXQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgbmV4dCgpO1xufSk7XG5cbmFwcC5nZXQoJy8nLCBhc3luYyAocmVxOiBhbnksIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuXHRjb25zdCBsb2dnZWRVc2VyID0gYXdhaXQgZ2V0TG9nZ2VkVXNlcihyZXEpO1xuXG5cdGNvbnN0IHJvbGUgPSAobG9nZ2VkVXNlciA9PSB1bmRlZmluZWQpPyAwIDogbG9nZ2VkVXNlci5yb2xlO1xuXHRjb25zdCB7IGZ1bGxuYW1lLCBkaXN0cmljdF9pZCwgaXNfYWN0aXZlLCBjZXJ0aWZpY2F0ZV9udW0gfSA9IHJlcS5xdWVyeTtcblxuXHRsZXQgc2VhcmNoT2JqOmFueSA9IHt9O1xuXG5cdGlmKGZ1bGxuYW1lIT11bmRlZmluZWQgJiYgZnVsbG5hbWUhPVwiXCIpIHNlYXJjaE9iai5mdWxsbmFtZSA9IExpa2UoJyUnK2Z1bGxuYW1lKyclJyk7XG5cdGlmKGNlcnRpZmljYXRlX251bSE9dW5kZWZpbmVkICYmIGNlcnRpZmljYXRlX251bSE9XCJcIikgc2VhcmNoT2JqLmNlcnRpZmljYXRlX251bSA9IExpa2UoJyUnK2NlcnRpZmljYXRlX251bSsnJScpO1xuXHRpZihkaXN0cmljdF9pZCE9dW5kZWZpbmVkKSBzZWFyY2hPYmouZGlzdHJpY3RfaWQgPSBkaXN0cmljdF9pZDtcblx0aWYoaXNfYWN0aXZlIT11bmRlZmluZWQpIHNlYXJjaE9iai5pc19hY3RpdmUgPSBpc19hY3RpdmU7XG5cblx0Y29uc3QgcHJpdmF0ZUV4ZWN1dG9ycyA9IChPYmplY3Qua2V5cyhzZWFyY2hPYmopLmxlbmd0aD4wKT8gKGF3YWl0IFByaXZhdGVFeGVjdXRvci5maW5kKHNlYXJjaE9iaikpIDogW107XG5cblx0cmVzLnJlbmRlcigncGFnZXMvbWFpbicsIHtcblx0XHRyb2xlLFxuXHRcdGZ1bGxuYW1lLCBkaXN0cmljdF9pZCwgaXNfYWN0aXZlLCBjZXJ0aWZpY2F0ZV9udW0sXG5cdFx0ZGlzdHJpY3RzOiBhd2FpdCBFeGVjdXRpb25EaXN0cmljdC5maW5kKCksXG5cdFx0cHJpdmF0ZUV4ZWN1dG9yczogcHJpdmF0ZUV4ZWN1dG9yc1xuXHR9KTtcbn0pO1xuYXBwLmdldCgnL2xvZ2luJywgKHJlcTogYW55LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0cmVzLnJlbmRlcigncGFnZXMvbG9naW4nKTtcbn0pO1xuYXBwLmdldCgnL3ByaXYtZXhlYy9saXN0JywgYXN5bmMgKHJlcTogYW55LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgbG9nZ2VkVXNlciA9IGF3YWl0IGdldExvZ2dlZFVzZXIocmVxKTtcblxuXHRpZihsb2dnZWRVc2VyID09IHVuZGVmaW5lZCkgcmV0dXJuIHJlcy5yZWRpcmVjdCgnL2Vycm9yL3Blcm1pc3Npb24tZGVuaWVkJyk7XG5cblx0cmVzLnJlbmRlcigncGFnZXMvcHJpdi1leGVjLWxpc3QnLCB7XG5cdFx0cm9sZTogbG9nZ2VkVXNlci5yb2xlLFxuXHRcdHByaXZhdGVFeGVjdXRvcnM6IGF3YWl0IFByaXZhdGVFeGVjdXRvci5maW5kKHtcblx0XHRcdHJlbGF0aW9uczogWyd1c2VyJ10sXG5cdFx0XHR3aGVyZToge1xuXHRcdFx0XHR1c2VyOiB7XG5cdFx0XHRcdFx0bG9naW46IGxvZ2dlZFVzZXIubG9naW5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdH0pO1xufSk7XG5hcHAuZ2V0KCcvcmVnaXN0cmF0b3IvbGlzdCcsIGFzeW5jIChyZXE6IGFueSwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XG5cdGNvbnN0IGxvZ2dlZFVzZXIgPSBhd2FpdCBnZXRMb2dnZWRVc2VyKHJlcSk7XG5cblx0aWYobG9nZ2VkVXNlciA9PSB1bmRlZmluZWQpIHJldHVybiByZXMucmVkaXJlY3QoJy9lcnJvci9wZXJtaXNzaW9uLWRlbmllZCcpO1xuXG5cdHJlcy5yZW5kZXIoJ3BhZ2VzL3JlZ2lzdHJhdG9yLWxpc3QnLCB7XG5cdFx0cm9sZTogbG9nZ2VkVXNlci5yb2xlLFxuXHRcdHJlZ2lzdGVyczogYXdhaXQgVXNlci5maW5kKHsgd2hlcmU6IHsgcm9sZTogMSB9IH0pXG5cdH0pO1xufSk7XG5hcHAuZ2V0KCcvZXZlbnQtam91cm5hbCcsIGFzeW5jIChyZXE6IGFueSwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XG5cdGNvbnN0IGxvZ2dlZFVzZXIgPSBhd2FpdCBnZXRMb2dnZWRVc2VyKHJlcSk7XG5cblx0aWYobG9nZ2VkVXNlciA9PSB1bmRlZmluZWQpIHJldHVybiByZXMucmVkaXJlY3QoJy9lcnJvci9wZXJtaXNzaW9uLWRlbmllZCcpO1xuXG5cdGNvbnN0IGV2ZW50cyA9IGF3YWl0IEpvdXJuYWxFdmVudC5maW5kKHtcblx0XHRyZWxhdGlvbnM6IFsndXNlciddLFxuXHRcdHdoZXJlOiB7XG5cdFx0XHR1c2VyOiB7XG5cdFx0XHRcdGxvZ2luOiBsb2dnZWRVc2VyLmxvZ2luXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvcmRlcjoge1xuXHRcdFx0ZXZlbnRfZGF0ZTogXCJERVNDXCJcblx0XHR9XG5cdH0pO1xuXHRcblx0cmVzLnJlbmRlcigncGFnZXMvZXZlbnQtam91cm5hbCcsIHsgcm9sZTogbG9nZ2VkVXNlci5yb2xlLCBldmVudHMgfSk7XG59KTtcbmFwcC5nZXQoJy9wcml2LWV4ZWMvbmV3JywgYXN5bmMgKHJlcTogYW55LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgbG9nZ2VkVXNlciA9IGF3YWl0IGdldExvZ2dlZFVzZXIocmVxKTtcblxuXHRpZihsb2dnZWRVc2VyID09IHVuZGVmaW5lZCkgcmV0dXJuIHJlcy5yZWRpcmVjdCgnL2Vycm9yL3Blcm1pc3Npb24tZGVuaWVkJyk7XG5cdFxuXHRyZXMucmVuZGVyKCdwYWdlcy9wcml2LWV4ZWMtbmV3JywgeyByb2xlOiBsb2dnZWRVc2VyLnJvbGUgfSk7XG59KTtcbmFwcC5nZXQoJy9wcml2LWV4ZWMvOmlkL2VkaXQnLCBhc3luYyAocmVxOiBhbnksIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuXHRjb25zdCBsb2dnZWRVc2VyID0gYXdhaXQgZ2V0TG9nZ2VkVXNlcihyZXEpO1xuXG5cdGNvbnN0IG9sZFByaXZFeGVjVmFsID0gYXdhaXQgUHJpdmF0ZUV4ZWN1dG9yLmZpbmRPbmUocmVxLnBhcmFtcy5pZCk7XG5cblx0aWYobG9nZ2VkVXNlciA9PSB1bmRlZmluZWQgfHwgb2xkUHJpdkV4ZWNWYWwgPT0gdW5kZWZpbmVkKVxuXHRcdHJldHVybiByZXMucmVkaXJlY3QoJy9lcnJvci9wZXJtaXNzaW9uLWRlbmllZCcpO1xuXHRcblx0cmVzLnJlbmRlcigncGFnZXMvcHJpdi1leGVjLWVkaXQnLCB7IHJvbGU6IGxvZ2dlZFVzZXIucm9sZSwgb2xkUHJpdkV4ZWNWYWwgfSk7XG59KTtcbmFwcC5nZXQoJy9yZWdpc3RyYXRvci9uZXcnLCBhc3luYyAocmVxOiBhbnksIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuXHRjb25zdCBsb2dnZWRVc2VyID0gYXdhaXQgZ2V0TG9nZ2VkVXNlcihyZXEpO1xuXG5cdGlmKGxvZ2dlZFVzZXIgPT0gdW5kZWZpbmVkKSByZXR1cm4gcmVzLnJlZGlyZWN0KCcvZXJyb3IvcGVybWlzc2lvbi1kZW5pZWQnKTtcblxuXHRyZXMucmVuZGVyKCdwYWdlcy9yZWdpc3RyYXRvci1uZXcnLCB7IHJvbGU6IGxvZ2dlZFVzZXIucm9sZSB9KTtcbn0pO1xuYXBwLmdldCgnL3JlZ2lzdHJhdG9yLzpsb2dpbi9lZGl0JywgYXN5bmMgKHJlcTogYW55LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgbG9nZ2VkVXNlciA9IGF3YWl0IGdldExvZ2dlZFVzZXIocmVxKTtcblxuXHRjb25zdCBvbGRVc2VyVmFsID0gYXdhaXQgVXNlci5maW5kT25lKHJlcS5wYXJhbXMubG9naW4pO1xuXG5cdGlmKGxvZ2dlZFVzZXIgPT0gdW5kZWZpbmVkIHx8IG9sZFVzZXJWYWwgPT0gdW5kZWZpbmVkKVxuXHRcdHJldHVybiByZXMucmVkaXJlY3QoJy9lcnJvci9wZXJtaXNzaW9uLWRlbmllZCcpO1xuXG5cdHJlcy5yZW5kZXIoJ3BhZ2VzL3JlZ2lzdHJhdG9yLWVkaXQnLCB7IHJvbGU6IGxvZ2dlZFVzZXIucm9sZSwgb2xkVXNlclZhbCB9KTtcbn0pO1xuYXBwLmdldCgnL2Vycm9yL3Blcm1pc3Npb24tZGVuaWVkJywgYXN5bmMgKHJlcTogYW55LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgbG9nZ2VkVXNlciA9IGF3YWl0IGdldExvZ2dlZFVzZXIocmVxKTtcblxuXHRjb25zdCByb2xlID0gKGxvZ2dlZFVzZXIgPT0gdW5kZWZpbmVkKT8gMCA6IGxvZ2dlZFVzZXIucm9sZTtcblxuXHRyZXMucmVuZGVyKCdwYWdlcy9lcnJvcicsIHtyb2xlfSk7XG59KTtcblxuXG5hcHAucG9zdCgnL2FwaS9hdXRoL2xvZ2luJywgYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgeyBsb2dpbiwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xuXG5cdGNvbnN0IHVzZXJEYXRhID0gYXdhaXQgVXNlci5maW5kT25lKGxvZ2luKTtcblxuXHRpZih1c2VyRGF0YSAhPSB1bmRlZmluZWQgJiYgdXNlckRhdGEucHdkX2hhc2ggPT09IHBhc3N3b3JkICYmIHVzZXJEYXRhLmlzX2FjdGl2ZSA9PT0gdHJ1ZSl7XG5cdFx0cmVzLmNvb2tpZShjb29raWVOYW1lLCBKU09OLnN0cmluZ2lmeSh7bG9naW4sIHBhc3N3b3JkfSksIGNvb2tpZU9wdGlvbnMpO1xuXG5cdCAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgpO1xuXHR9ZWxzZXtcblx0XHRyZXMuc3RhdHVzKDQwMCkuc2VuZCgpO1xuXHR9XG59KTtcbmFwcC5wb3N0KCcvYXBpL2F1dGgvbG9nb3V0JywgYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0cmVzLmNsZWFyQ29va2llKGNvb2tpZU5hbWUsIGNvb2tpZU9wdGlvbnMpO1xuXG5cdHJlcy5zdGF0dXMoMjAwKS5zZW5kKCk7XG59KTtcblxuXG5hcHAucG9zdCgnL2FwaS91c2VyJywgYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgeyBmdWxsbmFtZSwgYWRkaXRpb25hbF9kYXRhIH0gPSByZXEuYm9keTtcblxuXHRjb25zdCBpZGVudGlmaWNhdGlvbkRhdGEgPSB7XG5cdFx0bG9naW46IHV1aWRWMSgpLFxuXHRcdHBhc3N3b3JkOiB1dWlkVjQoKVxuXHR9O1xuXG5cdGlmKGF3YWl0IFVzZXIuZmluZE9uZSh7IGZ1bGxuYW1lIH0pID09IHVuZGVmaW5lZCl7XG5cdFx0Y29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XG5cblx0XHR1c2VyLmxvZ2luID0gaWRlbnRpZmljYXRpb25EYXRhLmxvZ2luO1xuXHRcdHVzZXIucHdkX2hhc2ggPSBpZGVudGlmaWNhdGlvbkRhdGEucGFzc3dvcmQ7XG5cdFx0dXNlci5mdWxsbmFtZSA9IGZ1bGxuYW1lO1xuXHRcdHVzZXIucm9sZSA9IDE7XG5cdFx0dXNlci5kYXRlX3JlZ2lzdHJhdGlvbiA9IChuZXcgRGF0ZSgpKS50b0lTT1N0cmluZygpO1xuXHRcdHVzZXIuaXNfYWN0aXZlID0gdHJ1ZTtcblx0XHR1c2VyLmFkZGl0aW9uYWxfZGF0YSA9IGFkZGl0aW9uYWxfZGF0YTtcblx0XHRcblx0XHRhd2FpdCB1c2VyLnNhdmUoKTtcblxuXHQgICAgcmVzLmpzb24oaWRlbnRpZmljYXRpb25EYXRhKTtcblx0fWVsc2V7XG5cdFx0cmVzLnN0YXR1cyg0MDApLnNlbmQoKTtcblx0fVxufSk7XG5hcHAucG9zdCgnL2FwaS91c2VyLzpsb2dpbi9yZXNfaWQnLCBhc3luYyAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuXHRjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHJlcS5wYXJhbXMubG9naW4pO1xuXG5cdGlmKHVzZXIgPT0gdW5kZWZpbmVkKXtcblx0XHRyZXR1cm4gcmVzLnN0YXR1cyg0MDApLnNlbmQoKTtcblx0fVxuXG5cdHVzZXIubG9naW4gPSB1dWlkVjEoKTtcblx0dXNlci5wd2RfaGFzaCA9IHV1aWRWNCgpO1xuXHRcblx0YXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgpO1xufSk7XG5hcHAucHV0KCcvYXBpL3VzZXIvOmxvZ2luJywgYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0Y29uc3QgeyBmdWxsbmFtZSwgYWRkaXRpb25hbF9kYXRhLCBpc19hY3RpdmUgfSA9IHJlcS5ib2R5O1xuXG5cdGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUocmVxLnBhcmFtcy5sb2dpbik7XG5cblx0aWYodXNlciA9PSB1bmRlZmluZWQpe1xuXHRcdHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCgpO1xuXHR9XG5cblx0aWYoZnVsbG5hbWUgIT0gdW5kZWZpbmVkKSB1c2VyLmZ1bGxuYW1lID0gZnVsbG5hbWU7XG5cdGlmKGlzX2FjdGl2ZSAhPSB1bmRlZmluZWQpIHVzZXIuaXNfYWN0aXZlID0gaXNfYWN0aXZlO1xuXHRpZihhZGRpdGlvbmFsX2RhdGEgIT0gdW5kZWZpbmVkKSB1c2VyLmFkZGl0aW9uYWxfZGF0YSA9IGFkZGl0aW9uYWxfZGF0YTtcblx0XG5cdGF3YWl0IHVzZXIuc2F2ZSgpO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcbn0pO1xuYXBwLmRlbGV0ZSgnL2FwaS91c2VyLzpsb2dpbicsIGFzeW5jIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XG5cdGF3YWl0IFVzZXIucmVtb3ZlKHJlcS5wYXJhbXMubG9naW4pO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcbn0pO1xuXG5cbmFwcC5wb3N0KCcvYXBpL3ByaXYtZXhlYycsIGFzeW5jIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XG5cdGNvbnN0IHsgXG5cdFx0ZnVsbG5hbWUsIGRpc3RyaWN0X2lkLCBjZXJ0aWZpY2F0ZV9udW0sXG5cdFx0cmVjX2NlcnRpZl9vbiwgb2ZmaWNlX2FkZHIsIHN0YXJ0ZWRfb3V0X29uXG5cdH0gPSByZXEuYm9keTtcblx0Y29uc3QgdXNlcl9sb2dpbiA9IEpTT04ucGFyc2UocmVxLnNpZ25lZENvb2tpZXNbY29va2llTmFtZV0pLmxvZ2luO1xuXG5cdGlmKGF3YWl0IFByaXZhdGVFeGVjdXRvci5maW5kT25lKHsgZnVsbG5hbWUgfSkgPT0gdW5kZWZpbmVkKXtcblx0XHRjb25zdCBwcml2RXhlYyA9IG5ldyBQcml2YXRlRXhlY3V0b3IoKTtcblxuXHRcdHByaXZFeGVjLmZ1bGxuYW1lID0gZnVsbG5hbWU7XG5cdFx0cHJpdkV4ZWMudXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh1c2VyX2xvZ2luKTtcblx0XHRwcml2RXhlYy5kaXN0cmljdCA9IGF3YWl0IEV4ZWN1dGlvbkRpc3RyaWN0LmZpbmRPbmUoZGlzdHJpY3RfaWQpO1xuXHRcdHByaXZFeGVjLmlzX2FjdGl2ZSA9IHRydWU7XG5cdFx0cHJpdkV4ZWMuY3JlYXRlZF9vbiA9IChuZXcgRGF0ZSgpKS50b0lTT1N0cmluZygpO1xuXHRcdHByaXZFeGVjLmNlcnRpZmljYXRlX251bSA9IGNlcnRpZmljYXRlX251bTtcblx0XHRwcml2RXhlYy5yZWNfY2VydGlmX29uID0gcmVjX2NlcnRpZl9vbjtcblx0XHRwcml2RXhlYy5vZmZpY2VfYWRkciA9IG9mZmljZV9hZGRyO1xuXHRcdHByaXZFeGVjLnN0YXJ0ZWRfb3V0X29uID0gc3RhcnRlZF9vdXRfb247XG5cdFx0XG5cdFx0YXdhaXQgcHJpdkV4ZWMuc2F2ZSgpO1xuXG5cdCAgICByZXMuc3RhdHVzKDIwMCkuc2VuZCgpO1xuXHR9ZWxzZXtcblx0XHRyZXMuc3RhdHVzKDQwMCkuc2VuZCgpO1xuXHR9XG59KTtcbmFwcC5wdXQoJy9hcGkvcHJpdi1leGVjLzppZCcsIGFzeW5jIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PiB7XG5cdGNvbnN0IHsgXG5cdFx0ZnVsbG5hbWUsIGRpc3RyaWN0X2lkLCBjZXJ0aWZpY2F0ZV9udW0sXG5cdFx0cmVjX2NlcnRpZl9vbiwgb2ZmaWNlX2FkZHIsIHN0YXJ0ZWRfb3V0X29uLFxuXHRcdGlzX2FjdGl2ZVxuXHR9ID0gcmVxLmJvZHk7XG5cblx0Y29uc3QgcHJpdkV4ZWMgPSBhd2FpdCBQcml2YXRlRXhlY3V0b3IuZmluZE9uZShyZXEucGFyYW1zLmlkKTtcblxuXHRpZihwcml2RXhlYyA9PSB1bmRlZmluZWQpe1xuXHRcdHJldHVybiByZXMuc3RhdHVzKDQwMCkuc2VuZCgpO1xuXHR9XG5cblx0aWYoZnVsbG5hbWUgIT0gdW5kZWZpbmVkKSBwcml2RXhlYy5mdWxsbmFtZSA9IGZ1bGxuYW1lO1xuXHRpZihkaXN0cmljdF9pZCAhPSB1bmRlZmluZWQpIHByaXZFeGVjLmRpc3RyaWN0ID0gYXdhaXQgRXhlY3V0aW9uRGlzdHJpY3QuZmluZE9uZShkaXN0cmljdF9pZCk7XG5cdGlmKGNlcnRpZmljYXRlX251bSAhPSB1bmRlZmluZWQpIHByaXZFeGVjLmNlcnRpZmljYXRlX251bSA9IGNlcnRpZmljYXRlX251bTtcblx0aWYocmVjX2NlcnRpZl9vbiAhPSB1bmRlZmluZWQpIHByaXZFeGVjLnJlY19jZXJ0aWZfb24gPSByZWNfY2VydGlmX29uO1xuXHRpZihvZmZpY2VfYWRkciAhPSB1bmRlZmluZWQpIHByaXZFeGVjLm9mZmljZV9hZGRyID0gb2ZmaWNlX2FkZHI7XG5cdGlmKHN0YXJ0ZWRfb3V0X29uICE9IHVuZGVmaW5lZCkgcHJpdkV4ZWMuc3RhcnRlZF9vdXRfb24gPSBzdGFydGVkX291dF9vbjtcblx0aWYoaXNfYWN0aXZlICE9IHVuZGVmaW5lZCkgcHJpdkV4ZWMuaXNfYWN0aXZlID0gaXNfYWN0aXZlO1xuXHRcblx0YXdhaXQgcHJpdkV4ZWMuc2F2ZSgpO1xuXG4gICAgcmVzLnN0YXR1cygyMDApLnNlbmQoKTtcbn0pO1xuYXBwLmRlbGV0ZSgnL2FwaS9wcml2LWV4ZWMvOmlkJywgYXN5bmMgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcblx0YXdhaXQgUHJpdmF0ZUV4ZWN1dG9yLnJlbW92ZShyZXEucGFyYW1zLmlkKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCk7XG59KTtcblxuXG5hcHAudXNlKChlcnI6IEVycm9yLCByZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzcDogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogRnVuY3Rpb24pPT57XG5cdGNvbnNvbGUubG9nKGVycik7XG5cdHJlc3Auc3RhdHVzKDUwMCkuc2VuZCgnRVJST1InKTtcbn0pO1xuXG5wcm9jZXNzLm9uKCdTSUdJTlQnLGFzeW5jICgpID0+IChhd2FpdCBjb25uZWN0aW9uUHJvbWlzZSkuY2xvc2UoKS50aGVuKCgpID0+IHByb2Nlc3MuZXhpdCgpKSk7XG5cbihhc3luYyBmdW5jdGlvbigpe1xuXHRjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgY29ubmVjdGlvblByb21pc2U7XG5cdC8vYXdhaXQgY29ubmVjdGlvbi5zeW5jaHJvbml6ZSgpO1xuXG5cdGFwcC5saXN0ZW4ocHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwLCAoKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coXCJTdGFydGVkIHNlcnZlciFcIik7XG5cdH0pO1xufSkoKTsiXX0=