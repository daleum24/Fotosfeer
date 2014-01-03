ImgurClone.Routers.imgumRouter = Backbone.Router.extend({
	initialize: function(){
		this.$rootEl = $(".home_page")
		var headerView = new ImgurClone.Views.UserHeaderView()
		this.$rootEl.append(headerView.render().$el)
		this.$rootEl.append($('<div class="body"></div>'))
		
   
	},
	
	routes: {
		"": "home",
		"_=_" : "home",
		"photos/:id": "show",
		"myImages" : "myImages",
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
		
		var upvotes = photo.get("uservotes").where({value: 1})
		var downvotes = photo.get("uservotes").where({value: -1})

		var progress = upvotes.length/(upvotes.length + downvotes.length) * 100
		var percentage = progress+"%"

		$('#upvotes-bar').css('width', percentage);
		
		this._swapView(photoShowView)
		var map = ImgurClone.PhotoMap = L.mapbox.map('photo-map', 'examples.map-9ijuk24y')
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
		        title: photo.get("title"),
		    }
		}).addTo(map);
		
	},
	
	myImages: function(){
		var myImagesView = new ImgurClone.Views.myImagesView();
		this._swapView(myImagesView)
	}, 
	
	favorites: function(){
		var favoritesView = new ImgurClone.Views.FavoritesView();
		this._swapView(favoritesView)
		
		var map = ImgurClone.FavoritesMap = L.mapbox.map('favorites-map', 'examples.map-9ijuk24y')
		    .setView([0, 0], 2);

	},
	
	regions: function(){
		var regionsView = new ImgurClone.Views.RegionsView();
		this._swapView(regionsView)
		var map = ImgurClone.RegionMap = L.mapbox.map('region-map', 'examples.map-9ijuk24y')
		    .setView([0, 0], 2);
	},
	
	_swapView: function (newView) {
		$('.body').empty();
	  $('.body').html(newView.render().$el);
	}
	
});