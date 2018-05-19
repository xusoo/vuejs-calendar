import Vue from 'vue';

import App from './components/App.vue';
import Moment from './plugins/moment';
import Vodal from 'vodal';
import createRouter from "./router";
import createStore from "./store";

Vue.use(Moment);
Vue.component('Vodal', Vodal);

export function createApp (initialState) {

	const store = createStore(initialState);
	const router = createRouter(store);

	const app = new Vue({
		components: { App },
		store,
		router,
		render(create) {
			return create('div', { attrs: { id: 'app' } }, [create('app')]);
		}
	});

	return { app, router };
}