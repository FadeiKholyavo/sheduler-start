const xssFilters = require('xss-filters');

class Storage {
	constructor(connection) {
		this._db = connection;
		this.eventsTable = "events";
		this.roomsTable = "rooms";
		this.ownersTable = "owners";
	}

	// get events from the table
	async getAll(params) {
		let query = "SELECT * FROM ??";

		let events = await this._db.query(query, [this.eventsTable]);
		let rooms = await this._db.query(query, [this.roomsTable]);
		let owners = await this._db.query(query, [this.ownersTable]);

		events.forEach( entry => {
			entry.text = xssFilters.inHTMLData(entry.text);
		});

		return {
			data: events,
			collections:{
				rooms: rooms,
				owners: owners
			} 
		};
	}

	// create new event
	async insert(data) {
		let result = await this._db.query(
			"INSERT INTO ?? (`start_date`, `end_date`, `text`, `owner_id`, `room_id`) VALUES (?,?,?,?,?)",
			[this.eventsTable, data.start_date, data.end_date, data.text, data.owner_id, data.room_id]);

		return {
			action: "inserted",
			tid: result.insertId
		}
	}

	// update event
	async update(id, data) {
		await this._db.query(
			"UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ?, `owner_id` = ?, `room_id` = ? WHERE id = ?",
			[this.eventsTable, data.start_date, data.end_date, data.text, data.owner_id, data.room_id, id]);

		return {
			action: "updated"
		}
	}

	// delete event
	async delete(id) {
		await this._db.query(
			"DELETE FROM ?? WHERE `id`=? ;",
			[this.eventsTable, id]);

		return {
			action: "deleted"
		}
	}
}

module.exports = Storage;