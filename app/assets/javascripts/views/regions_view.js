ImgurClone.Views.RegionsView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("regions-container")
	},
	
	render: function(){
		this.$el.append($("<div id='region-header'></div>"))
		this.$el.append($("<div id='region-map' class='dark' ></div>"))
		return this
	}
})