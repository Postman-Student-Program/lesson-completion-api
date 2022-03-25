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
  status
  constructor(msg?: string) {
    const defaultMsg = `Invalid or missing credentials.`
    super(msg || defaultMsg)
    this.status = 401
  }
}

class NotFoundError extends CustomError {
  status
  constructor(msg?: string) {
    const defaultMsg = `Not found`
    super(msg || defaultMsg)
    this.status = 404
  }
}

class InternalError extends CustomError {
  status
  constructor(msg?: string) {
    const defaultMsg = `Internal error... something went wrong`
    super(msg || defaultMsg)
    this.status = 500
  }
}

const errors = {
  UnauthorizedError,
  NotFoundError,
  InternalError
}

export default errors
