<template>
	<div id="calendar">
		<div class="calendar-week" v-for="week in weeks">
			<day :day="day" v-for="day in week"/>
		</div>
	</div>
</template>

<script>
    import Day from './Day.vue';

    const NUMBER_OF_DAYS_PER_WEEK = 7;
    const MONDAY = 1;

    export default {
        computed: {
            month() {
                return this.$store.state.month;
            },
            year() {
                return this.$store.state.year;
            },
            daysInMonth() {
                return this.$moment([this.year, this.month]).daysInMonth();
            },
            weeks() {
                const firstOfMonth = this.$moment([this.year, this.month, 1]);
                let numberOfWeeks = Math.ceil((firstOfMonth.isoWeekday() + this.daysInMonth - 1) / NUMBER_OF_DAYS_PER_WEEK);
                return [...Array(numberOfWeeks).keys()].map(week => [...this.daysInWeek(week)]);
            }
        },
        methods: {
            getMondayOfWeek(week) {
                return this.$moment([this.year, this.month, Math.min(week * NUMBER_OF_DAYS_PER_WEEK + 1, this.daysInMonth)]).isoWeekday(MONDAY);
            },
            daysInWeek(week) {
                return [...Array(NUMBER_OF_DAYS_PER_WEEK).keys()].map(day => {
                    return this.getMondayOfWeek(week).add(day, 'days');
                });
            }
        },
        components: { Day }
    }
</script>