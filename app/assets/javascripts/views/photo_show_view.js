ImgurClone.Views.PhotoShowView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("photo_show");
		this.detailsContainer = $("<section class='photo-detail-container'></section>")
		this.$el.append(this.detailsContainer)
		
		this.mainPhotoContent = new ImgurClone.Views.MainContentView({model: this.model});
		this.showSideBar = new ImgurClone.Views.ShowSideBarView({model: this.model});
	},
	
	render: function(){
		this.detailsContainer.append(this.mainPhotoContent.render().$el);
		this.detailsContainer.append(this.showSideBar.render().$el);
		return this
	}
});