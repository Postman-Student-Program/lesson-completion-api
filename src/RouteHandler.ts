import { FastifyRequest, FastifyReply } from 'fastify'

import context from './context'
import { getTestRegistrationParamsFromId } from './utils'
import requireApiKey from './validations/requireApiKey'

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
    requireApiKey(req)
    const testRegistrations =
      await testRegistrationsService.getTestRegistrations(
        req.query as GetTestRegistrationsParams
      )
    return res.send(testRegistrations)
  }

  createTestRegistration = async (req: FastifyRequest, res: FastifyReply) => {
    requireApiKey(req)
    const newTestRegistration =
      await testRegistrationsService.createTestRegistration(
        req.body as CreateTestRegistrationInput
      )
    return res.status(201).send(newTestRegistration)
  }

  getTestRegistration = async (req: FastifyRequest, res: FastifyReply) => {
    requireApiKey(req)
    const rawParams = req.params as StringIdParams
    const params = getTestRegistrationParamsFromId(rawParams.id)
    const testRegistration = await testRegistrationsService.getTestRegistration(
      params
    )
    return res.send(testRegistration)
  }

  updateTestRegistration = async (req: FastifyRequest, res: FastifyReply) => {
    requireApiKey(req)
    const rawParams = req.params as StringIdParams
    const params = getTestRegistrationParamsFromId(rawParams.id)
    const input = req.body as UpdateTestRegistrationInput
    const testRegistration =
      await testRegistrationsService.updateTestRegistration(params, input)
    return res.send(testRegistration)
  }

  deleteTestRegistration = async (req: FastifyRequest, res: FastifyReply) => {
    requireApiKey(req)
    const rawParams = req.params as StringIdParams
    const params = getTestRegistrationParamsFromId(rawParams.id)
    await testRegistrationsService.deleteTestRegistration(params)
    return res.code(204).send()
  }
}

export default RouteHandler
