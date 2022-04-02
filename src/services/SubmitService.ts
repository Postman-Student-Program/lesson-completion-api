import PostmanDal from './dals/PostmanDal'
import SkilljarDal from './dals/SkilljarDal'
import TestRegistrationsDal from './dals/TestRegistrationsDal'
import { testCollection } from './utils/testCollection'
import errors from '../errors'

const { NotFoundError, PostmanTestsFailedError } = errors

class SubmitService {
  skillJarDal: SkilljarDal
  testRegistrationsDal: TestRegistrationsDal
  postmanDal: PostmanDal
  constructor(
    skilljarDal: SkilljarDal,
    testRegistrationsDal: TestRegistrationsDal,
    postmanDal: PostmanDal
  ) {
    this.skillJarDal = skilljarDal
    this.testRegistrationsDal = testRegistrationsDal
    this.postmanDal = postmanDal
  }

  submit = async ({
    email,
    publishedCourseId,
    lessonId,
    postmanCollectionJsonUrl
  }: SubmitServiceInput): Promise<SubmitResponse> => {
    /** Get user id */
    const userId = await this.skillJarDal.getUserIdByEmail(email)

    const submittedCol = await this.postmanDal.getCollectionJson(
      postmanCollectionJsonUrl
    )

    /** If submitted collection url does not exist, throw 404 */
    if (!submittedCol) {
      throw new NotFoundError(
        `No Postman collection found for url: ${postmanCollectionJsonUrl}. Check that you are submitting a valid JSON link to your collection.`
      )
    }

    /** check whether this lesson has a postman test regsitered to it */
    const registeredTest = await this.testRegistrationsDal.getTestRegistration({
      publishedCourseId,
      lessonId
    })

    /** If a Postman test is registered for this course + lesson, make sure the submission passes the tests */
    if (registeredTest) {
      const testResults = await testCollection({
        testCollectionUrl: registeredTest.postmanTestCollectionJsonUrl,
        submissionCollectionUrl: postmanCollectionJsonUrl
      })

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
