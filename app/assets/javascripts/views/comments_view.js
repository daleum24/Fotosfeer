ImgurClone.Views.CommentsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("comments-container");
	},
	
	template: JST['comments_view'],
	
	render: function(){
		var comments_by_parent = this.model.get("comments_by_parent_id")
		var comments = this.model.get("comments")
		
		console.log(comments_by_parent)
		console.log(comments)

		this.$el.html(this.template({ photo: this.model, comments: comments, comments_by_parent: comments_by_parent }))
		return this
	}
	
});