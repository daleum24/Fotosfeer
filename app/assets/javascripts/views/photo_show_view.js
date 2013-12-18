ImgurClone.Views.PhotoShowView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("photo_show");
		this.detailsContainer = $("<section class='photo-detail-container'></section>")
		this.$el.append(this.detailsContainer)
		
		// this.adjacentPhotos = new ImgurClone.Views.AdjacentPhotosView({model: this.model});
		this.mainPhotoContent = new ImgurClone.Views.MainContentView({model: this.model});
		this.showSideBar = new ImgurClone.Views.ShowSideBarView({model: this.model});
	},
	
	render: function(){
		// console.log(this.adjacentPhotos.$el)
		// this.$el.prepend(this.adjacentPhotos.render().$el);
		
		this.detailsContainer.append(this.mainPhotoContent.render().$el);
		this.detailsContainer.append(this.showSideBar.render().$el);
		return this
	}
});