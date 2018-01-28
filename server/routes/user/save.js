import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";

let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
let datasetModel = datasourceAeolus.getModel("t_db_table");
const router = require('koa-router')();
router.prefix('/user/save');

router.post('/datasource', async function (ctx, next) {
    let requestBody = ctx.request.body;
    let saveInfo = requestBody.saveInfo || {};
    let param = {
        ip: saveInfo.ip,
        port: saveInfo.port,
        acc: saveInfo.acc,
        psw: saveInfo.psw,
        db_name: saveInfo.db_name,
        create_user: 0,
        create_time: new Date(),
        status: 1
    };
    console.log(saveInfo);
    await datasourceModel.create(param).then((data) => {
        console.log(data);
        commom.responseBody(ctx, {
            code: "success",
            msg: "成功"
        });
    }, (err) => {
        console.log(err);
        commom.responseBody(ctx, {
            code: "failure",
            msg: "失败"
        });
    });
});

module.exports = router;
