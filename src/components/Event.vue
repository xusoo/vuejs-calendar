<template>
	<li @click.stop="edit" :class="event.color">
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
