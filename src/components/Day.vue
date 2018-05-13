<template>
	<div :class="{ day: true, today: isToday, past: isPast, 'not-current-month': isNotCurrentMonth, active: isActive}" @click="openEventForm">
		{{ day.date() }}
		<ul class="event-list">
			<event v-for="event in events" :key="event.id" :event="event"/>
		</ul>
	</div>
</template>

<script>
    import Event from "./Event.vue";

    export default {
        props: ['day'],
        computed: {
            events() {
                return this.$store.getters.getEventsByDate(this.day);
            },
            isToday() {
                return this.$moment().isSame(this.day, 'day');
            },
            isPast() {
                return this.$moment().isAfter(this.day, 'day');
            },
            isNotCurrentMonth() {
                return this.day.month() !== this.$store.state.month;
            },
            isActive() {
                return this.$store.state.eventForm.active && this.day.isSame(this.$store.state.eventForm.event.date, 'day');
            }
        },
        methods: {
            openEventForm(mouseEvent) {
                this.$store.commit('openEventForm', {
                    event: { description: '', date: this.day, color: 'green' },
                    left: mouseEvent.clientX,
                    top: mouseEvent.clientY
                });
            }
        },
        components: { Event }
    }
</script>