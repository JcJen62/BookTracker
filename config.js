import { config } from 'dotenv'
config()
export const mongoUri = process.env.MONGO_URI
export const port = process.env.PORT