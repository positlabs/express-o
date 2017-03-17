
// http://x-tags.org/docs

const ComponentBase = require('./component-base')

const prototype = ComponentBase.prototype

const lifecycle = {
	created(){
		this.delegateEvents({})
	},
	inserted(){},
	removed(){},
	attributeChanged(){}
}

const accessors = {
	label: {
		attribute: {}
	}
}

const methods = {
	render (){
		this.innerHTML = `
			<h1>hello</h1>
		`
	}
}

module.exports = xtag.register('x-boilerplate', {
	prototype, lifecycle, accessors, methods
})

