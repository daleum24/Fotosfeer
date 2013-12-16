ImgurClone.Views.UserHeaderView = Backbone.View.extend({
	tagName: "header",
	
	template: JST["user_header_view"](),
	
	render: function(){
		this.$el.append(this.template);
		return this;
	}
	
	
});