<template>
	<div>
		<div id="header">
			<div>
				<img src="../assets/logo.png">
				<h1>Vue.js Calendar</h1>
			</div>
			<div>
				<month-selector/>
			</div>
		</div>
		<day-bar/>
		<calendar/>
		<event-form/>
	</div>
</template>

<script>
	import DayBar from './DayBar.vue';
	import Calendar from './Calendar.vue';
	import MonthSelector from './MonthSelector.vue';
	import EventForm from './EventForm.vue';

	export default {
		components: {
			MonthSelector,
			DayBar,
			Calendar,
			EventForm,
		}
	}
</script>

<style scoped lang="scss">
	@import '../style/variables';

	#header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;

		div:first-child {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 1rem 0;

			img {
				width: 50px;
				height: 50px;
			}

			h1 {
				margin: 0 0 0 0.5rem;
				color: $pickled-bluewood;
				padding-top: 7px;
			}
		}
	}
</style>