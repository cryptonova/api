function NotFoundException (message = 'Not found') {
  this.name = 'NotFoundException'
  this.message = message
  this.statusCode = 404
}

function ValidationException (errors, message = 'Validation failed') {
  this.name = 'ValidationException'
  this.message = message
  this.errors = errors
  this.statusCode = 400
}

function BadRequestException (errors, message = 'Bad request') {
  this.name = 'BadRequestException'
  this.message = message
  this.errors = errors
  this.statusCode = 400
}

module.exports = { NotFoundException, ValidationException, BadRequestException }
