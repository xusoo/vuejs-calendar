<template>
	<li @click.stop="edit" :class="['event', event.color]">
		{{ event.description }}
	</li>
</template>

<script>
	export default {
		props: ['event'],
		methods: {
			edit(mouseEvent) {
				this.$store.commit('openEventForm', {
					left: mouseEvent.clientX,
					top: mouseEvent.clientY,
					event: this.event
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '../style/variables';

	li.event {
		white-space: nowrap;
		cursor: pointer;
		padding: 1px 5px;
		text-overflow: ellipsis;
		overflow: hidden;
		border-radius: 10px;

		@include colorize($property: 'color');
		@include colorize($property: 'background', $status: ':hover');

		&:hover {
			color: white;
		}
	}
</style>