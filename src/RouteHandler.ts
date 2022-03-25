import { FastifyRequest, FastifyReply } from 'fastify'

import config from './config'
import context from './context'

const { submitService } = context.services

// fastify-openapi-glue library expects the method names in the Service class to match the `operationId` from each path in your schema. That's how it will know the request method (GET/POST, etc) and the schema for the request/response of each route
class RouteHandler {
  constructor() {}

  healthcheck = (_req: FastifyRequest, res: FastifyReply) => {
    return res.send({ message: 'ok' })
  }
  submit = async (req: FastifyRequest, res: FastifyReply) => {
    const resp = await submitService.submit(req.body as SubmitServiceInput)
    return res.send({ status: resp.status })
  }
}

export default RouteHandler
