
// https://github.com/Olical/EventEmitter
const EventEmitter = require('wolfy87-eventemitter')

class BaseView extends EventEmitter {

	/*
		class ExampleView extends BaseView {
		
			constructor(options){
				super(options)
				// ...
			}
		}

		new ExampleView({

			// optionally pass reference to the view's element. Only need to pass one of these values
			// passing these is an alternative to explicitly calling view.setElement()
			el: HTMLElement (optional)
			$el: jQuery instance (optional)

			// optionally pass events object.
			// alternative to calling view.delegateEvents()
			events: Object (optional)
		})
	*/
	constructor(options){
		super()
		// console.log('BaseView', arguments)
		if(options && (options.$el || options.el)){
			this.setElement(options.$el || options.el)
			if(options.events || this.events){
				this.delegateEvents(options.events || this.events)
			}
		}
	}

	/*
		accepts a hash of html events

		{
			'HTMLEventName selector': 'handlerName',
			'click .button': 'clickHandler'
		}
	*/
	delegateEvents(events){
		events = events || this.events
		Object.keys(events).forEach((key, index) => {
			var handlerName = events[key]
			var delimited = key.split(' ')
			var evt = delimited.shift()
			delimited = delimited.join(' ')
			this.$el.delegate(delimited, evt, e => { this[handlerName](e) })
			// console.log(delimited, evt, this[handlerName])
		})
	}

	/*
		assigns accessors for this view's element
		accepts jQuery instance or HTMLElement
		
			this.el 	// HTMLElement
			this.$el 	// jquery object
	*/
	setElement(duckTypedElement){
		if(duckTypedElement instanceof jQuery){
			this.$el = duckTypedElement
			this.el = duckTypedElement[0]
		}else{
			this.el = duckTypedElement
			this.$el = $(duckTypedElement)
		}
	}

	/*
		element scoped jquery selector

		usage: 
			this.$('.thing')
	*/ 
	$(selector){
		if(this.$el === undefined){
			console.warn('no element set for', this)
			return $(selector)
		}
		return this.$el.find(selector)
	}
}

module.exports = BaseView