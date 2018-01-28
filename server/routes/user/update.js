import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";

let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
let datasetModel = datasourceAeolus.getModel("t_db_table");
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

module.exports = router;
