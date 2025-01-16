declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      GOOGLE_WEB_CLIENT_ID: string;
    }
  }
}

export {};
