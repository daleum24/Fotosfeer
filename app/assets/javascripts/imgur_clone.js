window.ImgurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(user_id, photos, users, regions) {
		
		function store_location(position){
			var latitude  = ImgurClone.CurrLat = position.coords.latitude;
			var longitude = ImgurClone.CurrLng = position.coords.longitude;
			return position
		}
		
		function handle_error(err){
			if (err.code == 1){
				var denied = ImgurClone.denied = true
			}
		}
		
		function get_location() {
		  navigator.geolocation.getCurrentPosition(store_location, handle_error, {maximumAge: 75000});
		}
		
		get_location()
		
		var csrf_token = ImgurClone.csrf_token = $('meta[name="csrf-token"]').attr('content');
		var user_id = ImgurClone.user_id = +user_id
		var PhotosCollection = ImgurClone.PhotosCollection = new ImgurClone.Collections.Photos(JSON.parse(photos), {parse: true})
		var RegionsCollection = ImgurClone.RegionsCollection = new ImgurClone.Collections.Regions(JSON.parse(regions), {parse: true})
	
		var UsersCollection = ImgurClone.UsersCollection = new ImgurClone.Collections.Users(JSON.parse(users), {parse: true});

		var router = new ImgurClone.Routers.imgumRouter();
		Backbone.history.start();
  }
};


