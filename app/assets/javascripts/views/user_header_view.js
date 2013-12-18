ImgurClone.Views.UserHeaderView = Backbone.View.extend({
	initialize: function(){
		this.uploadForm = new ImgurClone.Views.UploadFormView();
		this.$el.addClass("signed-in-header")
	},
	
	tagName: "section",
	
	events: {
		"click #home_link" : "home_link",
		"click #image_upload" : "show_upload_form",
		"click #my-favorites" : "navigate_to_favorites",
		"click #logout" : "logout"
	},
	
	home_link: function(event){
		event.preventDefault();
		Backbone.history.navigate("", {trigger:true});
	},
	
	show_upload_form: function(event){
		event.preventDefault();
		$(".upload-form").toggleClass("display-form");
	},
	
	navigate_to_favorites: function(event){
		event.preventDefault();
	},
	
	logout: function(event){
		event.preventDefault();
		
		$.ajax({
			url: "/session",
			method: "DELETE",
			success: function(){
				
			}
		})	
	},
	
	template: JST["user_header_view"],
	
	upload_form: JST["photo_upload_form"](),
	
	render: function(){
		this.$el.append(this.template({users: ImgurClone.UsersCollection, user_id: ImgurClone.user_id}));
		this.$el.append(this.uploadForm.render().$el);
		return this;
	}
	
	
});