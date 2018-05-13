<template>
	<div id="month-selector">
		<span>{{ $moment([year, month]).format('MMMM YYYY') }}</span>
		<button @click="changeMonth(-1)">&ShortLeftArrow;</button>
		<button @click="changeMonth(+1)">&ShortRightArrow;</button>
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

<style scoped lang="scss">
	@import '../style/variables';

	#month-selector {
		font-weight: bold;
		span {
			margin-right: 0.25rem;
		}

		button {
			cursor: pointer;
			color: $dusty-gray;
			font-size: 1rem;
			padding: 0;
			width: 20px;
			background-color: white;
			user-select: none;
			border: 1px solid $alto;
			border-radius: 2px;
			margin-left: 0.25rem;

			&:focus {
				outline: none;
			}

			&:hover {
				color: $pickled-bluewood;
				box-shadow: 0 2px 2px $alto;
			}
		}
	}
</style>