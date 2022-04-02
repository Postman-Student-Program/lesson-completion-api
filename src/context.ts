import SubmitService from './services/SubmitService'
import SkilljarDal from './services/dals/SkilljarDal'
import config from './config'
import TestRegistrationsDal from './services/dals/TestRegistrationsDal'
import knex from './db/knex'
import PostmanDal from './services/dals/PostmanDal'
import TestRegistrationsService from './services/TestRegistrationsService'

// Build Dals
const skilljarDal = new SkilljarDal({ apiKey: config.skilljarApiKey })
const testRegistrationsDal = new TestRegistrationsDal(knex)
const postmanDal = new PostmanDal()

const dals = {
  skilljarDal,
  testRegistrationsDal,
  postmanDal
}

// Build Services
const submitService = new SubmitService(
  skilljarDal,
  testRegistrationsDal,
  postmanDal
)

const testRegistrationsService = new TestRegistrationsService(
  testRegistrationsDal
)

const services = {
  submitService,
  testRegistrationsService
}

const context = { dals, services }

export default context
