ImgurClone.Views.PhotoIndexView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("photo_index")
	},
	
	template: JST["photo_index_view"](),
	
	render: function(){
		this.$el.append(this.template);
		return this
	}
});