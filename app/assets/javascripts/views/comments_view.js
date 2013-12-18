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
		"click #comment-submit" : "post_new_comment",
		"click .nest-collapse"  : "collapse_children",
		"click .reply-link"     : "show_reply_form",
		"click #comment-submit" : "reply_to_comment"
	},
	
	childrenTemplate: JST['children_template'],
	
	collapse_children: function(event){
		event.preventDefault();
		var that = this;
		var $parent = $(event.currentTarget).parent()
		var data_id = $(event.currentTarget).attr("data-id") 
		
		var ul = ".nested-comment-" + data_id
		
		var children_comments = this.comments.filter(function(comment){
			return comment.get("parent_comment_id") === +data_id
		})
		
		if ($(event.currentTarget).attr("value") === "+" ){
			
			$(event.currentTarget).attr("value", "-") 
	
			children_comments.forEach(function(child_comment){
				$(ul).append(that.childrenTemplate({top_level_comment: child_comment, comments: that.comments}))
			})
			
		} else {
			$(event.currentTarget).attr("value", "+") 
			$(ul).empty()
		}
		
	},
	
	show_reply_form: function(event){
		event.preventDefault();
		var data_id = $(event.currentTarget).attr("data-id")
		var form_id = "#reply-" + data_id
		
		$(form_id).toggleClass("display-reply")
	},
	
	reply_to_comment: function(event){
		event.preventDefault();
		var data_id = $(event.currentTarget).attr("data-id")
		var input_id = "#comment-input-" + data_id
		var body = $(input_id).val()
		var that = this;
		
		this.comments.create({comment: {parent_comment_id: data_id, body: body, photo_id: this.model.get("id")}}, {
			wait: true,
			success: function(response) {
				var ul = ".nested-comment-" + data_id
				$(ul).append(that.childrenTemplate({top_level_comment: response, comments: that.comments}))
			}
		})
		
	},
	
	post_new_comment: function(event){
		event.preventDefault();
		var body = $("#comment-input").val()
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
		this.$el.html(this.template({ photo: this.model, comments: this.comments, top_level_comments: this.top_level_comments }))
		
		return this
	}
	
});










