import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';


export default function Store(events) {
    const moment = Vue.prototype.$moment;

    return new Vuex.Store({
        state: {
            month: moment().month(),
            year: moment().year(),
            events: events.map(({ description, date }) => {
                return { description, date: moment(date) };
            }),
            eventForm: {
                active: false,
                day: moment(),
                left: 0,
                top: 0
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
            openEventForm(state, { left, top, day }) {
                state.eventForm = { active: true, left, top, day };
            },
            closeEventForm(state) {
                state.eventForm.active = false;
            },
            addEvent(state, event) {
                state.events.push(event);
            }
        },
        actions: {
            addEvent(context, event) {
                return new Promise((resolve, reject) => {
                    Axios.post('/events', event).then(() => {
                        context.commit('addEvent', event);
                        resolve();
                    }).catch(reject);
                });
            }
        }
    })
}