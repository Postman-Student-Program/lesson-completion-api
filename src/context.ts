import SubmitService from './services/SubmitService'
import SkilljarDal from './services/dals/SkilljarDal'
import config from './config'
import TestRegistrationsDal from './services/dals/TestRegistrationsDal'
import knex from './db/knex'
import TestRegistrationsService from './services/TestRegistrationsService'

// Build Dals
const skilljarDal = new SkilljarDal({ apiKey: config.skilljarApiKey })
const testRegistrationsDal = new TestRegistrationsDal(knex)

const dals = {
  skilljarDal,
  testRegistrationsDal
}

// Build Services
const submitService = new SubmitService(skilljarDal, testRegistrationsDal)

const testRegistrationsService = new TestRegistrationsService(
  testRegistrationsDal
)

const services = {
  submitService,
  testRegistrationsService
}

const context = { dals, services }

export default context
