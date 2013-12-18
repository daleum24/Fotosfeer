ImgurClone.Views.ShowSideBarView = Backbone.View.extend({
	initialize: function(){
		this.$el.addClass("show-sidebar")
		this.photo_id = this.model.escape("id")
		
		this.current_index = ImgurClone.PhotosCollection.indexOf(this.model)
		
		this.previous_index = this.current_index - 1
		if (this.previous_index < 0) {
			this.previous_photo = false
		} else {
			this.previous_photo = ImgurClone.PhotosCollection.models[this.previous_index]
			this.previous_url = "photos/" + this.previous_photo.escape("id")
		}
		
		this.next_index = this.current_index + 1

		if (this.next_index >= ImgurClone.PhotosCollection.length) {
			this.next_photo = false
		} else {
			this.next_photo = ImgurClone.PhotosCollection.models[this.next_index]
			this.next_url = "photos/" + this.next_photo.escape("id")
		}
		
	},
	
	events: {
		"click #previous": "show_previous",
		"click #next" : "show_next"
	},
	
	show_previous: function(event){
		event.preventDefault();
		console.log(this.previous_url)
		Backbone.history.navigate(this.previous_url, {trigger:true});
	},
	
	show_next: function(event){
		event.preventDefault();
		console.log(this.next_url)
		Backbone.history.navigate(this.next_url, {trigger:true});
	},
	
	getDirections: function(){
		
	},
	
	navButtonsTemplate: JST['nav_buttons'],
	
	render: function(callback){
		this.$el.append(this.navButtonsTemplate({previous: this.previous_photo, next: this.next_photo}))
		this.$el.append($("<div id='photo-map'></div>"))
		this.$el.append($("<div id='photo-directions'></div>"))
		return this
	}
});