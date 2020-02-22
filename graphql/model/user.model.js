import bcrypt from 'bcrypt';

import { sequelize } from '../connection/db.connection';
import Sequelize from 'sequelize';
import Message from './message.model';

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        field: 'username'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        field: 'password',
        allowNull: false,
        validate: {

            len: [7, 42]
        }
    }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
    underscored: true
});


User.beforeCreate(async user => {
    console.log('Before Create hook', user);
    user.password = await user.generateHashPassword(user.password)

});

User.prototype.generateHashPassword = async function (password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
}

User.prototype.validatePassword = async function (password) {
    // console.log('validate password==', this)
    return await bcrypt.compare(password, this.password)
}

User.hasMany(Message, { as: 'message', foreignKey: 'userId' });
export default User;



