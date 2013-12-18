ImgurClone.Views.ShowSideBarView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("show-sidebar")
		this.photoMapView = new ImgurClone.Views.PhotoMapView();
	},
	
	render: function(callback){
		this.$el.append(this.photoMapView.render().$el)
		
		// var map = L.mapbox.map('map', 'examples.map-y7l23tes').setView([37.9, -77], 5)
		return this
	}
});