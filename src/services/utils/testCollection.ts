import config from '../../config'
import newman, { NewmanRunSummary } from 'newman'

export const testCollection = async ({
  testCollectionUrl,
  submissionCollectionUrl
}: TestCollectionArgs): Promise<TestCollectionResult> => {
  return new Promise((resolve, reject) => {
    newman
      .run({
        collection: testCollectionUrl, // the url of the Postman collection that contains the server-side tests
        envVar: [
          {
            key: 'COLLECTION_JSON_URL',
            value: submissionCollectionUrl
          }
        ] as any
      })
      .on('done', (err, summary: NewmanRunSummary) => {
        if (err) {
          reject(err)
        } else {
          if (summary.run.failures.length) {
            const failures = summary.run.failures.map(({ error }) => {
              return {
                test: error.test,
                message: error.message
              }
            })
            resolve({
              allTestsPassed: false,
              failures
            })
          } else {
            resolve({ allTestsPassed: true })
          }
        }
      })
  })
}
