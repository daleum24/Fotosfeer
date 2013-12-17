ImgurClone.Views.UploadFormView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("form-container");
		$(function() { 
			$('#fileupload').fileupload({
			url: "/users/" + ImgurClone.user_id + "/photos",
			type: "POST",
			dataType: "json",
			dropZone: $("#dropzone"),
			done: function(e, data){
				console.log("DONE");
				ImgurClone.PhotosCollection.add(data.result)
				
				
			},
			fail: function(e, data){
				console.log("FAIL");
			}
			});
		})
	},
	
	events:{
		"click #upload_image": "upload_image"
	},
	
	upload_image: function(event){
		event.preventDefault();
		console.log(ImgurClone.newPhotoObj)
	},
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});