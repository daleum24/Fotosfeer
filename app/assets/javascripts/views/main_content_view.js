ImgurClone.Views.MainContentView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("main-photo-content")
		
		this.mainPhoto = new ImgurClone.Views.MainPhotoView({model: this.model});
		// this.votes = new ImgurClone.Views.VotesView(this.model);
		// this.comments = new ImgurClone.Views.CommentsView(this.model);
	},

	render: function(){
		this.$el.append(this.mainPhoto.render().$el)
		return this
	}
});