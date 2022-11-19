import https from 'https'
import http from 'http'

const getCollectionUrlStatusCode = (collectionUrl: string): Promise<number> => {
  // use http library for http urls
  if (collectionUrl.match(/^http:\/\//i)) {
    return new Promise((resolve, _reject) => {
      const req = http.get(collectionUrl, (res) => {
        resolve(res.statusCode as number)
        req.on('error', (err) => {
          console.log('Error resolving collection URL:', err)
          resolve(500)
        })
        req.end()
      })
    })
  } else {
    // otherwise use https library
    return new Promise((resolve, _reject) => {
      const req = https.get(collectionUrl, (res) => {
        resolve(res.statusCode as number)
        req.on('error', (err) => {
          console.log('Error resolving collection URL:', err)
          resolve(500)
        })
        req.end()
      })
    })
  }
}

export default getCollectionUrlStatusCode
