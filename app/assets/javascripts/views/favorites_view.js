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
			
		var layer =	[{	type: 'Feature',
					        "geometry": { "type": "Point", "coordinates": [photo.get("longitude"), photo.get("latitude")]},
					        properties: {
							        'marker-color': '#0fa',
							        'marker-symbol': 'star-stroked',
					            'title': photo.get("title"),
											'image': photo.get("image_url"),
											'id'   : photo.get("id") 
					        }
								}]

		
		
		ImgurClone.FavoritesMap.markerLayer.on('layeradd', function(e) {
		    var marker = e.layer,
		        feature = marker.feature;

		    var popupContent =  '<a target="_blank" class="favorite-popup" href="#" data-id="' + feature.properties.id + '">' +
		                            '<img src="' + feature.properties.image + '">' +
		                        '   <h2>' + feature.properties.title + '</h2>' +
		                        '</a>';
														
		    marker.bindPopup(popupContent,{
		        closeButton: false,
		        minWidth: 500
		    });
		});
	
		ImgurClone.FavoritesMap.markerLayer.setGeoJSON(layer);
		
		ImgurClone.FavoritesMap.setZoomAround([latitude, longitude],17)
		ImgurClone.FavoritesMap.panTo([latitude + 0.00123505, longitude], {duration: 1})

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