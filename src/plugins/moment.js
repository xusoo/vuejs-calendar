import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
moment.locale('en-GB');

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$moment', {
            get() {
                return moment;
            }
        });
    }
}