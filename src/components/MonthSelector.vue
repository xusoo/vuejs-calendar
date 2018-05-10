<template>
	<div>
		{{ $moment([year, month]).format('MMMM YYYY') }}
		<button @click="changeMonth(-1)">&lt;</button>
		<button @click="changeMonth(+1)">&gt;</button>
	</div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: mapState(['month', 'year']),
        methods: {
            changeMonth(delta) {
                const updated = this.$moment([this.year, this.month]).add(delta, 'month');
                this.$store.commit('changeDate', { month: updated.month(), year: updated.year() });
            }
        }
    }
</script>