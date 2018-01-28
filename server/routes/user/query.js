import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";

let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
let datasetModel = datasourceAeolus.getModel("t_db_table");
const router = require('koa-router')();
router.prefix('/user/query');

router.post('/datasource', async function (ctx, next) {
    let requestBody = ctx.request.body;
    let biz = requestBody.biz || {};
    let page = requestBody.page || {};
    await pageQuery(datasourceModel, page, {
        status: 1
    }).then((data) => {
        commom.responseBody(ctx, {
            code: "success",
            msg: "成功",
            grid: data
        });
    }, (err) => {
        console.log(err);
    });
});

router.post('/datasource/:id', async function (ctx, next) {
    let dataId = ctx.params.id;
    await datasourceModel.findOne({
        attributes: ["ip", "port", "acc", "psw", "db_name"],
        where: {
            id: dataId
        }
    }).then((data) => {
        commom.responseBody(ctx, {
            code: "success",
            msg: "成功",
            data: data
        });
    }, (err) => {
        console.log(err);
    });
});

router.post('/dataset', async function (ctx, next) {
    let requestBody = ctx.request.body;
    let biz = requestBody.biz || {};
    let page = requestBody.page || {};
    await pageQuery(datasetModel, page, {
        status: 1
    }).then((data) => {
        commom.responseBody(ctx, {
            code: "success",
            msg: "成功",
            grid: data
        });
    }, (err) => {
        console.log(err);
    });
});

module.exports = router;
