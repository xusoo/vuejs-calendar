<template>
	<div id="day-bar">
		<div v-for="weekday in weekdays">{{ weekday }}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				weekdays: this.$moment.weekdaysShort(true)
			}
		},
	}
</script>

<style scoped lang="scss">
	@import '../style/variables';

	#day-bar {
		@include calendar-row;

		div {
			@include calendar-cell;
		}
	}
</style>