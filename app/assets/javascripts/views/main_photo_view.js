ImgurClone.Views.MainPhotoView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("main-photo")
	},
	
	template: JST['main_photo_view'],
	
	render: function(){
		this.$el.html(this.template({photo: this.model}))
		return this
	}
})