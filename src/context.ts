import SubmitService from './services/SubmitService'
import SkilljarDal from './services/dals/SkilljarDal'
import config from './config'

// Build Dals
const skilljarDal = new SkilljarDal({ apiKey: config.skilljarApiKey })

const dals = {
  skilljarDal
}

// Build Services
const submitService = new SubmitService(skilljarDal)

const services = {
  submitService
}

const context = { dals, services }

export default context
