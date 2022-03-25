import SkilljarDal from './dals/SkilljarDal'

class SubmitService {
  skillJarDal: SkilljarDal
  constructor(skilljarDal: SkilljarDal) {
    this.skillJarDal = skilljarDal
  }

  submit = async (input: SubmitServiceInput): Promise<SubmitResponse> => {
    const { email } = input
    const id = await this.skillJarDal.getUserIdByEmail(email)
    return { status: id }
  }
}

export default SubmitService
