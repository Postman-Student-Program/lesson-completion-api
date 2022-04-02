const buildGetRegistrationsAndWhere = (params: GetTestRegistrationsParams) => {
  const { name, publishedCourseId } = params
  if (!!name) {
    const nameLower = name.toLowerCase()
    return `AND LOWER(name) LIKE '%${nameLower}%' `
  }
  if (publishedCourseId) {
    return `AND "publishedCourseId" = '${publishedCourseId}'`
  }
  return ``
}

export default buildGetRegistrationsAndWhere
