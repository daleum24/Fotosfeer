window.ImgurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(user_id, photos) {
		var user_id = ImgurClone.user_id = +user_id;
		var PhotosCollection = ImgurClone.PhotosCollection = new ImgurClone.Collections.Photos(JSON.parse(photos), {parse: true});

		var router = new ImgurClone.Routers.imgumRouter();
		Backbone.history.start();
  }
};


