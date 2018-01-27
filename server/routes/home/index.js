import commom from "../../utils/common";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";
let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
/*Datasource.create({
 title: "name",
 ip: "localhost",
 port: "3306",
 acc: "root",
 psw: "root",
 db_name: "aeolus",
 create_user:123,
 create_time:new Date(),
 status:0
 });
 Datasource.findAll().then((data) => {
 console.log(data.length);
 });*/
const router = require("koa-router")();
router.prefix('/home/index');

router.post('/login', async (ctx, next) => {
    let paramBody = ctx.request.body;
    let acc = paramBody["acc"];
    let psw = paramBody["psw"];
    console.log(acc, psw);
    let dsUser = datasourceAeolus.getModel("t_user");
    dsUser.findOne({
        where: {
            acc: acc,
            psw: psw
        }
    }).then((data)=> {
        console.log(data);
        if (!data && !data["id"]) {
            commom.responseBody(ctx, {
                code: "failure",
                msg: "用户名不存在或密码不正确"
            });
            return false;
        }
        ctx.session.user = {
            id: data["id"],
            acc: data["acc"]
        };
        commom.responseBody(ctx, {
            code: "success",
            msg: "登录成功"
        });
    }, (err)=> {
        console.log(err);
        commom.responseBody(ctx, {
            code: "failure",
            msg: "服务器繁忙,请稍后再试"
        });
    });
});

module.exports = router;
