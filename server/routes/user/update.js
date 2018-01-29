import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";

let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
let datasetModel = datasourceAeolus.getModel("t_db_table");
let columnModel = datasourceAeolus.getModel("t_db_column");
const router = require('koa-router')();
router.prefix('/user/update');

router.post('/datasource/:id', async function (ctx, next) {
    let dataId = ctx.params.id;
    let requestBody = ctx.request.body;
    let saveInfo = requestBody.saveInfo || {};
    let data = await datasourceModel.findOne({
        where: {
            id: dataId
        }
    });
    let dataValues = data.dataValues;
    Object.assign(dataValues, saveInfo);
    console.log(dataValues);
    let status = await datasourceModel.update(dataValues, {
        where: {
            id: dataId
        }
    });
    console.log("status", status);
    commom.responseBody(ctx, {
        code: "success",
        msg: "成功"
    });
});

router.post('/dataset/:id', async function (ctx, next) {
    let dtId = ctx.params.id;
    let requestBody = ctx.request.body;
    let saveInfo = requestBody.saveInfo || {};
    let colListStr = requestBody.colList || "";
    let colList = JSON.parse(colListStr);
    let dtInfo = await datasetModel.findOne({
        where: {
            id: dtId,
            status: 1
        }
    });
    if (dtInfo.length == 0) {
        commom.responseBody(ctx, {
            code: "failure",
            msg: "无效的数据集"
        });
        return false;
    }
    let dataValues = dtInfo.dataValues;
    dataValues.ds_id = saveInfo.ds_id;
    dataValues.title = saveInfo.title;
    dataValues.name = saveInfo.name;
    console.log(dataValues);
    let status = await datasetModel.update(dataValues, {
        where: {
            id: dtId
        }
    });
    console.log("status", status);
    let desdroyStatus = await columnModel.destroy({
        where: {
            dt_id: dtId
        }
    });
    console.log(desdroyStatus);
    let createColList = [];
    for (let m = 0; m < colList.length; ++m) {
        createColList.push({
            dt_id: dtId,
            code: colList[m].code,
            name: colList[m].name,
            kind: colList[m].kind,
            default_option: colList[m].options,
            create_user: 0,
            create_time: new Date(),
            status: 1
        });
    }
    let createColListStatus = await columnModel.bulkCreate(createColList);
    console.log(createColListStatus);
    commom.responseBody(ctx, {
        code: "success",
        msg: "成功"
    });
});

module.exports = router;
