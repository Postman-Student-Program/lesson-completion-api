/** publishedCourseId and lessonId are guaranteed to be separated by colon in 'id' via request validation */
const getTestRegistrationParamsFromId = (id: string) => {
  const parsed = id.split(':')
  const publishedCourseId = parsed[0]
  const lessonId = parsed[1]
  return { publishedCourseId, lessonId }
}

export default getTestRegistrationParamsFromId
