import axios, { AxiosInstance } from 'axios'
import { b64 } from '../../utils'
import errors from '../../errors'

const { InternalError, NotFoundError } = errors

class SkilljarDal {
  apiKey: string
  sjApi: AxiosInstance

  constructor({ apiKey }: SkilljarDalConstructorArgs) {
    this.apiKey = apiKey

    /** Initialize Skilljar API requester */
    const sjApi = axios.create({
      baseURL: 'https://api.skilljar.com/v1',
      headers: { Authorization: `Basic ${b64(this.apiKey)}` }
    })
    this.sjApi = sjApi
  }

  getUserIdByEmail = async (email: string): Promise<string> => {
    try {
      const path = `/users?email=${email}`
      const res = await this.sjApi.get(path)
      if (!res.data) {
        throw new InternalError()
      }
      if (!res.data.results.length) {
        throw new NotFoundError(`No user registered with email '${email}'`)
      }
      return res.data.results[0].user.id
    } catch (e) {
      throw e
    }
  }
}

export default SkilljarDal
