ImgurClone.Views.CommentsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("comments-container");
		this.comments_by_parent = this.model.get("comments_by_parent_id")
		this.comments = this.model.get("comments")
	},
	
	events:{
		"click #comment-submit" : "post_new_comment"
	},
	
	post_new_comment: function(event){
		event.preventDefault();
		var body = $("#comment-input").val()
		var comment = new ImgurClone.Models.Comment()
		
		comment.save({comment: {body: body, photo_id: this.model.get("id")}}, {
			success: function(response){
				console.log("success")
				console.log(response)
				that.comments.add(response)
			},
			error: function(response){
				console.log("error")
				console.log(response)
			}	
		})
	},
	
	template: JST['comments_view'],
	
	render: function(){
		this.$el.html(this.template({ photo: this.model, comments: this.comments, comments_by_parent: this.comments_by_parent }))
		return this
	}
	
});