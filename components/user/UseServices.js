const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');

const login = async (email, pass) => {
  try {
    // const user = users.find(u => u.email == email);
    // if (user && user.pass == pass) {

    //   return user;
    // }
    // return null;

    const user = await userModel.findOne({ email: email });
    if (user) {
      const result = bcrypt.compareSync(pass, user.pass);
      return result ? user : false;
    }
  } catch (error) {
    console.log('Log Err: ', error);
  }
  return false;

};

const register = async (email, pass, name) => {
  try {


    const user = await userModel.findOne({ email: email });
    if (user) {
      return false;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    const newUser = { email, pass: hash, name };
    const u = new userModel(newUser);
    await u.save();
    return true;
  } catch (error) {
    console.log("Register Err: ", error);
  }
  return false;
}


module.exports = { login, register };

var users = [
  {
    _id: 1,
    email: 'sangvu220@gmail.com',
    pass: '1',
    name: 'NguyenVuSang'
  }

];


