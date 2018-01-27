import commom from "../../utils/common";
import sequelizeFactory from "../../dao/orm/SequelizeFactory";
let datasourceAeolus = sequelizeFactory.getModelFactory("aeolus");
const router = require('koa-router')();
router.prefix('/user/home');

router.post('/bar', async function (ctx, next) {
    ctx.body = 'this is a users/bar response'
});

module.exports = router;
