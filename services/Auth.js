const jwt = require('jsonwebtoken')
const securePassword = require('secure-password')

class Auth {
  /**
   * Auth constructor.
   *
   * @param event
   */
  constructor (event) {
    this.event = event
  }

  /**
   * Get payload from token.
   *
   * @returns {object}
   */
  get getPayLoad () {
    const token = this.event.authorizationToken.replace('Bearer ', '')

    return jwt.verify(token, process.env.JWT_SECRET)
  }

  /**
   * Get token.
   *
   * @param userId {integer}
   * @returns {string}
   */
  static getToken (userId, isAdmin) {
    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1w' })
  }

  /**
   * Verify password.
   *
   * @param password {string}
   * @param passwordHash {string}
   * @returns {boolean}
   */
  static verifyPassword (password, passwordHash) {
    return securePassword().verifySync(Buffer.from(password), Buffer.from(passwordHash)) === securePassword.VALID
  }

  /**
   * Get password hash.
   *
   * @param password {string}
   * @returns {string}
   */
  static getPasswordHash (password) {
    return securePassword().hashSync(Buffer.from(password))
  }

  /**
   * Login validation rules.
   *
   * @returns {object}
   */
  static get loginRules () {
    return {
      email: {
        presence: true
      },
      password: {
        presence: true
      }
    }
  }

  /**
   * Register validation rules.
   *
   * @returns {object}
   */
  static get registerRules () {
    return {
      email: {
        presence: true,
        email: true
      },
      password: {
        presence: true,
        length: {
          minimum: 6
        }
      },
      passwordConfirmation: {
        presence: true,
        equality: 'password'
      }
    }
  }
}

module.exports = Auth
