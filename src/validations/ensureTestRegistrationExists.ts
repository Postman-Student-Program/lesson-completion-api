import errors from '../errors'
import TestRegistrationsDal from '../services/dals/TestRegistrationsDal'

const { NotFoundError } = errors

/** Returns a book if it exists, otherwise throws 404 */
const ensureTestRegistrationExists = async (
  params: GetTestRegistrationParams,
  testRegistrationsDal: TestRegistrationsDal
): Promise<TestRegistration> => {
  const book = await testRegistrationsDal.getTestRegistration(params)
  if (!book) {
    throw new NotFoundError(
      `Test registration with ${JSON.stringify(params).replace(
        /"/g,
        "'"
      )} not found`
    )
  }
  return book
}

export default ensureTestRegistrationExists
