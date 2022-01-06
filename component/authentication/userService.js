const userModel = require('./userModel')
const bcrypt = require('bcrypt')
const sgMail = require('../../service/sendGrid')
const randomString = require('randomstring')

exports.findByUserName = (username) => {
  return userModel
    .findOne({
      username: username,
    })
    .lean()
}

exports.validPassword = async (password, user) => {
  const valid = await bcrypt.compare(password, user.password)
  return valid
}

exports.register = async (username, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const activationString = randomString.generate()

  console.log(email)
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email, // Change to your recipient
    from: process.env.EMAIL_SENDER, // Change to your verified sender
    subject: 'Your account email activation',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<h1>Thanks for register your account with COCO Store</h1><p>Please to activate your account <a href="${process.env.DOMAIN}/register/activate?email=${email}&activation-string=${activationString}">Activate now</a></p>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  return userModel.create({
    status: 'inactivated',
    activationString: activationString,
    username: username,
    email: email,
    password: passwordHash,
  })
}
exports.findByEmail = (email) => {
  return userModel.findOne({ email: email }).lean()
}
exports.activate = async (email, activationString) => {
  const user = await userModel.findOne({ email, activationString }).lean()
  if (!user) return false
  await userModel.updateOne(
    { email, activationString },
    { $set: { status: 'activated' } }
  )
  return true
}

exports.updatePassword = async (id, email, password) => {
  let user
  if (id) {
    console.log(id);
    const hashPassword = await bcrypt.hash(password, 10)
    await userModel.findOneAndUpdate({ _id: id }, { $set: { password: hashPassword } })
    return true
  } else if (email) {
    user = await userModel.findOne({ email }).lean()
    if (!user) return false
    const hashPassword = await bcrypt.hash(password, 10)
    await userModel.findOneAndUpdate({ email }, { $set: { password: hashPassword } })
    return true
  }
}

exports.sendActivateLinkToResetPassword = async (email) => {
  const user = await userModel.findOne({ email: email }).lean()
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email, // Change to your recipient
    from: process.env.EMAIL_SENDER, // Change to your verified sender
    subject: 'Reset password',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<p>Please to reset your password by<a href="${process.env.DOMAIN}/reset-password/reset?email=${email}">Reset now</a></p>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
