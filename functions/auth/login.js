const User = require('../../models/User')
const Auth = require('../../services/Auth')
const { ValidationException } = require('../exceptions')
const validate = require('validate.js')

/**
 * Authenticate user.
 *
 * @param input
 * @returns {Promise<{token: string}>}
 * @throws ValidationException
 */
async function authLogin (input) {
  const { email, password } = JSON.parse(input)
  const user = await User.findByEmail(email, ['id', 'isAdmin'])

  if (typeof user === 'undefined') {
    throw new ValidationException({
      email: ['Email does not exist']
    })
  }

  const errors = validate({ email, password }, Auth.loginRules)
  if (errors) {
    throw new ValidationException(errors)
  }

  const isPasswordValid = Auth.verifyPassword(password, user.password)
  if (isPasswordValid) {
    const token = Auth.getToken(user.id, user.isAdmin)

    return { token }
  }

  throw new ValidationException({
    password: ['Password is invalid']
  })
}

module.exports = authLogin
