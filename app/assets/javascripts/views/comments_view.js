ImgurClone.Views.CommentsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.model_id = this.model.escape('id')
		this.$el.addClass("comments-container")
		
		$.ajax({
			url: "/photos/" + this.model_id + "/comments",
			dataType: "json",
			success: function(response){
				that.allComments = new ImgurClone.Collections.Photos(response, {id: that.model_id});
			}
		});
		
		$.ajax({
			url: "/photos/" + this.model_id + "/comments",
			dataType: "json",
			success: function(response){
				that.commentsByParentId = new ImgurClone.Collections.Photos(response, {id: that.model_id});
			}
		});
		
	},
	
	template: JST['comments_view'],
	
	render: function(){
		this.$el.html(this.template({ comments: that.allComments }))
		return this
	}
	
});