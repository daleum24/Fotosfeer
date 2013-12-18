ImgurClone.Routers.imgumRouter = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $(".home_page")
		var headerView = new ImgurClone.Views.UserHeaderView()
		this.$rootEl.append(headerView.render().$el)
		this.$rootEl.append($('<div class="body"></div>'))
	},
	
	routes: {
		"": "home",
		"photos/:id": "show",
		"favorites": "favorites",
		"regions" : "regions"
	},
	
	home: function(){
		var photosIndexView = new ImgurClone.Views.PhotoIndexView();
		this._swapView(photosIndexView)
	},
	
	show: function(id){
		var photo = ImgurClone.PhotosCollection.get(id)
		var latitude = +photo.get("latitude")
		var longitude = +photo.get("longitude")
		
		var photoShowView = new ImgurClone.Views.PhotoShowView({model: photo});
		
		this._swapView(photoShowView)
		var map = L.mapbox.map('photo-map', 'examples.map-9ijuk24y')
		    .setView([latitude, longitude], 17);

		L.mapbox.markerLayer({
		    type: 'Feature',
		    geometry: {
		        type: 'Point',
		        coordinates: [longitude, latitude]
		    },
		    properties: {
		        'marker-color': '#0fa',
		        'marker-symbol': 'star-stroked',
		        title: 'Example Marker',
		        description: 'This is a single marker.'
		    }
		}).addTo(map);
	},
	
	favorites: function(){
		alert("going to favorites!")
	},
	
	regions: function(){
		var regionsView = new ImgurClone.Views.RegionsView();
		this._swapView(regionsView)
		var map = L.mapbox.map('region-map', 'examples.map-9ijuk24y')
		    .setView([latitude, longitude], 17);
	},
	
	_swapView: function (newView) {
		$('.body').empty();
	  $('.body').html(newView.render().$el);
	}
	
});