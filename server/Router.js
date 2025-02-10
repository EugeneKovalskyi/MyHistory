const { EventEmitter } = require('stream')
	
class Router {
  constructor() {
		this.eventEmitter = new EventEmitter()
		this.eventSet = new Set()
	}

	_request(method, pathname, handler) {
		const event = method + pathname

		if (this.eventSet.has(event)) {
			throw new Error(`Event '${event}' already exists`)
		} else {
			this.eventSet.add(event)
			this.eventEmitter.on(event, handler)
		}
	}

	emit(event, req, res) {
		const isEmitted = this.eventEmitter.emit(event, req, res)
		
		if (!isEmitted) res.end()
	}

	post(pathname, handler) {
		this._request('POST', pathname, handler)
	}

	get(pathname, handler) {
		this._request('GET', pathname, handler)
	}

	patch(pathname, handler) {
		this._request('PATCH', pathname, handler)
	}	
	
	delete(pathname, handler) {
		this._request('DELETE', pathname, handler)
	}
}

module.exports = new Router()
