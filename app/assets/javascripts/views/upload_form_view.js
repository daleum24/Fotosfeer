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
			progress: function (e, data) {
   			var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#progress .bar').css(
        	'width',
        	progress + '%'
        );
			},
			done: function(e, data){
				console.log("DONE");
				ImgurClone.PhotosCollection.add(data.result)
				var upload = ImgurClone.PhotosCollection.get(data.result.id)
				
				$('.image_selection').toggleClass('hide-form')
				
				$('.new_upload_preview').append("<img src='"+ upload.escape("image_url") +"' class='upload_img'></img>")
				$('.initial_update_form').toggleClass('display-form')
			},
			fail: function(e, data){
				console.log("FAIL");
				$('.image_selection').toggleClass('hide-form')
				$('.upload_error').toggleClass('display-form')
			}
			});
		})
	},
	
	events:{
		"click #fileselect": "show_file_select"
	},
	
	show_file_select: function(event){
		event.preventDefault();
		console.log("hello!!!")
	},
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});