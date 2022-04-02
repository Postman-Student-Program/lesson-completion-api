import { FastifyRequest, FastifyReply } from 'fastify'

import context from './context'

const { submitService, testRegistrationsService } = context.services

// fastify-openapi-glue library expects the method names in the Service class to match the `operationId` from each path in your schema. That's how it will know the request method (GET/POST, etc) and the schema for the request/response of each route
class RouteHandler {
  constructor() {}

  healthcheck = (_req: FastifyRequest, res: FastifyReply) => {
    return res.send({ message: 'ok' })
  }

  submit = async (req: FastifyRequest, res: FastifyReply) => {
    const { status, message } = await submitService.submit(
      req.body as SubmitServiceInput
    )
    return res.send({ status, message })
  }

  /** Below are admin only */
  getTestRegistrations = async (req: FastifyRequest, res: FastifyReply) => {
    const testRegistrations =
      await testRegistrationsService.getTestRegistrations(
        req.query as GetTestRegistrationsParams
      )
    console.log({ testRegistrations })
    return res.send(testRegistrations)
  }
}

export default RouteHandler
