<template>
	<div :class="{ day: true, today: isToday, past: isPast, 'not-current-month': isNotCurrentMonth, active: isActive}" @click="openEventForm">
		{{ day.date() }}
		<ul class="event-list">
			<li v-for="event in events">{{ event.description }}</li>
		</ul>
	</div>
</template>

<script>
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
                return this.$store.state.eventForm.active && this.day.isSame(this.$store.state.eventForm.day, 'day');
            }
        },
        methods: {
            openEventForm(event) {
                this.$store.commit('openEventForm', {
                    day: this.day,
                    left: event.clientX,
                    top: event.clientY
                });
            }
        }
    }
</script>