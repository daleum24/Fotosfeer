ImgurClone.Views.RegionsView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("regions-container")
		// this.$el.append(this.regionsTemplate({myRegions: ImgurClone.RegionsCollection}))
		this.$el.append($("<div id='region-map' class='dark' ></div>"))
	},
	
	regionsTemplate: JST['regions_header'],
	
	events:{
		"change .region-select": "display_region",
		"click a.region-popup" : "navigate_to_photo",
		"click #new_region_button" : "create_region"
	},
	
	create_region: function(event){
		event.preventDefault();		
		var that = this;
		var bounds = ImgurClone.RegionMap.getBounds()
		var north = bounds._northEast.lat 
		var east = bounds._northEast.lng
		var south = bounds._southWest.lat 
		var west = bounds._southWest.lng
		
		var name = $("#new_region_name").val()
		
		if (name === ""){
			alert("Name Please!!")
		} else {
			ImgurClone.RegionsCollection.create(
				{region: {name: name, north_bound: north, south_bound: south, east_bound: east, west_bound: west}},{
				url: "/users/" + ImgurClone.user_id + "/regions",
				success: function(){
					$("#region-header").remove()
					that.render();
					var newOption = "#region-header option:contains(" + name + ")" 
					$(newOption).attr("selected", "selected")
				}
			})
		}
	},
	
	// navigate_to_photo: function(event){
	// 	event.preventDefault();
	// 	alert("hooray!")
	// },
	
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
		var geoJson = []
		
		in_bound_photos.forEach(function(photo){
			geoJson.push(
				{
					type: 'Feature',
	        "geometry": { "type": "Point", "coordinates": [photo.get("longitude"), photo.get("latitude")]},
	        properties: {
			        'marker-color': '#0fa',
			        'marker-symbol': 'star-stroked',
	            'title': photo.get("title"),
							'image': photo.get("image_url"),
							'id'   : photo.get("id") 
	        }
				}
			)
		});

		return geoJson
	},
	
	display_in_region_photos: function(southWest, northEast){
		var bounded_photos = this.retrieve_bounded_photos(southWest, northEast)
		var geoJson = this.create_markers(bounded_photos)
		var map = ImgurClone.RegionMap
		
		
		map.markerLayer.on('layeradd', function(e) {
		    var marker = e.layer,
		        feature = marker.feature;

		    var popupContent =  '<a class="region-popup" href="#photos/' + feature.properties.id + '">' +
		                            '<img src="' + feature.properties.image + '">' +
		                        '   <h2>' + feature.properties.title + '</h2>' +
		                        '</a>';
														
		    marker.bindPopup(popupContent,{
		        closeButton: false,
		        minWidth: 500
		    });
		});
	
		map.markerLayer.setGeoJSON(geoJson);
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
		this.$el.prepend(this.regionsTemplate({myRegions: ImgurClone.RegionsCollection}))
		
		return this
	}
})