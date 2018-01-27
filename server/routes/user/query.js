import commom from "../../utils/common";
import Sequelize from "sequelize";
import {pageQuery} from "../../service/grid/query";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";
let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
let datasourceModel = datasourceAeolus.getModel("t_data_source");
const router = require('koa-router')();
router.prefix('/user/query');

router.post('/datasource', async function (ctx, next) {
    let sqlId = ctx.params.id;
    let requestBody = ctx.request.body;
    let biz = requestBody.biz || {};
    let page = requestBody.page || {};
    await pageQuery(datasourceModel, page, {}).then((data)=> {
        commom.responseBody(ctx, {
            code: "success",
            msg: "成功",
            grid: data
        });
    }, (err)=> {
        console.log(err);
    });
});

module.exports = router;
