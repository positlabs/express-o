
// http://x-tags.org/docs

const ComponentBase = require('./component-base')

xtag.register('x-boilerplate', {

	prototype: ComponentBase.prototype,

	lifecycle: {
		created(){
			this.delegateEvents({})
		},
		inserted(){},
		removed(){},
		attributeChanged(){}
	},

	accessors: {
		label: {
			attribute: {}
		}
	}, 

	methods: {
		render (){
			this.innerHTML = `
				<h1>hello</h1>
			`
		}
	}
})

