import SkilljarDal from './dals/SkilljarDal'
import TestRegistrationsDal from './dals/TestRegistrationsDal'
import { testCollection } from './utils/testCollection'
import { getCollectionUrlStatusCode } from '../utils'
import errors from '../errors'
import config from '../config'

const {
  NotFoundError,
  PostmanTestsFailedError,
  MissingCollectionIdOrUrlError,
  InternalError,
  TooManyRequestsError
} = errors

class SubmitService {
  skillJarDal: SkilljarDal
  testRegistrationsDal: TestRegistrationsDal
  constructor(
    skilljarDal: SkilljarDal,
    testRegistrationsDal: TestRegistrationsDal
  ) {
    this.skillJarDal = skilljarDal
    this.testRegistrationsDal = testRegistrationsDal
  }

  submit = async ({
    email,
    publishedCourseId,
    lessonId,
    postmanCollectionJsonUrl,
    collectionId
  }: SubmitServiceInput): Promise<SubmitResponse> => {
    /** Get user id */
    const userId = await this.skillJarDal.getUserIdByEmail(email)

    /** check whether this lesson has a postman test regsitered to it */
    const registeredTest = await this.testRegistrationsDal.getTestRegistration({
      publishedCourseId,
      lessonId
    })

    /** If a Postman test is registered for this course + lesson, make sure the submission passes the tests */
    if (registeredTest) {
      // validate that collectionId or postmanCollectionJsonUrl is present
      if (!collectionId && !postmanCollectionJsonUrl) {
        throw new MissingCollectionIdOrUrlError()
      }

      let submissionUrl = postmanCollectionJsonUrl
      if (!!collectionId) {
        submissionUrl = `https://api.getpostman.com/collections/${collectionId}?apikey=${config.pmApiKey}`
      }

      // check validity of URL
      const collectionUrlStatusCode = await getCollectionUrlStatusCode(
        submissionUrl
      )
      console.log({ collectionUrlStatusCode })
      console.log({ submissionUrl })
      if (collectionUrlStatusCode < 200 || collectionUrlStatusCode > 299) {
        if (collectionUrlStatusCode === 429) {
          throw new TooManyRequestsError()
        } else if (
          collectionUrlStatusCode > 399 &&
          collectionUrlStatusCode < 499
        ) {
          let errorMsg = ''
          if (!!collectionId) {
            errorMsg = `No public collection with ID '${collectionId}' found. Ensure your collection is in a public workspace and you have copied the collection ID correctly.`
          } else {
            errorMsg = `Could not resolve collection JSON URL: '${postmanCollectionJsonUrl}'`
          }
          throw new NotFoundError(errorMsg)
        } else if (
          collectionUrlStatusCode > 499 ||
          collectionUrlStatusCode < 200
        ) {
          throw new InternalError(
            'Error ocurred when trying to fetch your collection'
          )
        }
      }

      // run test
      const testResults = await testCollection({
        testCollectionUrl: registeredTest.postmanTestCollectionJsonUrl,
        submissionCollectionUrl: submissionUrl
      })

      console.log({ testResults })

      /** Return errors to user if tests fail */
      if (!testResults.allTestsPassed) {
        throw new PostmanTestsFailedError(testResults.failures as TestFailure[])
      }
    }

    const skilljarRes = await this.skillJarDal.completeLesson({
      userId,
      publishedCourseId,
      lessonId
    })

    /** Lesson succesfully updated as complete in Skilljar. */
    const message = `Congratulations! The lesson '${skilljarRes.lesson.title}' is now marked as complete.`
    return { status: 'ok', message }
  }
}

export default SubmitService
