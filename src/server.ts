import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import openapiGlue from 'fastify-openapi-glue'
import RouteHandler from './RouteHandler'

const glueOptions = {
  specification: `${__dirname}/schema.yaml`,
  service: new RouteHandler(),
  ajvOptions: {
    allErrors: true
  }
}

const fastify = Fastify({ logger: true })

fastify.register(openapiGlue, glueOptions)

/** Shim for catching validation errors and returning 400 */
/** For some reason fastify isn't handling these */
/** Debug someday.... */
fastify.setErrorHandler(function (
  err: any,
  _req: FastifyRequest,
  res: FastifyReply
) {
  if (err.validation && err.validation.length) {
    err.errors = err.validation
    err.statusCode = 400
  }
  res.status(err.statusCode || 500).send(err)
})

const PORT = process.env.PORT || 4000

fastify.listen(PORT, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
