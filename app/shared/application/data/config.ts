require('dotenv-safe').config()

export type configType = {
  application: {
    port: number
  }
  mongo: {
    user: string
    password: string
  }
  jwt: {
    secret: string,
    time: string,
    timeToTest: number
  }
}

export const config: configType = {
  application: {
    port: Number(process.env.PORT)
  },
  mongo: {
    user: process.env.MONGO_USER as string,
    password: process.env.MONGO_PASSWORD as string
  },
  jwt: {
    secret: process.env.SECRET as string,
    time: process.env.TIME as string,
    timeToTest: Number(process.env.TIME_TO_TEST) 
  }
}