ImgurClone.Views.UploadFormView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("upload-form");
	},
	
	events:{
		"click #paperclip_button_submit" : "next_action_rename"
	},
	
	next_action_rename: function(event){
		event.preventDefault();
		var upload_photo = $('#paperclip_button')
		console.log(upload_photo.files)
		console.log(upload_photo)
		
		var new_photo = new ImgurClone.Models.Photo({image: upload_photo})
		
	},
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});