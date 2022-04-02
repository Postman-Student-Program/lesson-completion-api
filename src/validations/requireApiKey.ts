import { FastifyRequest } from 'fastify'
import config from '../config'
import errors from '../errors'

const { UnauthorizedError } = errors

const requireApiKey = (req: FastifyRequest) => {
  const apiKey = req.headers[config.apiKeyKey]
  if (!apiKey || apiKey !== config.apiKeyVal) {
    throw new UnauthorizedError()
  }
}

export default requireApiKey
