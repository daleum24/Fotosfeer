ImgurClone.Views.myImagesView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("my-images")
		this.myImages = ImgurClone.PhotosCollection.where({submitter_id: ImgurClone.user_id})
	},
	
	events:{
		"click .myImageEdit" : "showEditForm"
	},
	
	showEditForm: function(event){
		event.preventDefault();
		alert("hooray!")
	},
	
	myImagesTemplate: JST["my_images_template"],
	
	render: function(){
		this.$el.append(this.myImagesTemplate({ photos: this.myImages }))
		return this;
	}
});