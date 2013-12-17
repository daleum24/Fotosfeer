ImgurClone.Views.UploadFormView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("upload-form");
		$(function() { 
			$('#fileupload').fileupload({
			url: "/users/" + ImgurClone.user_id + "/photos/geolocate",
			type: "POST",
			dataType: "json",
			done: function(e, data){
				var newPhotObj = data.result;
			}
			});
		})
	},
	
	events:{

	},
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});