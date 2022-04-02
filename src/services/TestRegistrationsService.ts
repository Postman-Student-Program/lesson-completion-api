import TestRegistrationsDal from './dals/TestRegistrationsDal'

class TestRegistrationsService {
  testRegistrationsDal: TestRegistrationsDal
  constructor(testRegistrationsDal: TestRegistrationsDal) {
    this.testRegistrationsDal = testRegistrationsDal
  }

  getTestRegistrations = async ({
    name,
    publishedCourseId
  }: GetTestRegistrationsParams): Promise<TestRegistration[]> => {
    /** 'name' takes precendence over 'publishedCourseId' */
    let resolvedParams: GetTestRegistrationsResolvedParams = {}
    if (name) {
      resolvedParams = { name }
    } else if (publishedCourseId) {
      resolvedParams = { publishedCourseId }
    }
    return this.testRegistrationsDal.getTestRegistrations(resolvedParams)
  }
}

export default TestRegistrationsService
