ImgurClone.Views.RegionsView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("regions-container")
	},
	
	regionsTemplate: JST['regions_header'],
	
	events:{
		"change .region-select": "display_region"
	},
	
	is_in_bounds: function(photo, southWest, northEast){
		var photoLat = photo.get("latitude")
		var photoLng = photo.get("longitude")
		
		if ((southWest[0] < photoLat) && (photoLat < northEast[0]) && (southWest[1] < photoLng ) && ( photoLng < northEast[1])){
			return true
		}	
		return false
	},
	
	retrieve_bounded_photos: function(southWest, northEast){
		var southWest = southWest;
		var northEast = northEast;
		var that = this
		var in_bound_photos = []
		
		ImgurClone.PhotosCollection.forEach(function(photo){
			if (that.is_in_bounds(photo, southWest, northEast) == true){
				in_bound_photos.push(photo)
			}
		})
		
		return in_bound_photos
	},
	
	create_markers: function(in_bound_photos){
		var markers_array = []
		
		in_bound_photos.forEach(function(photo){
			( [photo.get("longitude"),photo.get("latitude")] )
			
			markers_array.push(
				L.mapbox.markerLayer({
		        type: 'FeatureCollection',
		        features: [{
		            type: 'Feature',
		            properties: {
						        'marker-color': '#0fa',
						        'marker-symbol': 'star-stroked',
		                title: photo.get("title")
		            },
		            geometry: {
		                type: 'Point',
		                coordinates: [photo.get("longitude"), photo.get("latitude")]
		            }
		        }]
		    })
			)
		})
		return markers_array
	},
	
	display_in_region_photos: function(southWest, northEast){
		var bounded_photos = this.retrieve_bounded_photos(southWest, northEast)
		var markers = this.create_markers(bounded_photos)
		
		markers.forEach(function(markerLayer){
			markerLayer.addTo(ImgurClone.RegionMap)
		})
	},
	
	display_region: function(event){
		event.preventDefault();
		var value = $(event.currentTarget).find(":selected").val()
		
		if ((value === "select-region") || (value === "add-region")) {
			var currentZoom = ImgurClone.RegionMap.getZoom()
			var zoomOut = currentZoom - 2 
			 
			ImgurClone.RegionMap.zoomOut(zoomOut)
			ImgurClone.RegionMap.panTo([0,0])
		
		}  else {
			var region = ImgurClone.RegionsCollection.get(value)
			var southWest = [ region.escape("south_bound"), region.escape("west_bound") ]
			var northEast = [ region.escape("north_bound"), region.escape("east_bound") ]
			ImgurClone.RegionMap.fitBounds([ southWest, northEast ])

			this.display_in_region_photos(southWest, northEast)
		}
		
	},
	
	render: function(){
		this.$el.append(this.regionsTemplate({myRegions: ImgurClone.RegionsCollection}))
		this.$el.append($("<div id='region-map' class='dark' ></div>"))
		return this
	}
})