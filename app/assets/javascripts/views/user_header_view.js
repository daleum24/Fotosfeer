ImgurClone.Views.UserHeaderView = Backbone.View.extend({
	initialize: function(){
		this.uploadForm = new ImgurClone.Views.UploadFormView();
		this.$el.addClass("signed-in-header")
	},
	
	tagName: "section",
	
	events: {
		"click #home_link" : "home_link",
		"click #image_upload" : "show_upload_form"
	},
	
	home_link: function(event){
		event.preventDefault();
		Backbone.history.navigate("", {trigger:true});
	},
	
	show_upload_form: function(event){
		$(".upload-form").toggleClass("display-form");
	},
	
	template: JST["user_header_view"](),
	
	upload_form: JST["photo_upload_form"](),
	
	render: function(){
		this.$el.append(this.template);
		this.$el.append(this.uploadForm.render().$el);
		return this;
	}
	
	
});