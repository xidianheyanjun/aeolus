import path from "path";
import env from "../../env";
import ModelFactory from "./ModelFactory";

class SequelizeFactory {
    constructor(dbMap) {
        this.sequelizeMap = {};
        this.createSequelizeMap(dbMap);
    }

    createSequelizeMap(dbMap) {
        for (let key in dbMap) {
            let dbConfig = dbMap[key];
            console.log("init sequelize[" + key + "] start");
            this.sequelizeMap[key] = new ModelFactory(dbConfig);
            console.log("init sequelize[" + key + "] finish");
        }
    }

    getModelFactory(sequelizeKey) {
        return this.sequelizeMap[sequelizeKey];
    }
}

let sequelizeFactory = new SequelizeFactory(env.db);
export default sequelizeFactory;