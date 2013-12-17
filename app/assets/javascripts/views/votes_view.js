ImgurClone.Views.VotesView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("votes-container")
	},
	
	template: JST['votes_view'],
	
	render: function(){
		this.$el.html(this.template())
		return this
	}
});