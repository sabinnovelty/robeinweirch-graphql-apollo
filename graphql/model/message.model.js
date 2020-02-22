// const message = (sequelize, DataTypes) => {
//     const Message = sequelize.define('message', {
//         title: DataTypes.STRING
//     });
//     Message.associate = models => {
//         Message.belongsTo(models.User)
//     }
//     return Message;
// }

// export default message;

import { sequelize } from '../connection/db.connection';
import Sequelize from 'sequelize';
// import User from './user.model';

const Message = sequelize.define('messages', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    text: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: new Date()
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
})

// Message.belongsTo(User, { as: 'user', foreignKey: 'userId' })

export default Message;
