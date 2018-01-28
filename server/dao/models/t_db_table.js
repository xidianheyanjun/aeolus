import Sequelize from "sequelize";

module.exports = {
    id: "t_db_table",
    tableName: "t_db_table",
    cols: {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true
        },
        ds_id: Sequelize.INTEGER(11),
        title: Sequelize.STRING(128),
        name: Sequelize.STRING(128),
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
