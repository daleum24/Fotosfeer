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
		"click #next" : "show_next",
		"click #region-button" : "show_save_form"
	},	
	
	show_save_form: function(event){
		event.preventDefault();
		var bounds = ImgurClone.PhotoMap.getBounds()
		var north = bounds._northEast.lat 
		var east = bounds._northEast.lng
		var south = bounds._southWest.lat 
		var west = bounds._southWest.lng
		
		var name = $("#save_region_name").val()
		
		if (name === ""){
			alert("Name Please!!")
		} else {
			ImgurClone.RegionsCollection.create(
				{region: {name: name, north_bound: north, south_bound: south, east_bound: east, west_bound: west}},{
				url: "/users/" + ImgurClone.user_id + "/regions",
				success: function(){
					Backbone.history.navigate("regions", {trigger:true});
					var newOption = "#region-header option:contains(" + name + ")" 
					$(newOption).attr("selected", "selected")
				}
			})
		}
	},
	
	show_previous: function(event){
		event.preventDefault();
		Backbone.history.navigate(this.previous_url, {trigger:true});
	},
	
	show_next: function(event){
		event.preventDefault();
		Backbone.history.navigate(this.next_url, {trigger:true});
	},
	
	getDirections: function(){
		
	},
	
	navButtonsTemplate: JST['nav_buttons'],
	
	saveRegionTemplate: JST['save_region'],
	
	render: function(callback){
		this.$el.append(this.navButtonsTemplate({previous: this.previous_photo, next: this.next_photo}))
		this.$el.append($("<div id='photo-map'></div>"))
		this.$el.append(this.saveRegionTemplate())
		return this
	}
});