interface ImportMetaEnv {
  // 应用标题
  readonly RS_APP_TITLE: string;
  // 应用 API baseURL
  readonly RS_APP_API_BASE_URL: string;

  // 当前开发环境
  readonly DEV: boolean;
  // 当前生产环境
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
