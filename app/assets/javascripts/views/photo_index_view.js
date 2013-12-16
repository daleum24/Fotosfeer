ImgurClone.Views.PhotoIndexView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("photo_index");
		this.collection = ImgurClone.PhotosCollection;
	},
	
	template: JST["photo_index_view"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});