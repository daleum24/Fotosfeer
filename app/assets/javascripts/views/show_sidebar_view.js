ImgurClone.Views.ShowSideBarView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("show-sidebar")
	},
	
	render: function(callback){
		this.$el.append($("<div id='photo-map'></div>"))
		return this
	}
});