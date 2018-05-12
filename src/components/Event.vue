<template>
	<li @click="edit">
		{{ event.description }}
	</li>
</template>

<script>
    export default {
        props: ['event'],
        methods: {
            edit(mouseEvent) {
                mouseEvent.stopPropagation();
                this.$store.commit('openEventForm', {
                    left: mouseEvent.clientX,
                    top: mouseEvent.clientY,
                    event: this.event
                });
            }
        }
    }
</script>
