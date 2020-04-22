export interface AppConfig {
  appSafeAreaHeader: number;
  appSafeAreaFooter: number;
}
export interface About {
  name: string;
  local: string;
  likes: string[];
}

export interface State {
  appConfig: AppConfig;
  about: About;
}

const state: State = {
  // 系统常用配置文件
  appConfig: {
    appSafeAreaHeader: 0, //app下头部高度
    appSafeAreaFooter: 0, //app下底部高度
  },
  // 关于我请求
  about: {
    name: '',
    local: '',
    likes: [],
  },
};

export default state;
