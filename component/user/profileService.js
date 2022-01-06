const userModel = require('../authentication/userModel')
exports.findByUsername = async (username) => {
  return await userModel.find({ username: username }).lean()
}

exports.findByEmail = async (email) => {
  return await userModel.find({ email: email }).lean()
}

exports.findById = async (id) => {
  return await userModel.find({ _id: id }).lean()
}

exports.updateUser = async (id, body) => {
  return await userModel.updateOne({ _id: id }, {username: body.username, email: body.email, phoneNumber: body.phone, address: body.address})
}
