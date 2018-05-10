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