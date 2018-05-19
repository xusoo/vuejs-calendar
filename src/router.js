import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default function createRouter(store) {
	const router = new VueRouter({ mode: 'history' });

	const handleRoute = (route) => {
		if (!route.query['month'] || !route.query['year']) {
			store.commit('goToToday');
			return;
		}

		const month = parseInt(route.query['month']) - 1;
		const year = parseInt(route.query['year']);

		if (!Vue.prototype.$moment([year, month]).isValid()) {
			router.push('/');
			return;
		}
		store.commit('changeDate', { month, year });
	};

	router.onReady(() => handleRoute(router.currentRoute));
	router.afterEach(to => handleRoute(to));

	return router;
}