ImgurClone.Views.CommentsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("comments-container")
		console.log(this.model.get("comments"))
	},
	
	// template: JST['comments_view'],
	
	render: function(){
		// this.$el.html(this.template({ comments: that.allComments }))
		return this
	}
	
});