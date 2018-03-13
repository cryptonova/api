function response (body, statusCode) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
      // 'Cache-Control': 'max-age=300, public'
    },
    body: JSON.stringify(body)
  }
}

function ok (body) {
  return response(body, 200)
}

function errors (errors, message = 'Validation failed') {
  return response({ message, errors }, 400)
}

function unauthorized (message = 'Unauthorized') {
  return response({ message }, 401)
}

function forbidden (message = 'Forbidden') {
  return response({ message }, 403)
}

function notFound (message = 'Not found') {
  return response({ message }, 404)
}

function fail (error) {
  if (error.name === 'ValidationException') {
    return this.errors(error.errors)
  }

  const statusCode = typeof error.statusCode === 'undefined' ? 500 : error.statusCode

  return response({ message: error.message, error }, statusCode)
}

function errorBag (errors) {
  return { errors }
}

module.exports = {
  ok,
  errors,
  fail,
  notFound,
  unauthorized,
  forbidden,
  errorBag
}
