window.ImgurClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		var router = new ImgurClone.Routers.imgumRouter();
		Backbone.history.start();
  }
};


