import rmNewlines from '../../utils/rmNewLines'
import buildGetRegistrationsAndWhere from '../utils/buildGetRegistrationsAndWhere'
import errors from '../../errors'

const { UniqueKeyViolationError } = errors
class TestRegistrationsDal {
  db: KnexDb
  constructor(db: KnexDb) {
    this.db = db
  }

  getTestRegistration = async (
    params: TestRegistrationIdParams
  ): Promise<TestRegistration> => {
    return this.db('test_registrations').select().where(params).first() // return one
  }

  getTestRegistrations = async (
    params: GetTestRegistrationsResolvedParams
  ): Promise<TestRegistration[]> => {
    const query = rmNewlines(`
    SELECT * FROM "test_registrations"
    WHERE "publishedCourseId" IS NOT NULL
    ${buildGetRegistrationsAndWhere(params as GetTestRegistrationsParams)}
    ORDER BY "createdAt" DESC;
    `)

    return this.db.raw(query).then((r: any) => r.rows)
  }

  createTestRegistration = async (
    input: CreateTestRegistrationInput
  ): Promise<TestRegistration> => {
    return this.db('test_registrations')
      .insert(input)
      .returning('*')
      .then((r: TestRegistration[]) => r[0]) // return one
      .catch((e: any) => {
        if (e.code === '23505' /* unique key constraint error code */) {
          const msg = `Test registration already exists for { publishedCourseId: '${input.publishedCourseId}', lessonId: '${input.lessonId}' }. Please either edit the existing record, or delete it and create a new one.`
          throw new UniqueKeyViolationError(msg)
        } else {
          throw e
        }
      })
  }

  updateTestRegistration = async (
    params: TestRegistrationIdParams,
    input: UpdateTestRegistrationInput
  ) => {
    return this.db('test_registrations')
      .where(params)
      .update({ ...input, updatedAt: new Date().toISOString() })
      .returning('*')
      .then((r: TestRegistration[]) => r[0]) // return one
  }

  deleteTestRegistration = async (params: TestRegistrationIdParams) => {
    return this.db('test_registrations')
      .del()
      .where(params)
      .then((_r: any) => {
        return
      })
  }
}

export default TestRegistrationsDal
