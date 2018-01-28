import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";

let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
let datasetModel = datasourceAeolus.getModel("t_db_table");
const router = require('koa-router')();
router.prefix('/user/remove');

router.post('/datasource', async function (ctx, next) {
    let requestBody = ctx.request.body;
    let params = requestBody.removeData || [];
    let ids = [];
    for (let m = 0; m < params.length; ++m) {
        ids.push(params[m].id);
    }
    await datasourceModel.update({
        status: Sequelize.literal("0")
    }, {
        where: {
            id: {
                $in: ids
            }
        }
    }).then((data) => {
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

router.post('/dataset', async function (ctx, next) {
    let requestBody = ctx.request.body;
    let params = requestBody.removeData || [];
    let ids = [];
    for (let m = 0; m < params.length; ++m) {
        ids.push(params[m].id);
    }
    await datasetModel.update({
        status: Sequelize.literal("0")
    }, {
        where: {
            id: {
                $in: ids
            }
        }
    }).then((data) => {
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
