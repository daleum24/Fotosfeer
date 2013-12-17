ImgurClone.Views.AdjacentPhotosView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("adjacent-photos-view")
	},
	
	template: JST['adjacent_photos_view'],
	
	render: function(){
		this.$el.append(this.template({photo: this.model}))
		return this
	}
});