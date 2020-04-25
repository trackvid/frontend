import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import {state} from "@/store/state/state";
import {RootState} from "@/store/state/RootState";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state
};

export default new Vuex.Store<RootState>(store);

