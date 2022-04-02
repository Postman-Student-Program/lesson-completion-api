import { filterObj } from '../utils'
import ensureTestRegistrationExists from '../validations/ensureTestRegistrationExists'
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

  getTestRegistration = async (
    params: TestRegistrationIdParams
  ): Promise<TestRegistration> => {
    const testRegistration = await ensureTestRegistrationExists(
      params,
      this.testRegistrationsDal
    )
    return testRegistration
  }

  updateTestRegistration = async (
    params: TestRegistrationIdParams,
    input: UpdateTestRegistrationInput
  ) => {
    // TODO: AUTH
    const testRegistration = await ensureTestRegistrationExists(
      params,
      this.testRegistrationsDal
    )
    const filteredInput = filterObj(input, [
      'name',
      'publishedCourseId',
      'lessonId',
      'postmanTestCollectionJsonUrl'
    ])
    return this.testRegistrationsDal.updateTestRegistration(
      params,
      filteredInput
    )
  }
}

export default TestRegistrationsService
