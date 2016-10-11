const EventEmitter = require('wolfy87-eventemitter')

/*

	Simple model that supports shallow property change watchers

	NOTE: all values must be defined in the object passed to the constructor!
			... otherwise, use model.define(prop, value) to activate events

	var model = new Model({
		str: 'hello',
		obj: {
			a: 'a' // NOTE: unwatchable
		},
		subModel: new Model({
			a: 'a' // watchable
		}),
		bool: true,
		num: 123.4567,
		arr: [1, 2, 3, 4, 5]
	})

	console.log(model)

	var onChange = function(newval, oldval){
		console.log('newval: ' + newval, ', oldval: ' + oldval)
	}
	model.on('str', onChange)
	model.str = 'asdf'
	model.str += 'asdf'

	model.subModel.watch('a', onChange)
	model.subModel.a = 'A'

	model.on('arr', onChange)
	model.arr = model.arr.concat('extra')

*/
class Model extends EventEmitter {
	
	constructor(obj){
		super()
		this._properties = Object.assign({}, obj) // clone just to be safe
		Object.keys(this._properties).forEach(key => {
			this.define(key, this._properties[key])
		})
	}

	define(key, defaultValue){
		
		this._properties[key] = defaultValue

		Object.defineProperty(this, key, {
			get(){ return this._properties[key] },
			set(newValue){
				// ignore if value is unchanged
				// only works for primitives
				if(newValue === this._properties[key]) return
				var oldValue = this._properties[key]
				this._properties[key] = newValue
				this.emit(key, newValue, oldValue)
			},
			enumerable: true
		})
	}
}

module.exports = Model

