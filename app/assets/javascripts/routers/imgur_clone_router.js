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
		"/favorites": "favorites"
	},
	
	home: function(){
		var photosIndexView = new ImgurClone.Views.PhotoIndexView();
		this._swapView(photosIndexView)
	},
	
	show: function(id){
		var photo = ImgurClone.PhotosCollection.get(id)
		var photoShowView = new ImgurClone.Views.PhotoShowView({model: photo});
		
		this._swapView(photoShowView)
	},
	
	favorites: function(){
		alert("going to favorites!")
	},
	
	_swapView: function (newView) {
	  // this._currentView && this._currentView.remove();
	  // this._currentView = newView;
		$('.body').empty();
	  $('.body').html(newView.render().$el);
	}
	
});