import Sequelize from "sequelize";
module.exports = {
    id: "t_data_source",
    tableName: "t_data_source",
    cols: {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING(128),
        ip: Sequelize.STRING(16),
        port: Sequelize.STRING(8),
        acc: Sequelize.STRING(128),
        psw: Sequelize.STRING(128),
        db_name: Sequelize.STRING(128),
        create_user: Sequelize.INTEGER(11),
        create_time: Sequelize.DATE(),
        update_user: Sequelize.INTEGER(11),
        update_time: Sequelize.DATE(),
        status: Sequelize.TINYINT()
    },
    options: {
        timestamps: false,
        freezeTableName: true
    }
};