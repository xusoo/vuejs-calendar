import Vue from 'vue';

import App from './components/App.vue';
import Moment from './plugins/moment';
import Vuex from 'vuex';
import Store from './store';

Vue.use(Moment);
Vue.use(Vuex);

export default function (initialState) {
    return new Vue({
        components: { App },
        store: new Store(initialState.events),
        render(create) {
            return create('div', { attrs: { id: 'app' } }, [create('app')]);
        }
    });
}