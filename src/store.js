import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';


export default function Store(events) {
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
            editEvent(state, event) {
                const index = state.events.findIndex(ev => ev.id === event.id);
                if (index !== -1) state.events[index] = event;
            },
            deleteEvent(state, eventId) {
                const index = state.events.findIndex(ev => ev.id === eventId);
                if (index !== -1) state.events.splice(index, 1);
            }
        },
        actions: {
            addEvent(context, event) {
                return new Promise((resolve, reject) => {
                    Axios.post('/events', event).then(response => {
                        event.id = response.data.id;
                        context.commit('addEvent', event);
                        resolve();
                    }).catch(reject);
                });
            },
            editEvent(context, event) {
                return new Promise((resolve, reject) => {
                    Axios.put(`/events/${event.id}`, event).then(() => {
                        context.commit('editEvent', event);
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