class TestRegistrationsDal {
  db: KnexDb
  constructor(db: KnexDb) {
    this.db = db
  }

  getTestRegistration = async (
    params: GetTestRegistrationParams
  ): Promise<TestRegistration> => {
    return this.db('test_registrations').select().where(params).first() // return one
  }
}

export default TestRegistrationsDal
