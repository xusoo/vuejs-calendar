const events = [];

let EVENT_ID_COUNT = 1; // I know, not very secure, but it's just temporary.
function generateId() {
	return EVENT_ID_COUNT++;
}

module.exports = {
	all: () => events,
	find: (id) => events.find(ev => ev.id === id),
	findIndex: (id) => events.findIndex(ev => ev.id === id),

	add(event) {
		if (this.find(event.id)) {
			throw new Error(`Event with ID ${event.id} already exists`);
		}
		event.id = generateId();
		events.push(event);
		return event;
	},

	update(event) {
		const index = this.findIndex(event.id);
		if (index === -1) {
			throw new Error(`Event with ID ${event.id} does not exist`);
		}
		events[index] = event;
	},

	delete(id) {
		const index = this.findIndex(id);
		if (index === -1) {
			throw new Error(`Event with ID ${id} does not exist`);
		}
		events.splice(index, 1);
	}
};