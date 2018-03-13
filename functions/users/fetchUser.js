const User = require('../../models/User')

/**
 * Fetch user by id.
 *
 * @param id
 * @returns {object}
 */
async function fetchUser (id) {
  const user = await User.findById(id, ['id', 'email', 'isAdmin'])

  return {
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin
  }
}

module.exports = fetchUser
