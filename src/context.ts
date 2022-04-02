import SubmitService from './services/SubmitService'
import SkilljarDal from './services/dals/SkilljarDal'
import config from './config'
import TestRegistrationsDal from './services/dals/TestRegistrationsDal'
import knex from './db/knex'
import PostmanDal from './services/dals/PostmanDal'

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

const services = {
  submitService
}

const context = { dals, services }

export default context
