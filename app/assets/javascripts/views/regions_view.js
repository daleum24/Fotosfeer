ImgurClone.Views.RegionsView = Backbone.View.extend({
	initialize: function(){
		var that = this;
		this.$el.addClass("regions-container")
		this.$el.append($("<div id='region-map'></div>"))
		window.setTimeout(function(){
			that.render_world()
		}, 100)
	},
	
	regionsTemplate: JST['regions_header'],
	
	events:{
		"change .region-select": "display_region",
		"click a.region-popup" : "navigate_to_photo",
		"click #new_region_button" : "create_region",
		"click #region_delete_button" : "delete_region"
	},
	
	set_notification: function(message){
		$("#region_messages").html(message).fadeIn(400)
		
		window.setTimeout(function(){ 
			$("#region_messages").fadeOut(600).html("")
		}, 3000) 
	},
	
	render_header: function(){
		$("#region-header").remove()					
		this.render();
	},
	
	render_region: function(north, south, east, west){
		var southWest = [ south, west ]
		var northEast = [ north, east ]
		ImgurClone.RegionMap.fitBounds([ southWest, northEast ])
		this.display_in_region_photos(southWest, northEast)
	},
	
	render_world: function(){
		var north = 78.9039293885709
		var east = 175.78125
		var south = -78.9039293885709
		var west = -175.78125
		
		this.render_region(north, south, east, west);
		$("#region_delete_button").css("display", "none")
	},
	
	get_bounds: function(){
		var bounds = ImgurClone.RegionMap.getBounds()
		this.north = bounds._northEast.lat 
		this.east = bounds._northEast.lng
		this.south = bounds._southWest.lat 
		this.west = bounds._southWest.lng
	},
	
	create_region: function(event){
		event.preventDefault();		
		var that = this;
		this.get_bounds();
		var name = $("#new_region_name").val()
		
		if (name === ""){
			this.set_notification("Name Please!")
		} else {
			ImgurClone.RegionsCollection.create(
				{ region: { name: name, north_bound: this.north, south_bound: this.south, east_bound: this.east, west_bound: this.west }},{
				url: "/users/" + ImgurClone.user_id + "/regions",
				success: function(){
					that.render_header();
					that.set_notification("Region Created!")
					
					var newOption = "#region-header option:contains(" + name + ")" 
					$(newOption).attr("selected", "selected")
				}
			})
		}
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
						keepInView: true,
						minWidth: 300,
		        maxWidth: 300,
						maxHeight: 300
		    });
		});
	
		map.markerLayer.setGeoJSON(geoJson);
	},
	
	display_region: function(event){
		event.preventDefault();
		var value = $(event.currentTarget).find(":selected").val()
		
		if (value === "select-region") {
			this.render_world();
		} else {
			var region = ImgurClone.RegionsCollection.get(value)
			this.render_region(region.escape("north_bound"), region.escape("south_bound"), region.escape("east_bound"), region.escape("west_bound"));
			$("#region_delete_button").css("display", "block")
		}		
	},
	
	delete_region: function(event){
		event.preventDefault();
		var that = this;
		var value = $(".region-select").find(":selected").val()
		var region = ImgurClone.RegionsCollection.get(value)
		
		region.destroy({
			url: "/regions/" + value,
			success: function(){
				that.render_header();
				that.set_notification("Region Deleted")
				that.render_world();
			}
		})
	},
	
	render: function(){
		this.$el.prepend(this.regionsTemplate({ myRegions: ImgurClone.RegionsCollection }))		
		return this
	}
})








