<template>
	<div>
		<div id="event-form-mask" @click="close" v-show="active"></div>
		<div id="event-form" :class="{ active }" :style="{ left, top }">
			<h4>{{ isNew() ? 'Add event' : 'Edit event' }}</h4>
			<p v-if="event.date">{{ event.date.format('dddd, MMM Do') }}</p>
			<div class="text">
				<input v-focus placeholder="e.g. Important meeting" type="text" v-model="description" @keypress.enter="saveEvent">
			</div>
			<div class="event-colors">
				<div :class="[color, color === selectedColor ? 'selected' : '' ]" v-for="color in colors" @click="selectColor(color)"></div>
			</div>
			<div class="buttons">
				<button @click="deleteEvent" class="btn-danger" v-if="!isNew()">Delete</button>
				<button @click="saveEvent">{{ isNew() ? 'Create' : 'Save' }}</button>
			</div>
			<div id="close-button" @click="close">&times;</div>
		</div>
	</div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                colors: [ 'green', 'blue', 'purple', 'pink', 'orange', 'yellow'],
                selectedColor: '',
                description: ''
            }
        },
        computed: mapState({
            active: state => state.eventForm.active,
            left: state => state.eventForm.left + 'px',
            top: state => state.eventForm.top + 'px',
            event: state => state.eventForm.event
        }),
        methods: {
            isNew() {
                return typeof this.event.id === 'undefined';
            },
            onOpen() {
                this.description = this.event.description;
                this.selectedColor = this.event.color;
            },
            saveEvent() {
                if (!this.description.trim()) return;

                this.event.description = this.description.trim();
                this.event.color = this.selectedColor;

                this.$store.dispatch(this.isNew() ? 'addEvent' : 'editEvent', this.event)
                    .then(this.close)
                    .catch((err) => {
                        console.error(err);
                        alert('An error occurred when trying to save the event!');
                    });
            },
            deleteEvent() {
                this.$store.dispatch('deleteEvent', this.event.id).then(this.close).catch((err) => {
                    console.error(err);
                    alert('An error occurred when trying to delete the event!');
                });
            },
            close() {
                this.$store.commit('closeEventForm');
                this.description = '';
                this.selectedColor = '';
            },
            selectColor(color) {
                this.selectedColor = color;
            }
        },
        directives: {
            focus: {
                update(el) {
                    el.focus();
                }
            }
        },
        mounted() {
            this.$store.subscribe(mutation => {
                if (mutation.type === 'openEventForm') this.onOpen();
            });

            document.addEventListener('keydown', ev => {
                if (this.active && ev.key === 'Escape') this.close();
            });
        }
    }
</script>