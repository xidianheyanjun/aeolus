import Sequelize from "sequelize";
import path from "path";
import env from "../../env";
import common from "../../utils/common";

class Factory {
    constructor(dbMap) {
        this.sequelizeMap = {};
        this.modelMap = {};
        this.cache = {};
        this.createSequelizeMap(dbMap);
        this.loadModelMap();
    }

    createSequelizeMap(dbMap) {
        for (let key in dbMap) {
            let dbConfig = dbMap[key];
            console.log("init sequelize[" + key + "] start");
            let sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
                host: dbConfig.host,
                port: dbConfig.port,
                dialect: "mysql",
                pool: {
                    max: 5,
                    min: 0,
                    idle: 30000
                }
            });
            this.cache[key] = {};
            this.sequelizeMap[key] = sequelize;
            console.log("init sequelize[" + key + "] finish");
        }
    }

    loadModelMap() {
        let dir = path.join(path.dirname(__dirname), "./models");
        console.log("load modelMap start [" + dir + "]");
        let paths = common.listFilePath(dir);
        for (let m = 0; m < paths.length; ++m) {
            console.log("load model start [" + paths[m] + "]");
            let model = require(paths[m]);
            this.modelMap[model.id] = model;
        }
        console.log("load modelMap finish [" + dir + "]");
    }

    getModel(modelId, sequelizeKey) {
        if (!this.cache[sequelizeKey][modelId]) {
            let model = this.modelMap[modelId];
            this.cache[sequelizeKey][modelId] = this.sequelizeMap[sequelizeKey].define(model.tableName, model.cols, model.options);
        }
        return this.cache[sequelizeKey][modelId];
    }
}

let factory = new Factory(env.db);
export default factory;