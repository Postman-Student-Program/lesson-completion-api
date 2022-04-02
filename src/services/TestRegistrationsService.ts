import TestRegistrationsDal from './dals/TestRegistrationsDal'

class TestRegistrationsService {
  testRegistrationsDal: TestRegistrationsDal
  constructor(testRegistrationsDal: TestRegistrationsDal) {
    this.testRegistrationsDal = testRegistrationsDal
  }

  getTestRegistration() {
    //TODO
  }
}

export default TestRegistrationsService
