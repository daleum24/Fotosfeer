ImgurClone.Views.CommentsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("comments-container");
		this.comments_by_parent = this.model.get("comments_by_parent_id")
		this.comments = this.model.get("comments")
		this.top_level_comments = this.comments.filter(function(comment){
			return comment.get("parent_comment_id") === null
		})

	},
	
	events:{
		"click #comment-submit" : "post_new_comment"
	},
	
	post_new_comment: function(event){
		event.preventDefault();
		var body = $("#comment-input").val()
		var comment = new ImgurClone.Models.Comment()
		var that = this;
		
		this.comments.create({comment: {body: body, photo_id: this.model.get("id")}}, {
			wait: true,
			success: function(response) {
				that.top_level_comments.push(response)
				that.render();
			}
		})
		
	},
	
	template: JST['comments_view'],
	
	render: function(){
		console.log("kashgiduashfi")
		this.$el.html(this.template({ photo: this.model, comments: this.comments, top_level_comments: this.top_level_comments }))
		
		return this
	}
	
});