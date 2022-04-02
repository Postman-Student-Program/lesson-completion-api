import axios from 'axios'

class PostmanDal {
  constructor() {}

  /** returns null if no Postman collectin found for url */
  getCollectionJson = async (
    jsonUrl: string
  ): Promise<PostmanCollection | null> => {
    try {
      const res = await axios.get(jsonUrl)
      const data = res.data
      return data
    } catch (e: any) {
      if (e.response.status === 404) {
        return null
      }
      throw e
    }
  }
}

export default PostmanDal
