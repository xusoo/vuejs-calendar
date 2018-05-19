import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default function createStore({ events }) {
    const moment = Vue.prototype.$moment;

    return new Vuex.Store({
        state: {
            month: moment().month(),
            year: moment().year(),
            events: events.map((event) => {
                event.date = moment(event.date);
                return event;
            }),
            eventForm: {
                active: false,
                left: 0,
                top: 0,
                event: {}
            }
        },
        getters: {
            getEventsByDate: state => date => {
                return state.events.filter(event => event.date.isSame(date, 'day'));
            }
        },
        mutations: {
            goToToday(state) {
                state.month = moment().month();
                state.year = moment().year();
            },
            changeDate(state, { month, year }) {
                state.month = month;
                state.year = year;
            },
            openEventForm(state, { left, top, event }) {
                state.eventForm = { active: true, left, top, event };
            },
            closeEventForm(state) {
                state.eventForm.active = false;
            },
            addEvent(state, event) {
                state.events.push(event);
            },
            updateEvent(state, event) {
                const index = state.events.findIndex(ev => ev._id === event._id);
                if (index !== -1) state.events.splice(index, 1, event);
            },
            deleteEvent(state, eventId) {
                const index = state.events.findIndex(ev => ev._id === eventId);
                if (index !== -1) state.events.splice(index, 1);
            }
        },
        actions: {
            addEvent(context, event) {
                return new Promise((resolve, reject) => {
                    Axios.post('/events', event).then(response => {
                        event._id = response.data._id;
                        context.commit('addEvent', event);
                        resolve();
                    }).catch(reject);
                });
            },
            updateEvent(context, event) {
                return new Promise((resolve, reject) => {
                    Axios.put(`/events`, event).then(() => {
                        context.commit('updateEvent', event);
                        resolve();
                    }).catch(reject);
                });
            },
            deleteEvent(context, eventId) {
                return new Promise((resolve, reject) => {
                    Axios.delete(`/events/${eventId}`).then(() => {
                        context.commit('deleteEvent', eventId);
                        resolve();
                    }).catch(reject);
                });
            }
        }
    })
}