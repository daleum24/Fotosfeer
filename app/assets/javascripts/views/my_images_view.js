ImgurClone.Views.myImagesView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("my-images")
		this.myImages = ImgurClone.PhotosCollection.where({submitter_id: ImgurClone.user_id})
		this.myImagesCollection = new ImgurClone.Collections.Photos(this.myImages);
		
	  var events = ["add", "change:title", "remove", "reset"];
	     _(events).each(function (event) {
	       that.listenTo(that.myImagesCollection, event, that.render);
	     });
	},
	
	events:{
		"click .myImageEdit" : "showEditForm"
	},
	
	showEditForm: function(event){
		event.preventDefault();
		
		var photo_id = $(event.currentTarget).attr("data-id")
		var photo = this.myImagesCollection.get(photo_id)
		var image_tag = "<img src=" + photo.escape("image_url") + "></img>" 
		
		$("#edit-name").val(photo.escape("title"))
		$("#edit-description").val(photo.escape("description"))
		
		$("#edit-form-photo").empty()
		$("#edit-form-photo").append(image_tag)
		
		$.fancybox("#edit-form",{
			afterShow: function(){
				
				$('#edit-delete-button').one("click", function(event){
					photo.destroy()
					$.fancybox.close()
				})
				return false
			},
			
			afterClose: function(){
				var updated = false
				if (($("#edit-name").val() != photo.escape("title")) || ($("#edit-description").val() != photo.escape("description"))){
					photo.save({ title: $("#edit-name").val(), description: $("#edit-description").val() });
					var updated = true;
				}
				if (updated === true){
					$.fancybox("#messages");
				}
			}
		});
		
	},
	
	myImagesTemplate: JST["my_images_template"],
	
	render: function(){
		this.$el.empty()
		this.$el.append(this.myImagesTemplate({ photos: this.myImagesCollection }))
		return this;
	}
});