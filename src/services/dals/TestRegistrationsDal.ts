import rmNewlines from '../../utils/rmNewLines'
import buildGetRegistrationsAndWhere from '../utils/buildGetRegistrationsAndWhere'

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
}

export default TestRegistrationsDal
