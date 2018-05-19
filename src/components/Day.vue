<template>
	<div :class="{ day: true, today: isToday, past: isPast, 'not-current-month': isNotCurrentMonth, active: isActive}" @click="openEventForm">
		{{ day.date() }}
		<ul class="event-list">
			<event v-for="event in events" :key="event._id" :event="event"/>
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
			openEventForm() {
				this.$store.commit('openEventForm', {
					event: { description: '', date: this.day, color: 'green' },
					left: this.$el.offsetLeft + this.$el.clientWidth / 2,
					top: this.$el.offsetTop + this.$el.clientHeight / 2 - document.documentElement.scrollTop
				});
			}
		},
		components: { Event }
	}
</script>

<style scoped lang="scss">
	@import '../style/variables';

	.day {
		overflow: hidden;
		overflow-y: visible;
		font-weight: bold;
		@include calendar-cell;
		min-height: 100px;
		user-select: none;
		cursor: default;
		border-left: $calendar-border;
		border-top: $calendar-border;

		&:last-child {
			border-right: $calendar-border;
		}

		&.past {
			opacity: 0.6;
		}

		&.not-current-month {
			color: $alto;
			background: #F1F1F1;
		}

		&.today {
			background-color: $buttermilk;
		}

		&.active {
			background-color: $light-pink;
		}

		.event-list {
			font-size: 0.8rem;
			font-weight: bold;
			list-style: none;
			padding: 0;
			margin: 0.5rem 0 0.5rem 0;
		}

		&:hover {
			cursor: pointer;
			background-color: #F7F7F7;
		}
	}
</style>