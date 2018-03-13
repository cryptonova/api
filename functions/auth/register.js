const User = require('../../models/User')
const Auth = require('../../services/Auth')
const { ValidationException } = require('../exceptions')
const validate = require('validate.js')

/**
 * Register user.
 *
 * @param input
 * @returns {Promise<{id, email}>}
 * @throws ValidationException
 */
async function authRegister (input) {
  const { email, password, passwordConfirmation } = JSON.parse(input)
  let user = await User.findByEmail(email, 'email')

  if (typeof user !== 'undefined') {
    throw new ValidationException({
      email: ['Email already exists']
    })
  }

  const errors = validate({ email, password, passwordConfirmation }, Auth.registerRules)
  if (errors) {
    throw new ValidationException(errors)
  }

  const passwordHash = Auth.getPasswordHash(password)
  user = await User.create({
    email,
    password: passwordHash
  })

  return {
    id: user.id,
    email: user.email
  }
}

module.exports = authRegister
