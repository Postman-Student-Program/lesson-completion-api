interface SkilljarDalConstructorArgs {
  apiKey: string
}

interface SubmitServiceInput {
  email: string
  postman_collection_json_url: string
  published_course_id: string
  lesson_id: string
}

interface SubmitResponse {
  status: string
  errors?: any[]
}
