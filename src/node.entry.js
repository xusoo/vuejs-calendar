import { createApp } from './entry';

export default function (context) {
	const { app, router } = createApp({ events: context.events });
	router.push(context.url);
	return app;
}