ImgurClone.Views.UploadFormView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("form-container");
		
		$(function() { 
			$('#fileupload').fileupload({
			url: "/users/" + ImgurClone.user_id + "/photos",
			type: "POST",
			dataType: "json",
			submit: function(e, data){
				$.fancybox("#progress_bar");
			},
			done: function(e, data){
				ImgurClone.PhotosCollection.add(data.result)
				var upload = ImgurClone.PhotosCollection.get(data.result.id)
				$('.new_upload_preview').empty()
				$('.new_upload_preview').append("<img src='"+ upload.escape("image_url") +"' class='upload_img'></img>")

				$.fancybox("#initial_update_form", {
					afterShow:function(){
						$('#update_image').on("click", function(event){
							upload.save({ 
								title: $('#initial_title').val(), 
								description: $('#initial_description').val()
							})
							$.fancybox.close()
						})
						$('#destroy_image').on("click", function(event){
							upload.destroy();
							$.fancybox.close()
						})
						return false
					},
					afterClose:function(){
						Backbone.history.navigate("myImages", {trigger:true});
					},
					
					helpers: {
						overlay: {
							css: {'background' : 'rgba(7, 0, 2, 0.90)'}
						}
					}
				})

			},
			fail: function(e, data){
				$.fancybox("#upload_error", {
					helpers: {
						overlay: {
							css: {'background' : 'rgba(7, 0, 2, 0.90)'}
						}
					}
				})
			}
			});
		})
		
	},
	
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		
		return this
	}
});