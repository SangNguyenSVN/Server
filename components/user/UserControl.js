const async = require('hbs/lib/async');
const userService = require('./UseServices');

const login = async (email, pass) => {
    return await userService.login(email, pass);
}

const register = async (email, pass, name) => {
    return await userService.register(email, pass, name);
}

module.exports = { login, register };