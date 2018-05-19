<template>
	<li @click.stop="edit" :class="['event', event.color]">
		{{ event.description }}
	</li>
</template>

<script>
	export default {
		props: ['event'],
		methods: {
			edit() {
				this.$store.commit('openEventForm', {
					left: this.$el.offsetLeft + this.$el.clientWidth / 2,
					top: this.$el.offsetTop + this.$el.clientHeight / 2 - document.documentElement.scrollTop,
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