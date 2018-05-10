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