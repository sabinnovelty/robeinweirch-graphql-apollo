let env_parse = require('dotenv').config();

let { parsed: envs } = env_parse;
console.log('env parse', envs)

module.exports = envs

