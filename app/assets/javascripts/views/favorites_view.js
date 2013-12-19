ImgurClone.Views.FavoritesView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("favorites-container")
	},
	
	events:{
		"click .favorite-preview-link" : "show_favorite"
	},
	
	show_favorite: function(event){
		event.preventDefault();
		var photo_id = +$(event.currentTarget).attr("data-id")
		var photo = ImgurClone.FavoritePhotosCollection.get(photo_id)
		var latitude = +photo.escape("latitude")
		var longitude = +photo.escape("longitude")
		
		ImgurClone.FavoritesMap.setZoomAround([latitude, longitude],17)
		ImgurClone.FavoritesMap.panTo([latitude + 0.00123505, longitude], {duration: 1})
		$("#favorite-enlarge").empty();
		$("#favorite-enlarge").append(this.favoritePhotoEnlarge({photo: photo}));
		$("#favorite-enlarge").addClass("display-enlarge");
	},
	
	favoritePhotosTemplate: JST["favorites_scroll"],
	
	favoritePhotoEnlarge: JST["favorite_enlarge"],
	
	render: function(){
		this.$el.append(this.favoritePhotosTemplate({favorites: ImgurClone.FavoritePhotosCollection}))
		this.$el.append($("<div id='favorites-map'></div>"))
		this.$el.append($("<div id='favorite-enlarge'></div>"))
		return this
	}
})