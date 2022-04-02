interface SkilljarDalConstructorArgs {
  apiKey: string
}

interface StringIdParams {
  id: string
}

interface SubmitServiceInput {
  email: string
  postmanCollectionJsonUrl: string
  publishedCourseId: string
  lessonId: string
}

interface SubmitResponse {
  status: string
  message: string
  errors?: any[]
}

interface TestRegistrationIdParams {
  publishedCourseId: string
  lessonId: string
}

interface GetTestRegistrationsParams {
  name?: string
  publishedCourseId?: string
}

type GetTestRegistrationsResolvedParams =
  | { name: string }
  | { publishedCourseId: string }
  | {}
interface TestRegistration {
  publishedCourseId: string
  lessonId: string
  postmanTestCollectionJsonUrl: string
  name: string
  updatedAt: string
  createdAt: string
}

interface CreateTestRegistrationInput {
  name: string
  postmanTestCollectionJsonUrl: string
  publishedCourseId: string
  lessonId: string
}

interface UpdateTestRegistrationInput {
  name?: string
  postmanTestCollectionJsonUrl?: string
  publishedCourseId?: string
  lessonId?: string
}
interface TestCollectionArgs {
  testCollectionUrl: string
  submissionCollectionUrl: string
}
interface TestCollectionResult {
  allTestsPassed: boolean
  failures?: TestFailure[]
}

interface TestFailure {
  test: string
  message: string
}

interface SkilljarDalCompleteLessonArgs {
  userId: string
  publishedCourseId: string
  lessonId: string
}

interface SkilljarDalCompleteLessonRepsonse {
  lesson: {
    id: string
    title: string
  }
  lesson_progress: {
    view_count: number
    last_viewed_on: string
    completed_at: string
    success_status: any
    score: any
    max_score: any
    custom_data: any
    lesson_progress_id: string
  }
}

/** start Postman Collection. This doesn't feel exhaustive... */
interface PostmanCollection {
  info: Info
  item: PostmanCollectionItem[]
  auth: PostmanCollectionAuth
  event: PostmanCollectionEvent[]
  variable: Variable[]
}

interface PostmanCollectionAuth {
  type: string
  apikey: ApikeyElement
}

interface ApikeyElement {
  key: string
  value: string
}

interface PostmanCollectionEvent {
  listen: string
  script: Script
}

interface Info {
  _postman_id: string
  name: string
  description: string
  schema: string
}

interface PostmanCollectionItem {
  name: string
  item: ItemItem[]
  id: string
  auth?: ItemAuth
  event?: PostmanCollectionEvent[]
}

interface ItemAuth {
  type: string
  apikey: ApikeyElement
}

interface Script {
  id: string
  type: string
  exec: string[]
}
/** end Postman Collection */

type KnexDb = Knex<any, unknown[]>
