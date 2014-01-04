window.ImgurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(user_id, photos, users, regions, favorite_photos) {
		
		var csrf_token = ImgurClone.csrf_token = $('meta[name="csrf-token"]').attr('content');
		
		var user_id = ImgurClone.user_id = +user_id
		var UsersCollection = ImgurClone.UsersCollection = new ImgurClone.Collections.Users(JSON.parse(users), {parse: true});
		
		var PhotosCollection = ImgurClone.PhotosCollection = new ImgurClone.Collections.Photos(JSON.parse(photos), {parse: true})
		
		var myImages = ImgurClone.PhotosCollection.where({ submitter_id: user_id })
		var myImagesCollection = ImgurClone.myImagesCollection = new ImgurClone.Collections.Photos(myImages);
		
		var FavoritePhotosCollection = ImgurClone.FavoritePhotosCollection = new ImgurClone.Collections.Photos(JSON.parse(favorite_photos), {parse: true})
		
		var RegionsCollection = ImgurClone.RegionsCollection = new ImgurClone.Collections.Regions(JSON.parse(regions), {parse: true})
		
		var router = new ImgurClone.Routers.imgumRouter();		
		Backbone.history.start();
  }
};


