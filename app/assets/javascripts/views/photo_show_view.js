ImgurClone.Views.PhotoShowView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("photo_show");
		var messages = '<div id="messages" style="display:none"></div>'
		var header = '<header class="images_header"><p>' + this.model.escape('title') + '</p></header>'
		this.$el.append(messages)	
		this.$el.append(header)		
		
		this.mainPhotoContent = new ImgurClone.Views.MainContentView({model: this.model});
		this.showSideBar = new ImgurClone.Views.ShowSideBarView({model: this.model});
	},
	
	render: function(){
		this.$el.append(this.mainPhotoContent.render().$el);
		this.$el.append(this.showSideBar.render().$el);
		return this
	}
});