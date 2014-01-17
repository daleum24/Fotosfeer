ImgurClone.Views.myImagesView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("my-images")
		this.myImagesCollections = ImgurClone.myImagesCollection
		
	  var events = ["add", "change:title", "remove"];
	  _(events).each(function (event) {
	    that.listenTo(that.myImagesCollections, event, that.render);
	  });
	},
	
	events:{
		"click .myImageEdit" : "showEditForm"
	},
	
	showEditForm: function(event){
		event.preventDefault();
		
		var photo_id = $(event.currentTarget).attr("data-id")
		var photo = ImgurClone.myImagesCollection.get(photo_id)
		var image_tag = "<img src=" + photo.escape("image_url") + "></img>" 
		
		$("#edit-name").val(photo.escape("title"))
		$("#edit-description").val(photo.escape("description"))
		
		$("#edit-form-photo").empty()
		$("#edit-form-photo").append(image_tag)
		
		$.fancybox("#edit-form",{
			afterShow: function(){
				
				$('#update-button').one("click", function(event){
					photo.save({ title: $("#edit-name").val(), description: $("#edit-description").val() });
					$.fancybox.close()
					
					$("#messages").html("Photo Updated!").fadeIn(400)	
					window.setTimeout(function(){ 
						$("#messages").fadeOut(600).html("")
					}, 4000) 
					
				})
				
				$('#delete-button').one("click", function(event){
					photo.destroy()
					$.fancybox.close()
					
					$("#messages").html("Photo Deleted").fadeIn(400)	
					window.setTimeout(function(){ 
						$("#messages").fadeOut(600).html("")
					}, 4000) 
					
				})
			},
		});
		
	},
	
	myImagesTemplate: JST["my_images_template"],
	
	render: function(){
		this.$el.empty()
		this.$el.append(this.myImagesTemplate({ photos: ImgurClone.myImagesCollection }))
		return this;
	}
});