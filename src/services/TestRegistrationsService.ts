import { filterObj } from '../utils'
import TestRegistrationsDal from './dals/TestRegistrationsDal'

class TestRegistrationsService {
  testRegistrationsDal: TestRegistrationsDal
  constructor(testRegistrationsDal: TestRegistrationsDal) {
    this.testRegistrationsDal = testRegistrationsDal
  }

  getTestRegistrations = async (
    params: GetTestRegistrationsParams
  ): Promise<TestRegistration[]> => {
    return this.testRegistrationsDal.getTestRegistrations(params)
  }

  createTestRegistration = async (
    input: CreateTestRegistrationInput
  ): Promise<TestRegistration> => {
    const filteredInput = filterObj(input, [
      'name',
      'publishedCourseId',
      'lessonId',
      'postmanTestCollectionJsonUrl'
    ])

    return this.testRegistrationsDal.createTestRegistration(filteredInput)
  }
}

export default TestRegistrationsService
