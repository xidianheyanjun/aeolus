import Sequelize from "sequelize";
import path from "path";
import env from "../../env";
import common from "../../utils/common";

class ModelFactory {
    constructor(dbConfig) {
        this.sequelize = null;
        this.modelMap = {};
        this.cache = {};
        this.loadModelMap();
        this.initSequelize(dbConfig);
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

    initSequelize(dbConfig) {
        this.sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            port: dbConfig.port,
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                idle: 30000
            }
        });
    }

    getModel(modelId) {
        if (!this.cache[modelId]) {
            let model = this.modelMap[modelId];
            this.cache[modelId] = this.sequelize.define(model.tableName, model.cols, model.options);
        }
        return this.cache[modelId];
    }
}

export default ModelFactory;