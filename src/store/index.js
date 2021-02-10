import { createStore } from "vuex";

export default createStore({
  state: {
    searchVal: "",
  },
  mutations: {
    changeSearchValue(state, val) {
      state.searchVal = val;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getSearchVal(state) {
      return state.searchVal;
    },
  },
});
