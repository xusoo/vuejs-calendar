<template>
	<div>
		<div id="event-form-mask" @click="close" v-show="active"></div>
		<div id="event-form" :class="{ active }" :style="{ left, top }">
			<h4 :class="selectedColor">{{ isNew() ? 'Add event' : 'Edit event' }}</h4>
			<p v-if="event.date">{{ event.date.format('dddd, MMM Do YYYY') }}</p>
			<div class="text">
				<input v-focus placeholder="e.g. Important meeting" type="text" :class="selectedColor" v-model="description" @keypress.enter="saveEvent">
			</div>
			<div class="event-colors">
				<div :class="[color, color === selectedColor ? 'selected' : '' ]" v-for="color in colors" @click="selectColor(color)"></div>
			</div>
			<div class="buttons">
				<button @click="deleteEvent" class="delete-btn" v-if="!isNew()">Delete</button>
				<button @click="saveEvent" :class="selectedColor">{{ isNew() ? 'Create' : 'Save' }}</button>
			</div>
			<div id="close-button" @click="close">&times;</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		data() {
			return {
				colors: ['green', 'blue', 'purple', 'pink', 'orange', 'yellow'],
				selectedColor: '',
				description: ''
			}
		},
		computed: mapState({
			active: state => state.eventForm.active,
			left: state => state.eventForm.left + 'px',
			top: state => state.eventForm.top + 'px',
			event: state => state.eventForm.event
		}),
		methods: {
			isNew() {
				return typeof this.event._id === 'undefined';
			},
			onOpen() {
				this.description = this.event.description;
				this.selectedColor = this.event.color;
			},
			saveEvent() {
				if (!this.description.trim()) return;

				this.event.description = this.description.trim();
				this.event.color = this.selectedColor;

				this.$store.dispatch(this.isNew() ? 'addEvent' : 'updateEvent', this.event)
					.then(this.close)
					.catch((err) => {
						console.error(err);
						alert('An error occurred when trying to save the event!');
					});
			},
			deleteEvent() {
				this.$store.dispatch('deleteEvent', this.event._id).then(this.close).catch((err) => {
					console.error(err);
					alert('An error occurred when trying to delete the event!');
				});
			},
			close() {
				this.$store.commit('closeEventForm');
				this.description = '';
				this.selectedColor = '';
			},
			selectColor(color) {
				this.selectedColor = color;
			}
		},
		directives: {
			focus: {
				update(el) {
					el.focus();
				}
			}
		},
		mounted() {
			this.$store.subscribe(mutation => {
				if (mutation.type === 'openEventForm') this.onOpen();
			});

			document.addEventListener('keydown', ev => {
				if (this.active && ev.key === 'Escape') this.close();
			});
		}
	}
</script>
<style scoped lang="scss">
	@import "../style/variables";

	#event-form {

		display: none;
		box-shadow: 0 2px 4px $alto;
		position: fixed;
		width: 300px;
		transform: translate(-50%, -100%);
		z-index: 10;
		padding: 1rem;
		background-color: white;
		border: 1px $alto solid;

		&.active {
			display: flex;
		}

		flex-direction: column;
		align-content: space-between;

		h4 {
			margin: 0 0 0.75rem 0;
			color: $dusty-gray;
			font-weight: normal;
			font-size: 1.15rem;

			@include colorize($property: 'color');
		}

		p {
			font-size: 0.85rem;
			margin: 0 0 0.85rem 0;
		}

		& > * {
			width: 100%
		}
		.text {
			input[type='text'] {
				width: calc(100% - 0.75rem);
				padding: 0.25rem;
				font-size: 0.75rem;
				border: 1px solid lightgray;

				@include colorize($property: 'border-color');

				&:focus {
					outline: none;
				}
			}
			margin-bottom: 0.75rem;
		}
		.buttons {
			text-align: right;

			button {
				@include button;

				&.delete-btn {
					color: crimson;
					background: white;
					border: 1px solid transparent;
				}
			}
		}

		.event-colors > div {
			width: 14px;
			height: 14px;
			border-radius: 10px;
			display: inline-block;
			cursor: pointer;
			margin: 2px 3px;

			&:hover, &.selected {
				width: 18px;
				height: 18px;
				margin: 0 1px;
			}

			@include colorize($property: 'background');
		}

		#close-button {
			margin: 0;
			padding: 0;
			font-size: 1.25rem;
			background-color: white;
			position: absolute;
			border: none;
			width: 20px;
			font-weight: bold;
			color: #666;
			right: 0.6rem;
			top: 0.6rem;
			cursor: pointer;
			&:focus {
				outline: none;
			}
		}
	}

	#event-form-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
</style>