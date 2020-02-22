import Sequelize from 'sequelize';

const sequelize = new Sequelize('graphql-db', 'postgres', 'p@ssw0rd', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 60000
    }
});
sequelize.authenticate().then(error => {
    if (error) console.log("Unable to connect to the database:", error);
    console.log("Postgres Connection has been established successfully.");
});

// sequelize.sync({ force: true }).then(res => {
//     console.log('databse data has been erased.')
// })

export { sequelize };