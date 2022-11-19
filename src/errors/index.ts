import config from '../config'

/** No need for call stack, so not extending Error class */

class CustomError extends Error {
  constructor(msg: string) {
    super(msg)
    if (config.nodeEnv !== 'development') {
      this.stack = undefined // nullify call stack in prod because it pollutes logs
    }
  }
}

// -------- Custom errors --------/

class UnauthorizedError extends CustomError {
  statusCode
  constructor(msg?: string) {
    const defaultMsg = `Invalid or missing credentials.`
    super(msg || defaultMsg)
    this.statusCode = 401
  }
}

class NotFoundError extends CustomError {
  statusCode
  constructor(msg?: string) {
    const defaultMsg = `Not found`
    super(msg || defaultMsg)
    this.statusCode = 404
  }
}

class InternalError extends CustomError {
  statusCode
  constructor(msg?: string) {
    const defaultMsg = `Internal error... something went wrong`
    super(msg || defaultMsg)
    this.statusCode = 500
  }
}

class PostmanTestsFailedError extends CustomError {
  statusCode
  errors
  constructor(errors: TestFailure[]) {
    const defaultMsg = `Your collection failed one or more Postman tests. See the errors array for details.`
    super(defaultMsg)
    this.statusCode = 424
    this.errors = errors
  }
}

class UniqueKeyViolationError extends CustomError {
  statusCode
  constructor(msg?: string) {
    const defaultMsg = `Violates unique key constraint.`
    super(msg || defaultMsg)
    this.statusCode = 409
  }
}

class TooManyRequestsError extends CustomError {
  statusCode
  constructor(msg?: string) {
    const defaultMsg = `This API is taking in too many requests at the moment. Please try again in five minutes`
    super(msg || defaultMsg)
    this.statusCode = 429
  }
}

class MissingCollectionIdOrUrlError extends CustomError {
  statusCode
  constructor(msg?: string) {
    const defaultMsg = `Must include one of these properties in the request body: 'collectionId' or 'postmanCollectionJsonUrl'. Note that your collection must be in a public workspace to use 'collectionId'.`
    super(msg || defaultMsg)
    this.statusCode = 400
  }
}

const errors = {
  UnauthorizedError,
  NotFoundError,
  InternalError,
  PostmanTestsFailedError,
  UniqueKeyViolationError,
  MissingCollectionIdOrUrlError,
  TooManyRequestsError
}

export default errors
