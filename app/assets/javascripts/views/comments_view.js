ImgurClone.Views.CommentsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.model_id = this.model.escape('id')
		this.$el.addClass("comments-container")
		
		$.ajax({
			url: "/photos/" + this.model_id + "/comments",
			dataType: "json",
			success: function(response){
				that.collection = new ImgurClone.Collections.Photos(response, {id: that.model_id});
			},
			error: function(response){
				console.log("in error")
			}
		})
	},
	
	template: JST['comments_view'],
	
	render: function(){
		this.$el.html(this.template())
		return this
	}
});