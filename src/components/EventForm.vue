<template>
	<div id="event-form" :class="{ active }" :style="{ left, top }">
		<h4>Add event</h4>
		<p>{{ day.format('dddd, MMM Do') }}</p>
		<div class="text">
			<input v-focus placeholder="e.g. Important meeting" type="text" v-model="description" @keypress.enter="createEvent">
		</div>
		<div class="buttons">
			<button @click="createEvent">Create</button>
		</div>
		<div id="close-button" @click="close">&times;</div>
	</div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                description: ''
            }
        },
        computed: mapState({
            active: state => state.eventForm.active,
            left: state => state.eventForm.left + 'px',
            top: state => state.eventForm.top + 'px',
            day: state => state.eventForm.day,
        }),
        methods: {
            createEvent() {
                if (!this.description.trim()) return;

                this.$store.dispatch('addEvent', {
                    description: this.description,
                    date: this.day
                }).then(() => {
                    this.close();
                    this.description = '';
                }).catch((err) => {
                    console.error(err);
                    alert('An error ocurred when trying to create the event!');
                });
            },
            close() {
                this.$store.commit('closeEventForm');
            }
        },
        directives: {
            focus: {
                update(el) {
                    el.focus();
                }
            }
        }
    }
</script>