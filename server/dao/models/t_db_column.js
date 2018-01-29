import Sequelize from "sequelize";

module.exports = {
    id: "t_db_column",
    tableName: "t_db_column",
    cols: {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        dt_id: Sequelize.INTEGER(11),
        code: Sequelize.STRING(128),
        name: Sequelize.STRING(128),
        kind: Sequelize.STRING(16),
        default_option: Sequelize.STRING(255),
        default_value: Sequelize.STRING(128),
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
