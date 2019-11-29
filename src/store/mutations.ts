import * as types from './mutations-types';

const mutations = {
  [types.SET_APPCONFIG_MUTATION](state: any, payload: any) {
    state.appConfig = payload;
  },
};

export default mutations;
