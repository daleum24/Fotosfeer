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
				ImgurClone.PhotosCollection.add(data.result)
				var upload = ImgurClone.PhotosCollection.get(data.result.id)
				$('.new_upload_preview').append("<img src='"+ upload.escape("image_url") +"' class='upload_img'></img>")

				$.fancybox("#initial_update_form", {
					afterShow:function(){
			      // $('#fileselect').click(function(){
// 							console.log($(this))
// 							$.fancybox.close()
// 							$('#fileupload').click()
// 							return false
// 						});
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
	
	events:{
		"click #test" : "test"
	},
	
	test: function(event){
		event.preventDefault();
		$.fancybox("#initial_update_form", {
			afterShow:function(){
	      // $('#fileselect').click(function(){
// 							console.log($(this))
// 							$.fancybox.close()
// 							$('#fileupload').click()
// 							return false
// 						});
      },
			helpers: {
				overlay: {
					css: {'background' : 'rgba(7, 0, 2, 0.90)'}
				}
			}
		})
	},
	
	template: JST["photo_upload_form"],
	
	render: function(){
		this.$el.append(this.template({photos: this.collection}));
		return this
	}
});