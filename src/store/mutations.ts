import * as types from './mutations-types';
import { reqAbout } from '@/api/api';

const mutations = {
  [types.SET_APPCONFIG_MUTATION](state: any, payload: any) {
    state.appConfig = payload;
  },
  [types.SET_ABOUT_MUTATION](state: any, payload: any) {
    reqAbout({}).then((result: any) => {
      state.about = result.data;
    });
  },
};

export default mutations;
