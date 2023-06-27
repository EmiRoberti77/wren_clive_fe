declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POS_ENDPOINT_GET : string
      MODE_ENV: 'development' | 'production'
    }
  }
}

export {}