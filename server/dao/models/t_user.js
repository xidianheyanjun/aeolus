import Sequelize from "sequelize";
module.exports = {
    id: "t_user",
    tableName: "t_user",
    cols: {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        acc: Sequelize.STRING(128),
        psw: Sequelize.STRING(128),
        status: Sequelize.TINYINT()
    },
    options: {
        timestamps: false,
        freezeTableName: true
    }
};