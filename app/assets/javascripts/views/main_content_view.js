ImgurClone.Views.MainContentView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("main-photo-content")
		
		this.mainPhoto = new ImgurClone.Views.MainPhotoView({model: this.model});
		this.votes = new ImgurClone.Views.VotesView({model: this.model});
		this.comments = new ImgurClone.Views.CommentsView({model: this.model});
	},

	render: function(){
		this.$el.append(this.mainPhoto.render().$el)
		this.$el.append(this.votes.render().$el)
		this.$el.append(this.comments.render().$el)
		return this
	}
});