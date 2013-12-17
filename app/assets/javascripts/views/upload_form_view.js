ImgurClone.Views.UploadFormView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("upload-form");
		$(function() { $('#fileupload').fileupload({
			url: "/users/" + ImgurClone.user_id + "/photos",
			type: "POST",
			dataType: "json",
			done: function(e,data){
				console.log("in done")
			},
			fail: function(e,data){
				console.log(e)
				console.log(data.result)
				console.log("in fail")
			}
			});
		})
	},
	
	events:{
		"click #fileupload_submit" : "submit_image"
	},
	
	submit_image: function(event){
		event.preventDefault();
	},
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});