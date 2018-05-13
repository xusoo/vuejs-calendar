<template>
	<li @click.stop="edit" :class="['event', event.color + '-event']">
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

		&.green-event { color: $green; }
		&.blue-event { color: $blue; }
		&.purple-event { color: $purple; }
		&.pink-event { color: $pink; }
		&.orange-event { color: $orange; }
		&.yellow-event { color: $yellow; }

		&.green-event:hover { background: $green; }
		&.blue-event:hover { background: $blue; }
		&.purple-event:hover { background: $purple; }
		&.pink-event:hover { background: $pink; }
		&.orange-event:hover { background: $orange; }
		&.yellow-event:hover { background: $yellow; }

		&:hover {
			color: white;
		}
	}
</style>