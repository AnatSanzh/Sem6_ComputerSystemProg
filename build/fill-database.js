"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./models/database");
const execution_district_model_1 = require("./models/execution_district-model");
process.on('SIGINT', async () => (await database_1.default).close().then(() => process.exit()));
(async function () {
    const connection = await database_1.default;
    //await connection.synchronize();
    const districtNames = ["Київська область", "Закарпатська область", "Черкаська область", "Полтавська область"];
    for (const name of districtNames) {
        const tempDistrict = new execution_district_model_1.ExecutionDistrict();
        tempDistrict.district_name = name;
        await tempDistrict.save();
    }
    /*{
        const admin = new User();

        admin.login = "admin";
        admin.fullname = "Андрій Андрійович Андрієнко";
        admin.role = 2;
        admin.date_registration = (new Date()).toISOString();
        admin.pwd_hash = "1234";
        admin.is_active = true;
        admin.additional_data = "";

        await admin.save();
    }*/
    process.exit();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsbC1kYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9maWxsLWRhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQWtEO0FBR2xELGdGQUFzRTtBQUd0RSxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxrQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRTlGLENBQUMsS0FBSztJQUNMLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0JBQWlCLENBQUM7SUFDM0MsaUNBQWlDO0lBRWpDLE1BQU0sYUFBYSxHQUFHLENBQUMsa0JBQWtCLEVBQUMsc0JBQXNCLEVBQUMsbUJBQW1CLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUMzRyxLQUFLLE1BQU0sSUFBSSxJQUFJLGFBQWEsRUFBRTtRQUNqQyxNQUFNLFlBQVksR0FBRyxJQUFJLDRDQUFpQixFQUFFLENBQUM7UUFDN0MsWUFBWSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDbEMsTUFBTSxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDMUI7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFFSCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25uZWN0aW9uUHJvbWlzZSBmcm9tICcuL21vZGVscy9kYXRhYmFzZSc7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi9tb2RlbHMvdXNlci1tb2RlbFwiO1xuaW1wb3J0IHsgRXhlY3V0aW9uRGlzdHJpY3QgfSBmcm9tIFwiLi9tb2RlbHMvZXhlY3V0aW9uX2Rpc3RyaWN0LW1vZGVsXCI7XG5cblxucHJvY2Vzcy5vbignU0lHSU5UJyxhc3luYyAoKSA9PiAoYXdhaXQgY29ubmVjdGlvblByb21pc2UpLmNsb3NlKCkudGhlbigoKSA9PiBwcm9jZXNzLmV4aXQoKSkpO1xuXG4oYXN5bmMgZnVuY3Rpb24oKXtcblx0Y29uc3QgY29ubmVjdGlvbiA9IGF3YWl0IGNvbm5lY3Rpb25Qcm9taXNlO1xuXHQvL2F3YWl0IGNvbm5lY3Rpb24uc3luY2hyb25pemUoKTtcblxuXHRjb25zdCBkaXN0cmljdE5hbWVzID0gW1wi0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjFwiLFwi0JfQsNC60LDRgNC/0LDRgtGB0YzQutCwINC+0LHQu9Cw0YHRgtGMXCIsXCLQp9C10YDQutCw0YHRjNC60LAg0L7QsdC70LDRgdGC0YxcIixcItCf0L7Qu9GC0LDQstGB0YzQutCwINC+0LHQu9Cw0YHRgtGMXCJdO1xuXHRmb3IgKGNvbnN0IG5hbWUgb2YgZGlzdHJpY3ROYW1lcykge1xuXHRcdGNvbnN0IHRlbXBEaXN0cmljdCA9IG5ldyBFeGVjdXRpb25EaXN0cmljdCgpO1xuXHRcdHRlbXBEaXN0cmljdC5kaXN0cmljdF9uYW1lID0gbmFtZTtcblx0XHRhd2FpdCB0ZW1wRGlzdHJpY3Quc2F2ZSgpO1xuXHR9XG5cblx0Lyp7XG5cdFx0Y29uc3QgYWRtaW4gPSBuZXcgVXNlcigpO1xuXG5cdFx0YWRtaW4ubG9naW4gPSBcImFkbWluXCI7XG5cdFx0YWRtaW4uZnVsbG5hbWUgPSBcItCQ0L3QtNGA0ZbQuSDQkNC90LTRgNGW0LnQvtCy0LjRhyDQkNC90LTRgNGW0ZTQvdC60L5cIjtcblx0XHRhZG1pbi5yb2xlID0gMjtcblx0XHRhZG1pbi5kYXRlX3JlZ2lzdHJhdGlvbiA9IChuZXcgRGF0ZSgpKS50b0lTT1N0cmluZygpO1xuXHRcdGFkbWluLnB3ZF9oYXNoID0gXCIxMjM0XCI7XG5cdFx0YWRtaW4uaXNfYWN0aXZlID0gdHJ1ZTtcblx0XHRhZG1pbi5hZGRpdGlvbmFsX2RhdGEgPSBcIlwiO1xuXG5cdFx0YXdhaXQgYWRtaW4uc2F2ZSgpO1xuXHR9Ki9cblxuXHRwcm9jZXNzLmV4aXQoKTtcbn0pKCk7Il19