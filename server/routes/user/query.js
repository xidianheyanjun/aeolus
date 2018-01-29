import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";

let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
let datasetModel = datasourceAeolus.getModel("t_db_table");
let columnModel = datasourceAeolus.getModel("t_db_column");
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

router.post('/queryDatasource', async function (ctx, next) {
    let dsList = await datasourceModel.findAll({
        attributes: ["id", "db_name"]
    });
    commom.responseBody(ctx, {
        code: "success",
        msg: "成功",
        dsList: dsList
    });
});

router.post('/dataset/:id', async function (ctx, next) {
    let dataId = ctx.params.id;
    let dataset = await datasetModel.findOne({
        attributes: ["ds_id", "title", "name"],
        where: {
            id: dataId,
            status: 1
        }
    });
    if (dataset.length == 0) {
        commom.responseBody(ctx, {
            code: "failure",
            msg: "无效的数据集"
        });
        return false;
    }
    let dataColumns = await columnModel.findAll({
        attributes: ["dt_id", "code", "name", "kind", "default_option"],
        where: {
            dt_id: dataId
        },
        order: [
            ["id"]
        ]
    });
    commom.responseBody(ctx, {
        code: "success",
        msg: "成功",
        dataset: dataset.dataValues,
        colList: dataColumns
    });
});

module.exports = router;
