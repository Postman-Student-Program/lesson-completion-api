/** Filters an object for only the passed keys */
const filterObj = <T extends object>(obj: T, keys: string[]): T => {
  const filteredObj: { [key: string]: any } = {}
  Object.entries(obj).forEach(([k, v]) => {
    if (keys.includes(k)) {
      filteredObj[k] = v
    }
  })
  return filteredObj as T
}

export default filterObj
