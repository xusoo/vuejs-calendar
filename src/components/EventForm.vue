<template>
	<div>
		<vodal :show="active" animation="slideUp" @hide="close" :closeOnEsc="true"
		       :height="modalHeight" :width="modalWidth" className="event-form"
		       :customStyles="modalStyles" customMaskStyles="background: none" >
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
		</vodal>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		data() {
			return {
				colors: ['green', 'blue', 'purple', 'pink', 'orange', 'yellow'],
				modalWidth: 300,
				modalHeight: 150,
				modalPadding: 15,
				selectedColor: '',
				description: ''
			}
		},
		computed: Object.assign({
				modalStyles() {
					return {
						left: (this.left - (this.modalWidth / 2) - (this.modalPadding / 2)) + 'px',
						top: (this.top - this.modalHeight / 2 - (this.modalPadding / 2)) + 'px',
						padding: this.modalPadding + 'px',
						margin: 0
					};
				}
			},
			mapState({
				active: state => state.eventForm.active,
				left: state => state.eventForm.left,
				top: state => state.eventForm.top,
				event: state => state.eventForm.event
			})),
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
			},
			selectColor(color) {
				this.selectedColor = color;
			}
		},
		directives: {
			focus: {
				update(el) {
					setTimeout(() => el.focus(), 10);
				}
			}
		},
		mounted() {
			this.$store.subscribe(mutation => {
				if (mutation.type === 'openEventForm') this.onOpen();
			});
		}
	}
</script>

<style scoped lang="scss">
	@import "../style/variables";

	.event-form {

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
	}

</style>