import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../', '.env') })

/** List any required env vars here */
const required: string[] = ['SKILLJAR_API_KEY']
const requiredForProd: string[] = ['PROD_DATABASE_URL']

const validateEnvVars = () => {
  let missing: string[] = []
  let missingForProd: string[] = []
  required.forEach((v) => {
    if (!process.env[v]) {
      missing.push(v)
    }
  })
  if (missing.length) {
    console.error(`[ERROR]: Missing critical env vars: ${missing.join(', ')}`)
    process.exit(1)
  }
  if (process.env.NODE_ENV === 'production') {
    requiredForProd.forEach((v) => {
      if (!process.env[v]) {
        missingForProd.push(v)
      }
    })
    if (missingForProd.length) {
      console.error(
        `[ERROR]: Missing critical prod env vars: ${missingForProd.join(', ')}`
      )
      process.exit(1)
    }
  }
}

validateEnvVars()

const config: { [key: string]: string } = {
  /** Name of variable in Postman request URL of test Postman collection ('{{COLLECTION_JSON_URL}}'). Do not change this. */
  submissionUrlEnvVarName: 'COLLECTION_JSON_URL',
  /** Production database URL */
  prodDatabaseUrl: process.env.PROD_DATABASE_URL as string, // listed as required above to ensure string exists
  skilljarApiKey: process.env.SKILLJAR_API_KEY as string, // listed as requiredForProd above to ensure string exists
  nodeEnv: process.env.NODE_ENV || 'development'
}

export default config
